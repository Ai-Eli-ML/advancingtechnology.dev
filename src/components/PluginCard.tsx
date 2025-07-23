"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Tag } from "lucide-react";
import { Plugin } from "@/types/plugin";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PluginCardProps {
  plugin: Plugin;
  className?: string;
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin, className }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "fill-accent text-accent" : "text-muted-foreground"
        )}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/marketplace/${plugin.id}`}>
        <div className={cn(
          "group relative overflow-hidden rounded-lg border bg-card hover:shadow-xl transition-all duration-200",
          className
        )}>
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden bg-muted">
            {plugin.coverImage ? (
              <Image
                src={plugin.coverImage}
                alt={plugin.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Tag className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            
            {/* Price Badge */}
            <div className="absolute top-2 right-2 rounded-md bg-background/90 backdrop-blur px-2 py-1">
              <span className="font-semibold text-sm">
                {plugin.price === 0 ? "Free" : `$${plugin.price}`}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {plugin.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {plugin.tagline}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {renderStars(plugin.rating)}
              <span className="text-sm text-muted-foreground ml-1">
                ({plugin.rating})
              </span>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {plugin.categories.slice(0, 3).map((category: string) => (
                <span
                  key={category}
                  className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs"
                >
                  {category}
                </span>
              ))}
              {plugin.categories.length > 3 && (
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                  +{plugin.categories.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PluginCard;