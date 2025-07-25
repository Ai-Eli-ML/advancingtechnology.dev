import { Suspense } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import { fetchPlugins, fetchCategories } from "./actions";
import MarketplaceClient from "./client";

export default async function MarketplacePage() {
  // Fetch initial data server-side
  const [plugins, categories] = await Promise.all([
    fetchPlugins(),
    fetchCategories(),
  ]);

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <MarketplaceClient 
            initialPlugins={plugins} 
            categories={[
              { id: 'all', name: 'All', slug: 'all' },
              ...categories,
            ]} 
          />
        </Suspense>
      </main>
      <Footer />
      <ChatDrawer />
    </>
  );
}