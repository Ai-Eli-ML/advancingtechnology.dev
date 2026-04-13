-- ============================================================================
-- Contractor Portal Schema
-- Run against Digi-Land Supabase: awxfeqbjoydgikawpequ.supabase.co
-- Migration: 20260413_contractor_portal
-- ============================================================================

-- ============================================================================
-- 1. CONTRACTOR PROFILES — Links auth.users to portal
-- ============================================================================
CREATE TABLE IF NOT EXISTS contractor_profiles (
  id                      UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  discord_id              TEXT UNIQUE,
  full_name               TEXT NOT NULL,
  email                   TEXT,
  avatar_url              TEXT,
  role                    TEXT DEFAULT 'contractor' CHECK (role IN ('admin', 'contractor')),
  status                  TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'trial', 'suspended', 'offboarded')),
  onboarding_completed    BOOLEAN DEFAULT FALSE,
  onboarding_completed_at TIMESTAMPTZ,
  hourly_rate             DECIMAL,
  timezone                TEXT DEFAULT 'UTC',
  skills                  TEXT[] DEFAULT '{}',
  bio                     TEXT,
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at (reuses existing trigger function from migration 001)
CREATE TRIGGER contractor_profiles_updated_at
  BEFORE UPDATE ON contractor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 2. EOD REPORTS — Daily standup submissions
-- ============================================================================
CREATE TABLE IF NOT EXISTS eod_reports (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id    UUID NOT NULL REFERENCES contractor_profiles(id) ON DELETE CASCADE,
  report_date      DATE NOT NULL DEFAULT CURRENT_DATE,
  tasks_completed  TEXT NOT NULL,
  blockers         TEXT,
  plan_tomorrow    TEXT,
  hours_worked     DECIMAL(4,2) CHECK (hours_worked >= 0 AND hours_worked <= 24),
  loom_url         TEXT,
  mood             TEXT CHECK (mood IN ('great', 'good', 'okay', 'struggling')),
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now(),
  UNIQUE (contractor_id, report_date)
);

CREATE TRIGGER eod_reports_updated_at
  BEFORE UPDATE ON eod_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 3. TASK SUBMISSIONS — Revision workflow for bounty proof
-- ============================================================================
CREATE TABLE IF NOT EXISTS task_submissions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bounty_id      UUID NOT NULL REFERENCES bounties(id) ON DELETE CASCADE,
  submitted_by   UUID NOT NULL REFERENCES auth.users(id),
  version        INTEGER NOT NULL DEFAULT 1,
  proof_url      TEXT,
  proof_text     TEXT,
  attachments    JSONB DEFAULT '[]',
  status         TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'revision_requested', 'rejected')),
  reviewer_id    UUID REFERENCES auth.users(id),
  reviewer_notes TEXT,
  reviewed_at    TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT now(),
  UNIQUE (bounty_id, version)
);

-- ============================================================================
-- 4. DOCUMENTS — Hub for legal docs, SOPs, onboarding materials
-- ============================================================================
CREATE TABLE IF NOT EXISTS documents (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                   TEXT NOT NULL,
  description             TEXT,
  category                TEXT NOT NULL CHECK (category IN ('legal', 'sop', 'onboarding', 'reference', 'template')),
  file_url                TEXT NOT NULL,
  file_type               TEXT,
  required_for_onboarding BOOLEAN DEFAULT FALSE,
  sort_order              INTEGER DEFAULT 0,
  is_active               BOOLEAN DEFAULT TRUE,
  created_by              UUID REFERENCES auth.users(id),
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 5. DOCUMENT ACKNOWLEDGMENTS — Track who read required docs
-- ============================================================================
CREATE TABLE IF NOT EXISTS document_acknowledgments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  contractor_id   UUID NOT NULL REFERENCES contractor_profiles(id) ON DELETE CASCADE,
  acknowledged_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (document_id, contractor_id)
);

-- ============================================================================
-- 6. PORTAL ACTIVITY — Audit log for portal-specific events
-- ============================================================================
CREATE TABLE IF NOT EXISTS portal_activity (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id),
  action        TEXT NOT NULL,
  resource_type TEXT,
  resource_id   UUID,
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 7. ALTER BOUNTIES — Add portal_user_id for web portal linking
-- ============================================================================
ALTER TABLE bounties
  ADD COLUMN IF NOT EXISTS portal_user_id UUID REFERENCES auth.users(id);

-- ============================================================================
-- 8. HELPER FUNCTION — Check if user is portal admin
-- ============================================================================
CREATE OR REPLACE FUNCTION is_portal_admin(uid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM contractor_profiles WHERE id = uid AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================================
-- 9. RPC: submit_bounty_work — Atomic submission (mirrors claim_bounty)
-- ============================================================================
CREATE OR REPLACE FUNCTION submit_bounty_work(
  p_bounty_id UUID,
  p_user_id UUID,
  p_proof_url TEXT DEFAULT NULL,
  p_proof_text TEXT DEFAULT NULL,
  p_attachments JSONB DEFAULT '[]'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_bounty RECORD;
  v_next_version INTEGER;
  v_submission_id UUID;
BEGIN
  -- Verify bounty is claimed by this user
  SELECT status, claimed_by INTO v_bounty
  FROM bounties WHERE id = p_bounty_id;

  IF v_bounty IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'bounty_not_found');
  END IF;

  IF v_bounty.claimed_by != p_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', 'not_assigned_to_you');
  END IF;

  IF v_bounty.status NOT IN ('claimed', 'submitted') THEN
    RETURN jsonb_build_object('success', false, 'error', 'invalid_status', 'current_status', v_bounty.status);
  END IF;

  -- Calculate next version
  SELECT COALESCE(MAX(version), 0) + 1 INTO v_next_version
  FROM task_submissions WHERE bounty_id = p_bounty_id;

  -- Create submission
  INSERT INTO task_submissions (bounty_id, submitted_by, version, proof_url, proof_text, attachments)
  VALUES (p_bounty_id, p_user_id, v_next_version, p_proof_url, p_proof_text, p_attachments)
  RETURNING id INTO v_submission_id;

  -- Update bounty status and proof_url
  UPDATE bounties
  SET status = 'submitted',
      proof_url = COALESCE(p_proof_url, proof_url),
      submitted_at = now(),
      updated_at = now()
  WHERE id = p_bounty_id;

  -- Log activity
  INSERT INTO bounty_activity (bounty_id, user_id, action, notes)
  VALUES (p_bounty_id, p_user_id, 'submitted',
    json_build_object('version', v_next_version, 'proof_url', p_proof_url)::text);

  RETURN jsonb_build_object('success', true, 'submission_id', v_submission_id, 'version', v_next_version);
END;
$$;

GRANT EXECUTE ON FUNCTION submit_bounty_work(UUID, UUID, TEXT, TEXT, JSONB) TO authenticated;

-- ============================================================================
-- 10. RPC: review_submission — Admin approve/reject
-- ============================================================================
CREATE OR REPLACE FUNCTION review_submission(
  p_submission_id UUID,
  p_reviewer_id UUID,
  p_decision TEXT,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_submission RECORD;
  v_bounty_id UUID;
  v_contractor_id UUID;
BEGIN
  -- Verify reviewer is admin
  IF NOT is_portal_admin(p_reviewer_id) AND NOT is_admin(p_reviewer_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'not_authorized');
  END IF;

  -- Get submission
  SELECT * INTO v_submission FROM task_submissions WHERE id = p_submission_id;
  IF v_submission IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'submission_not_found');
  END IF;

  v_bounty_id := v_submission.bounty_id;
  v_contractor_id := v_submission.submitted_by;

  -- Update submission
  UPDATE task_submissions
  SET status = p_decision,
      reviewer_id = p_reviewer_id,
      reviewer_notes = p_notes,
      reviewed_at = now()
  WHERE id = p_submission_id;

  -- Handle decision
  IF p_decision = 'approved' THEN
    UPDATE bounties
    SET status = 'approved',
        reviewed_by = p_reviewer_id,
        reviewed_at = now(),
        updated_at = now()
    WHERE id = v_bounty_id;

    -- Award XP
    UPDATE player_states
    SET tasks_completed = tasks_completed + 1,
        xp = xp + (SELECT reward FROM bounties WHERE id = v_bounty_id),
        consecutive_rejections = 0
    WHERE user_id = v_contractor_id;

  ELSIF p_decision = 'revision_requested' THEN
    UPDATE bounties
    SET status = 'claimed',
        updated_at = now()
    WHERE id = v_bounty_id;

  ELSIF p_decision = 'rejected' THEN
    UPDATE bounties
    SET status = 'available',
        claimed_by = NULL,
        reviewed_by = p_reviewer_id,
        reviewed_at = now(),
        updated_at = now()
    WHERE id = v_bounty_id;

    -- Track rejections
    UPDATE player_states
    SET consecutive_rejections = consecutive_rejections + 1,
        reliability_score = GREATEST(0, reliability_score - 0.1)
    WHERE user_id = v_contractor_id;
  END IF;

  -- Log activity
  INSERT INTO bounty_activity (bounty_id, user_id, action, notes)
  VALUES (v_bounty_id, p_reviewer_id, p_decision,
    json_build_object('submission_id', p_submission_id, 'notes', p_notes)::text);

  RETURN jsonb_build_object('success', true, 'decision', p_decision);
END;
$$;

GRANT EXECUTE ON FUNCTION review_submission(UUID, UUID, TEXT, TEXT) TO authenticated;

-- ============================================================================
-- 11. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE contractor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE eod_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_acknowledgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_activity ENABLE ROW LEVEL SECURITY;

-- ---------- CONTRACTOR PROFILES ----------
CREATE POLICY "cp_select_own" ON contractor_profiles
  FOR SELECT USING (id = auth.uid() OR is_portal_admin(auth.uid()));

CREATE POLICY "cp_update_own" ON contractor_profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "cp_admin_insert" ON contractor_profiles
  FOR INSERT WITH CHECK (id = auth.uid() OR is_portal_admin(auth.uid()));

-- ---------- EOD REPORTS ----------
CREATE POLICY "eod_select" ON eod_reports
  FOR SELECT USING (contractor_id = auth.uid() OR is_portal_admin(auth.uid()));

CREATE POLICY "eod_insert_own" ON eod_reports
  FOR INSERT WITH CHECK (contractor_id = auth.uid());

CREATE POLICY "eod_update_own" ON eod_reports
  FOR UPDATE USING (contractor_id = auth.uid());

-- ---------- TASK SUBMISSIONS ----------
CREATE POLICY "ts_select" ON task_submissions
  FOR SELECT USING (submitted_by = auth.uid() OR is_portal_admin(auth.uid()));

CREATE POLICY "ts_insert_own" ON task_submissions
  FOR INSERT WITH CHECK (submitted_by = auth.uid());

-- ---------- DOCUMENTS ----------
CREATE POLICY "docs_select_active" ON documents
  FOR SELECT USING (is_active = true OR is_portal_admin(auth.uid()));

CREATE POLICY "docs_admin_all" ON documents
  FOR ALL USING (is_portal_admin(auth.uid()));

-- ---------- DOCUMENT ACKNOWLEDGMENTS ----------
CREATE POLICY "ack_select" ON document_acknowledgments
  FOR SELECT USING (contractor_id = auth.uid() OR is_portal_admin(auth.uid()));

CREATE POLICY "ack_insert_own" ON document_acknowledgments
  FOR INSERT WITH CHECK (contractor_id = auth.uid());

-- ---------- PORTAL ACTIVITY ----------
CREATE POLICY "pa_insert_auth" ON portal_activity
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "pa_select_admin" ON portal_activity
  FOR SELECT USING (is_portal_admin(auth.uid()));

-- ============================================================================
-- 12. INDEXES
-- ============================================================================
CREATE INDEX idx_contractor_profiles_discord_id ON contractor_profiles(discord_id);
CREATE INDEX idx_contractor_profiles_status ON contractor_profiles(status);
CREATE INDEX idx_eod_reports_contractor_date ON eod_reports(contractor_id, report_date DESC);
CREATE INDEX idx_eod_reports_date ON eod_reports(report_date DESC);
CREATE INDEX idx_task_submissions_bounty ON task_submissions(bounty_id, version DESC);
CREATE INDEX idx_task_submissions_by ON task_submissions(submitted_by);
CREATE INDEX idx_task_submissions_status ON task_submissions(status);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_onboarding ON documents(required_for_onboarding) WHERE required_for_onboarding = TRUE;
CREATE INDEX idx_doc_acks_contractor ON document_acknowledgments(contractor_id);
CREATE INDEX idx_portal_activity_user ON portal_activity(user_id, created_at DESC);
CREATE INDEX idx_bounties_portal_user ON bounties(portal_user_id);

-- ============================================================================
-- 13. SEED DATA — Onboarding documents
-- ============================================================================
INSERT INTO documents (title, description, category, file_url, file_type, required_for_onboarding, sort_order) VALUES
  ('Independent Contractor Agreement', 'Must sign before starting work', 'legal',
   'https://docs.google.com/document/d/1i-gWIcjnxaAJB9I9WT20TnNFwoGhOeN1UOpPFFZBt68/edit', 'gdoc', TRUE, 1),
  ('Non-Disclosure Agreement (NDA)', 'Confidentiality and IP protection', 'legal',
   'https://docs.google.com/document/d/1u_S-k1C2z8LU_p8KYqVHzwHrL53scm8_uqUl-O8mMuQ/edit', 'gdoc', TRUE, 2),
  ('8-Hour Daily Work System', 'Work structure, milestones, and communication protocols', 'onboarding',
   'https://docs.google.com/document/d/1vQ_bN6H1wuLpgVUKwKrZlgHLFmGJkz6PD9YpjL2KQq4/edit', 'gdoc', TRUE, 3)
ON CONFLICT DO NOTHING;
