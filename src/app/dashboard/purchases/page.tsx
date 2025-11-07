"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import Sidebar from "@/components/Sidebar";
import {
  Download,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPurchases, requestRefund } from "@/lib/actions/dashboard";
import { toast } from "sonner";

interface Purchase {
  id: number;
  pluginName: string;
  amount: number;
  status: string;
  date: string;
  downloadUrl: string | null;
}

export default function PurchasesPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [submittingRefund, setSubmittingRefund] = useState(false);

  const loadPurchases = async () => {
    setLoading(true);
    const result = await getPurchases({
      status: statusFilter === "all" ? undefined : statusFilter,
    });

    if (result.success && result.data) {
      setPurchases(result.data);
    } else {
      toast.error("Failed to load purchases");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.pluginName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefundRequest = async () => {
    if (!selectedPurchase || !refundReason.trim()) {
      toast.error("Please provide a reason for the refund");
      return;
    }

    setSubmittingRefund(true);
    const result = await requestRefund(selectedPurchase.id, refundReason);

    if (result.success) {
      toast.success("Refund request submitted successfully");
      setShowRefundModal(false);
      setSelectedPurchase(null);
      setRefundReason("");
      loadPurchases();
    } else {
      toast.error(result.error || "Failed to submit refund request");
    }
    setSubmittingRefund(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
            <RefreshCw className="w-3 h-3" />
            Refunded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 bg-background-secondary/50 lg:ml-72">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-2">
                My Purchases
              </h1>
              <p className="text-foreground-secondary">
                View and manage all your plugin purchases
              </p>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search purchases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Purchases Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>
                    All your plugin purchases and downloads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : filteredPurchases.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plugin Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPurchases.map((purchase) => (
                          <TableRow key={purchase.id}>
                            <TableCell className="font-medium">
                              {purchase.pluginName}
                            </TableCell>
                            <TableCell>
                              {new Date(purchase.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              ${purchase.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {purchase.downloadUrl && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      window.open(purchase.downloadUrl!, "_blank");
                                      toast.success("Download started");
                                    }}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                )}
                                {purchase.status === "completed" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedPurchase(purchase);
                                      setShowRefundModal(true);
                                    }}
                                  >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Refund
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-12">
                      <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-display text-xl font-semibold mb-2">
                        No purchases found
                      </h3>
                      <p className="text-muted-foreground">
                        {searchQuery || statusFilter !== "all"
                          ? "Try adjusting your search or filters"
                          : "You haven't made any purchases yet"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border max-w-md w-full p-6"
          >
            <h2 className="font-display text-2xl font-bold mb-4">
              Request Refund
            </h2>
            <p className="text-muted-foreground mb-4">
              Please provide a reason for requesting a refund for{" "}
              <span className="font-semibold">{selectedPurchase?.pluginName}</span>.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="refund-reason">Reason for refund</Label>
                <Textarea
                  id="refund-reason"
                  placeholder="Please explain why you're requesting a refund..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowRefundModal(false);
                    setSelectedPurchase(null);
                    setRefundReason("");
                  }}
                  disabled={submittingRefund}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleRefundRequest}
                  disabled={submittingRefund || !refundReason.trim()}
                >
                  {submittingRefund ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
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
