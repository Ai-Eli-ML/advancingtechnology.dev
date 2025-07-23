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
      "group relative overflow-hidden rounded-lg border border-gold/30 bg-cream p-6 hover:shadow-lg hover:border-gold transition-all duration-200",
      className
    )}>
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-blue/5 transition-all duration-300" />
      
      <div className="relative">
        {icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue/10 text-blue">
            {icon}
          </div>
        )}
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-blue-dark/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;