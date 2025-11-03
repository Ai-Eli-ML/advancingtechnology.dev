import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  className
}) => {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-lg border border-border bg-card p-4 sm:p-6 hover:shadow-lg hover:border-border-hover transition-all duration-200",
      className
    )}>
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-primary/5 transition-all duration-300" />

      <div className="relative">
        {icon && (
          <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <h3 className="font-semibold text-base sm:text-lg mb-2">{title}</h3>
        <p className="text-sm text-foreground-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;