"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import Sidebar from "@/components/Sidebar";
import {
  User,
  Bell,
  Key,
  Shield,
  Trash2,
  Save,
  Copy,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getUserProfile,
  updateUserProfile,
  generateApiKey,
  revokeApiKey,
} from "@/lib/actions/dashboard";
import { toast } from "sonner";

interface ApiKey {
  id: number;
  key: string;
  created: string;
}

export default function SettingsPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // Notification state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Security state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showApiKeys, setShowApiKeys] = useState<{ [key: number]: boolean }>({});

  // Account deletion
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const result = await getUserProfile();

    if (result.success && result.data) {
      const { data } = result;
      setName(data.name);
      setEmail(data.email);
      setBio(data.bio);
      setEmailNotifications(data.emailNotifications);
      setMarketingEmails(data.marketingEmails);
      setTwoFactorEnabled(data.twoFactorEnabled);
      setApiKeys(data.apiKeys);
    } else {
      toast.error("Failed to load profile");
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const result = await updateUserProfile({
      name,
      bio,
      emailNotifications,
      marketingEmails,
    });

    if (result.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.error || "Failed to update profile");
    }
    setSaving(false);
  };

  const handleGenerateApiKey = async () => {
    const result = await generateApiKey();

    if (result.success && result.apiKey) {
      toast.success("API key generated successfully");
      loadProfile();
    } else {
      toast.error("Failed to generate API key");
    }
  };

  const handleRevokeApiKey = async (keyId: number) => {
    const result = await revokeApiKey(keyId);

    if (result.success) {
      toast.success("API key revoked successfully");
      loadProfile();
    } else {
      toast.error("Failed to revoke API key");
    }
  };

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === "DELETE") {
      toast.error("Account deletion is not available in this demo");
      setShowDeleteConfirm(false);
      setDeleteConfirmText("");
    } else {
      toast.error('Please type "DELETE" to confirm');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 bg-background-secondary/50 lg:ml-72">
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-2">
                Settings
              </h1>
              <p className="text-foreground-secondary">
                Manage your account settings and preferences
              </p>
            </motion.div>

            <div className="space-y-6">
              {/* Profile Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          Update your personal information
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleSaveProfile} disabled={saving}>
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notification Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Bell className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                          Manage how you receive notifications
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about purchases and updates
                        </p>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          emailNotifications ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            emailNotifications ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional emails and product updates
                        </p>
                      </div>
                      <button
                        onClick={() => setMarketingEmails(!marketingEmails)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          marketingEmails ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            marketingEmails ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <Button onClick={handleSaveProfile} disabled={saving}>
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? "Saving..." : "Save Preferences"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* API Keys */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Key className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>API Keys</CardTitle>
                          <CardDescription>
                            Manage your API keys for programmatic access
                          </CardDescription>
                        </div>
                      </div>
                      <Button onClick={handleGenerateApiKey} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Generate Key
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {apiKeys.length > 0 ? (
                      <div className="space-y-3">
                        {apiKeys.map((apiKey) => (
                          <div
                            key={apiKey.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <code className="text-sm font-mono">
                                  {showApiKeys[apiKey.id]
                                    ? apiKey.key
                                    : `${apiKey.key.substring(0, 20)}${"*".repeat(20)}`}
                                </code>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Created on {new Date(apiKey.created).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setShowApiKeys({
                                    ...showApiKeys,
                                    [apiKey.id]: !showApiKeys[apiKey.id],
                                  })
                                }
                              >
                                {showApiKeys[apiKey.id] ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyApiKey(apiKey.key)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRevokeApiKey(apiKey.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Key className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No API keys yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Security Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>
                          Manage your account security settings
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setTwoFactorEnabled(!twoFactorEnabled);
                          toast.info("Two-factor authentication is not available in this demo");
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          twoFactorEnabled ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Danger Zone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="border-destructive">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>
                          Irreversible account actions
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {!showDeleteConfirm ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteConfirm(true)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-destructive">
                          Are you absolutely sure? This action cannot be undone.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="delete-confirm">
                            Type <span className="font-bold">DELETE</span> to confirm
                          </Label>
                          <Input
                            id="delete-confirm"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            placeholder="DELETE"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowDeleteConfirm(false);
                              setDeleteConfirmText("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            disabled={deleteConfirmText !== "DELETE"}
                          >
                            Delete My Account
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      {showChatDrawer && <ChatDrawer onClose={() => setShowChatDrawer(false)} />}

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChatDrawer(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
    </div>
  );
}
