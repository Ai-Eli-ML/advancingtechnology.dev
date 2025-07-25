import { notFound } from 'next/navigation';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import ChatDrawer from '@/components/ChatDrawer';
import { fetchPluginBySlug, checkUserPurchase } from '../actions';
import PluginDetailClient from './client';

interface PluginDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PluginDetailPage({ params }: PluginDetailPageProps) {
  const { slug } = await params;
  
  // Fetch plugin details
  const plugin = await fetchPluginBySlug(slug);
  
  if (!plugin) {
    notFound();
  }

  // Check if user owns the plugin
  const userOwnsPlugin = await checkUserPurchase(plugin.id);

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen bg-background">
        <PluginDetailClient 
          plugin={plugin} 
          userOwnsPlugin={userOwnsPlugin}
        />
      </main>
      <Footer />
      <ChatDrawer />
    </>
  );
}