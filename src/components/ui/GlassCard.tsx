import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  gradient = false
}) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 backdrop-blur-xl",
        "bg-gradient-to-br from-white/5 to-white/1",
        gradient && "bg-gradient-to-br from-primary/5 via-accent/5 to-white/1",
        hover && "transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default GlassCard;
