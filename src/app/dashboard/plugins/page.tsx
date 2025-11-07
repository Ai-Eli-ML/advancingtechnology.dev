"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import Sidebar from "@/components/Sidebar";
import {
  Plus,
  Search,
  Download,
  Edit,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  Package,
  Trash2,
  X,
  Save,
  Power,
  PowerOff
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getMyPlugins,
  createPlugin,
  updatePlugin,
  deletePlugin,
  togglePluginStatus,
} from "@/lib/actions/plugins";
import { toast } from "sonner";

interface Plugin {
  id: number;
  name: string;
  description: string;
  status: "active" | "draft" | "pending";
  downloads: number;
  revenue: string;
  rating: number;
  lastUpdated: string;
  version: string;
  price: number;
  category: string;
}

export default function DashboardPluginsPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft" | "pending">("all");
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    version: "1.0.0",
    price: 0,
    category: "AI"
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPlugins();
  }, []);

  const loadPlugins = async () => {
    const result = await getMyPlugins();

    if (result.success && result.data) {
      setPlugins(result.data);
    } else {
      toast.error("Failed to load plugins");
    }
  };

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || plugin.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreatePlugin = async () => {
    setSubmitting(true);
    const result = await createPlugin(formData);

    if (result.success) {
      toast.success("Plugin created successfully");
      setShowCreateModal(false);
      setFormData({ name: "", description: "", version: "1.0.0", price: 0, category: "AI" });
      loadPlugins();
    } else {
      toast.error(result.error || "Failed to create plugin");
    }
    setSubmitting(false);
  };

  const handleEditPlugin = async () => {
    if (!selectedPlugin) return;

    setSubmitting(true);
    const result = await updatePlugin(selectedPlugin.id, formData);

    if (result.success) {
      toast.success("Plugin updated successfully");
      setShowEditModal(false);
      setSelectedPlugin(null);
      setFormData({ name: "", description: "", version: "1.0.0", price: 0, category: "AI" });
      loadPlugins();
    } else {
      toast.error(result.error || "Failed to update plugin");
    }
    setSubmitting(false);
  };

  const handleDeletePlugin = async () => {
    if (!selectedPlugin) return;

    setSubmitting(true);
    const result = await deletePlugin(selectedPlugin.id);

    if (result.success) {
      toast.success("Plugin deleted successfully");
      setShowDeleteModal(false);
      setSelectedPlugin(null);
      loadPlugins();
    } else {
      toast.error(result.error || "Failed to delete plugin");
    }
    setSubmitting(false);
  };

  const handleToggleStatus = async (plugin: Plugin) => {
    const newStatus = plugin.status === "active" ? "draft" : "active";
    const result = await togglePluginStatus(plugin.id, newStatus);

    if (result.success) {
      toast.success(result.message);
      loadPlugins();
    } else {
      toast.error(result.error || "Failed to toggle plugin status");
    }
  };

  const openEditModal = (plugin: Plugin) => {
    setSelectedPlugin(plugin);
    setFormData({
      name: plugin.name,
      description: plugin.description,
      version: plugin.version,
      price: plugin.price,
      category: plugin.category
    });
    setShowEditModal(true);
  };

  const getStatusColor = (status: Plugin["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      
      <div className="flex-1 flex">
        <Sidebar className="hidden lg:block" />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold mb-2">My Plugins</h1>
                <p className="text-muted-foreground">
                  Manage and monitor your AI-powered plugins
                </p>
              </div>
              <button className="mt-4 sm:mt-0 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Plugin
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                <Input
                  type="text"
                  placeholder="Search plugins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={(value: "all" | "active" | "draft" | "pending") => setFilterStatus(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Plugin Cards */}
            <div className="grid gap-6">
              {filteredPlugins.map((plugin) => (
                <div key={plugin.id} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Plugin Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-display text-xl font-semibold">{plugin.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plugin.status)}`}>
                              {plugin.status}
                            </span>
                            <span className="text-sm text-muted-foreground">v{plugin.version}</span>
                          </div>
                          <p className="text-muted-foreground mb-3">{plugin.description}</p>
                          
                          {/* Stats */}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{plugin.downloads}</span>
                              <span className="text-muted-foreground">downloads</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{plugin.revenue}</span>
                              <span className="text-muted-foreground">revenue</span>
                            </div>
                            {plugin.rating > 0 && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                <span className="font-medium">{plugin.rating}</span>
                                <span className="text-muted-foreground">rating</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Updated {plugin.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(plugin)}>
                        <Edit className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(plugin)}
                        disabled={plugin.status === "pending"}
                      >
                        {plugin.status === "active" ? (
                          <PowerOff className="w-4 h-4 mr-2" />
                        ) : (
                          <Power className="w-4 h-4 mr-2" />
                        )}
                        <span className="hidden sm:inline">
                          {plugin.status === "active" ? "Unpublish" : "Publish"}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPlugin(plugin);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  {/* Performance Graph (for active plugins) */}
                  {plugin.status === "active" && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Last 7 days performance</span>
                      </div>
                      <div className="h-24 bg-muted rounded-lg flex items-end justify-around p-2">
                        {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                          <div
                            key={i}
                            className="w-full max-w-[40px] bg-primary rounded-t"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPlugins.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">No plugins found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || filterStatus !== "all" 
                    ? "Try adjusting your search or filters"
                    : "Create your first plugin to get started"}
                </p>
                {!searchQuery && filterStatus === "all" && (
                  <Button onClick={() => setShowCreateModal(true)} className="mx-auto">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Plugin
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create/Edit Plugin Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">
                {showCreateModal ? "Create New Plugin" : "Edit Plugin"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedPlugin(null);
                  setFormData({ name: "", description: "", version: "1.0.0", price: 0, category: "AI" });
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="plugin-name">Plugin Name</Label>
                <Input
                  id="plugin-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter plugin name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="plugin-description">Description</Label>
                <Textarea
                  id="plugin-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your plugin..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plugin-version">Version</Label>
                  <Input
                    id="plugin-version"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="1.0.0"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="plugin-price">Price ($)</Label>
                  <Input
                    id="plugin-price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="plugin-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI">AI & Machine Learning</SelectItem>
                    <SelectItem value="Development">Development Tools</SelectItem>
                    <SelectItem value="Analytics">Analytics & Data</SelectItem>
                    <SelectItem value="Productivity">Productivity</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    setSelectedPlugin(null);
                    setFormData({ name: "", description: "", version: "1.0.0", price: 0, category: "AI" });
                  }}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={showCreateModal ? handleCreatePlugin : handleEditPlugin}
                  disabled={submitting || !formData.name || !formData.description}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {submitting ? "Saving..." : showCreateModal ? "Create Plugin" : "Save Changes"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPlugin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border max-w-md w-full p-6"
          >
            <h2 className="font-display text-2xl font-bold mb-4 text-destructive">
              Delete Plugin
            </h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete <span className="font-semibold">{selectedPlugin.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPlugin(null);
                }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDeletePlugin}
                disabled={submitting}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {submitting ? "Deleting..." : "Delete Plugin"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
      {showChatDrawer && <ChatDrawer onClose={() => setShowChatDrawer(false)} />}
      
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChatDrawer(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}