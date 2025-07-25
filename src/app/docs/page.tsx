"use client";

import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { 
  Search,
  Book,
  Code,
  Terminal,
  Zap,
  Shield,
  Package,
  ChevronRight,
  FileText,
  ExternalLink
} from "lucide-react";

interface DocSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string;
}

export default function DocsPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("getting-started");

  const docSections: DocSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Book,
      content: `
# Getting Started with AdvancingTechnology.dev

Welcome to the AdvancingTechnology.dev documentation! This guide will help you get up and running with our AI-powered plugin marketplace.

## Quick Start

1. **Create an Account**: Sign up for a free account at [advancingtechnology.dev/auth](https://advancingtechnology.dev/auth)
2. **Browse Plugins**: Explore our marketplace to find AI tools that suit your needs
3. **Install Plugins**: Follow the installation guide for your chosen plugins
4. **Start Building**: Integrate AI capabilities into your projects

## Key Features

- **Plugin Marketplace**: Discover and install AI-powered tools
- **Developer Dashboard**: Manage your plugins and track performance
- **API Integration**: Easy-to-use APIs for seamless integration
- **Community Support**: Join our community for help and collaboration

## Next Steps

- [Browse the Marketplace](/marketplace)
- [Create Your First Plugin](/docs#creating-plugins)
- [Join Our Community](/community)
      `
    },
    {
      id: "api-reference",
      title: "API Reference",
      icon: Code,
      content: `
# API Reference

The AdvancingTechnology.dev API provides programmatic access to our plugin ecosystem.

## Authentication

All API requests require authentication using an API key.

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.advancingtechnology.dev/v1/plugins
\`\`\`

## Endpoints

### List Plugins

\`\`\`http
GET /v1/plugins
\`\`\`

Returns a list of available plugins.

**Response:**
\`\`\`json
{
  "plugins": [
    {
      "id": "plugin-123",
      "name": "AI Chat Plugin",
      "version": "2.1.0",
      "description": "Advanced conversational AI"
    }
  ]
}
\`\`\`

### Install Plugin

\`\`\`http
POST /v1/plugins/{id}/install
\`\`\`

Installs a plugin to your account.

### Plugin Usage

\`\`\`http
POST /v1/plugins/{id}/execute
\`\`\`

Execute a plugin with the provided parameters.
      `
    },
    {
      id: "creating-plugins",
      title: "Creating Plugins",
      icon: Package,
      content: `
# Creating Plugins

Learn how to create and publish your own AI-powered plugins on our marketplace.

## Plugin Structure

Every plugin consists of:

1. **Manifest File** (\`plugin.json\`)
2. **Source Code**
3. **Documentation**
4. **Test Suite**

## Manifest Example

\`\`\`json
{
  "name": "my-ai-plugin",
  "version": "1.0.0",
  "description": "AI-powered plugin description",
  "author": "Your Name",
  "main": "index.js",
  "permissions": ["api", "storage"],
  "aiModels": ["gpt-4", "claude-3"]
}
\`\`\`

## Development Workflow

1. **Initialize Plugin**
   \`\`\`bash
   npx create-at-plugin my-plugin
   \`\`\`

2. **Develop Locally**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Test Your Plugin**
   \`\`\`bash
   npm test
   \`\`\`

4. **Publish to Marketplace**
   \`\`\`bash
   npm run publish
   \`\`\`

## Best Practices

- Keep plugins focused on a single purpose
- Provide comprehensive documentation
- Include example usage
- Handle errors gracefully
- Optimize for performance
      `
    },
    {
      id: "cli-tools",
      title: "CLI Tools",
      icon: Terminal,
      content: `
# CLI Tools

The AdvancingTechnology CLI provides powerful tools for plugin development and management.

## Installation

\`\`\`bash
npm install -g @advancingtechnology/cli
\`\`\`

## Commands

### Login

\`\`\`bash
at login
\`\`\`

Authenticate with your AdvancingTechnology.dev account.

### Create Plugin

\`\`\`bash
at create plugin <name>
\`\`\`

Scaffold a new plugin project.

### Deploy Plugin

\`\`\`bash
at deploy
\`\`\`

Deploy your plugin to the marketplace.

### List Plugins

\`\`\`bash
at list plugins
\`\`\`

Show all your published plugins.

### Plugin Analytics

\`\`\`bash
at analytics <plugin-id>
\`\`\`

View analytics for your plugin.

## Configuration

Create a \`.atconfig\` file in your project root:

\`\`\`json
{
  "apiKey": "your-api-key",
  "defaultRegion": "us-east-1",
  "analytics": true
}
\`\`\`
      `
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Zap,
      content: `
# Integrations

Connect AdvancingTechnology.dev plugins with your favorite tools and services.

## Supported Integrations

### Slack

\`\`\`javascript
const { SlackIntegration } = require('@at/integrations');

const slack = new SlackIntegration({
  token: process.env.SLACK_TOKEN
});

slack.onMessage(async (message) => {
  const response = await plugin.process(message.text);
  await slack.reply(message, response);
});
\`\`\`

### GitHub

Automate your GitHub workflow with AI plugins:

\`\`\`yaml
name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: advancingtechnology/ai-review@v1
        with:
          plugin-id: 'code-reviewer'
          api-key: \${{ secrets.AT_API_KEY }}
\`\`\`

### VS Code Extension

Install our VS Code extension for seamless development:

1. Open VS Code
2. Search for "AdvancingTechnology"
3. Install and configure with your API key

### Webhooks

Set up webhooks to trigger plugins:

\`\`\`javascript
app.post('/webhook', async (req, res) => {
  const result = await at.plugins.execute('plugin-id', {
    data: req.body
  });
  res.json(result);
});
\`\`\`
      `
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
      content: `
# Security Best Practices

Keep your plugins and integrations secure with these best practices.

## API Key Management

- **Never commit API keys** to version control
- Use environment variables for sensitive data
- Rotate keys regularly
- Limit key permissions to minimum required

## Plugin Security

### Input Validation

\`\`\`javascript
function validateInput(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid input');
  }
  
  // Sanitize user input
  const sanitized = sanitizeHTML(data.content);
  return sanitized;
}
\`\`\`

### Rate Limiting

Implement rate limiting to prevent abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
});

app.use('/api/', limiter);
\`\`\`

## Data Privacy

- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper access controls
- Follow GDPR and privacy regulations

## Reporting Security Issues

Found a security vulnerability? Please report it to:
- Email: security@advancingtechnology.dev
- PGP Key: Available on our website

We appreciate responsible disclosure and will acknowledge your contribution.
      `
    }
  ];

  const currentSection = docSections.find(s => s.id === selectedSection) || docSections[0];

  const quickLinks = [
    { title: "Plugin SDK", href: "#", icon: Package },
    { title: "Example Projects", href: "#", icon: Code },
    { title: "Video Tutorials", href: "#", icon: FileText },
    { title: "API Playground", href: "#", icon: Terminal }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      
      <main className="flex-1">
        <div className="container py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, deploy, and integrate AI-powered plugins
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{link.title}</h3>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <nav className="sticky top-24 space-y-1 overflow-x-auto lg:overflow-x-visible">
                <div className="flex lg:flex-col gap-2 lg:gap-1 pb-2 lg:pb-0">
                {docSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`flex-shrink-0 lg:w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors text-left whitespace-nowrap text-sm lg:text-base ${
                      selectedSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <section.icon className="w-4 lg:w-5 h-4 lg:h-5 flex-shrink-0" />
                    <span className="font-medium">{section.title}</span>
                    {selectedSection === section.id && (
                      <ChevronRight className="w-4 h-4 ml-auto hidden lg:block" />
                    )}
                  </button>
                ))}
                </div>
              </nav>
            </aside>

            {/* Documentation Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-xl border border-border p-8">
                <MarkdownRenderer content={currentSection.content} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      {showChatDrawer && <ChatDrawer onClose={() => setShowChatDrawer(false)} />}
      
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChatDrawer(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}