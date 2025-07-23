"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Tag, Download, Users, TrendingUp, Shield } from "lucide-react";
import { Plugin } from "@/types/plugin";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PluginCardProps {
  plugin: Plugin;
  className?: string;
  index?: number;
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin, className, index = 0 }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-3.5 w-3.5 transition-all duration-300",
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : i < rating 
            ? "fill-yellow-400/50 text-yellow-400" 
            : "fill-transparent text-gray-300"
        )}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/marketplace/${plugin.id}`} className="block h-full">
        <div className={cn(
          "group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-300",
          "bg-gradient-to-b from-card to-card-hover/30",
          className
        )}>
          {/* Premium Badge */}
          {plugin.verified && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg">
              <Shield className="h-3 w-3" />
              Verified
            </div>
          )}
          
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            {plugin.coverImage ? (
              <>
                <Image
                  src={plugin.coverImage}
                  alt={plugin.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <Tag className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
            
            {/* Price Badge */}
            <div className="absolute top-4 right-4 rounded-lg bg-background/95 backdrop-blur-md px-3 py-1.5 shadow-lg border border-border/50">
              <span className="font-bold text-base">
                {plugin.price === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span className="text-foreground">${plugin.price}</span>
                )}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Title and Description */}
            <div>
              <h3 className="font-semibold text-xl mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
                {plugin.name}
              </h3>
              <p className="text-sm text-foreground-secondary line-clamp-2 leading-relaxed">
                {plugin.tagline}
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between pt-2">
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  {renderStars(plugin.rating)}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {plugin.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({plugin.reviewCount || '0'})
                </span>
              </div>
              
              {/* Downloads */}
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Download className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{plugin.downloads || '0'}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 pt-2">
              {plugin.categories.slice(0, 2).map((category: string) => (
                <span
                  key={category}
                  className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  {category}
                </span>
              ))}
              {plugin.categories.length > 2 && (
                <span className="inline-flex items-center rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  +{plugin.categories.length - 2}
                </span>
              )}
            </div>

            {/* Bottom Actions - Hidden by default, shown on hover */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{plugin.activeUsers || '0'} users</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-600">Trending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PluginCard;