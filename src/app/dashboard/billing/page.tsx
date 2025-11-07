"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import Sidebar from "@/components/Sidebar";
import {
  CreditCard,
  Download,
  ExternalLink,
  Plus,
  CheckCircle,
  XCircle,
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
import { Button } from "@/components/ui/button";
import { getBillingInfo, createStripePortalSession } from "@/lib/actions/dashboard";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  type: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
}

interface Transaction {
  id: string;
  amount: number;
  status: string;
  date: string;
  description: string;
  invoiceUrl: string;
}

export default function BillingPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [redirectingToStripe, setRedirectingToStripe] = useState(false);

  useEffect(() => {
    loadBillingInfo();
  }, []);

  const loadBillingInfo = async () => {
    setLoading(true);
    const result = await getBillingInfo();

    if (result.success && result.data) {
      setPaymentMethods(result.data.paymentMethods);
      setTransactions(result.data.transactions);
    } else {
      toast.error("Failed to load billing information");
    }
    setLoading(false);
  };

  const openStripePortal = async () => {
    setRedirectingToStripe(true);
    const result = await createStripePortalSession();

    if (result.success && result.url) {
      window.location.href = result.url;
    } else {
      toast.error("Failed to open billing portal");
      setRedirectingToStripe(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "succeeded":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            Succeeded
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            <XCircle className="w-3 h-3" />
            Failed
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
                Billing & Payments
              </h1>
              <p className="text-foreground-secondary">
                Manage your payment methods and view transaction history
              </p>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Payment Methods */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Payment Methods</CardTitle>
                          <CardDescription>
                            Manage your saved payment methods
                          </CardDescription>
                        </div>
                        <Button onClick={openStripePortal} disabled={redirectingToStripe}>
                          <Plus className="w-4 h-4 mr-2" />
                          {redirectingToStripe ? "Opening..." : "Add Payment Method"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {paymentMethods.length > 0 ? (
                        <div className="space-y-4">
                          {paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                  <CreditCard className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold capitalize">
                                      {method.brand}
                                    </span>
                                    <span className="text-muted-foreground">
                                      •••• {method.last4}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Expires {method.expiryMonth}/{method.expiryYear}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={openStripePortal}
                              >
                                Manage
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="font-display text-xl font-semibold mb-2">
                            No payment methods
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Add a payment method to make purchases
                          </p>
                          <Button onClick={openStripePortal}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Payment Method
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Stripe Customer Portal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Stripe Customer Portal</CardTitle>
                      <CardDescription>
                        Manage all billing settings in Stripe
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Access the Stripe Customer Portal to manage your payment
                        methods, view invoices, and update billing information.
                      </p>
                      <Button
                        onClick={openStripePortal}
                        disabled={redirectingToStripe}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {redirectingToStripe
                          ? "Opening Portal..."
                          : "Open Stripe Portal"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Transaction History */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>
                        Your recent billing transactions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {transactions.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Invoice</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transactions.map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell>
                                  {new Date(transaction.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {transaction.description}
                                </TableCell>
                                <TableCell className="text-right">
                                  ${transaction.amount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(transaction.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      window.open(transaction.invoiceUrl, "_blank");
                                      toast.success("Opening invoice");
                                    }}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">
                            No transactions yet
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}
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
