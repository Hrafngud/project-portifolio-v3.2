import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ExpandableCardProps {
  children: React.ReactNode;
  fullContent: React.ReactNode;
  className?: string;
}

export function ExpandableCard({ children, fullContent, className }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={cn(
        "relative",
        isExpanded && "fixed inset-4 z-50 overflow-y-auto bg-background/95 backdrop-blur",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <Card 
          className={cn(
            "transition-all duration-300",
            !isExpanded && [
              "cursor-pointer group",
              "hover:bg-background/80 hover:backdrop-blur-sm",
              "hover:shadow-[0_0_15px_rgba(132,204,22,0.5)]",
              "hover:border-lime-500/50"
            ],
            isExpanded && "mx-auto max-w-4xl overflow-hidden"
          )}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          <div className={cn(
            "absolute inset-0 -z-10 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-lime-500/5 to-accent/5 group-hover:opacity-100 rounded-xl"
          )} />
          
          <div className="transition-colors group-hover:[&_h3]:text-lime-500 group-hover:[&_p]:text-lime-400">
            {isExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-accent/10 bg-background/80 backdrop-blur z-10"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full max-h-screen overflow-y-auto p-6"
              >
                {fullContent}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </Card>
      </AnimatePresence>
    </motion.div>
  );
} 