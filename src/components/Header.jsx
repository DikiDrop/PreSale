
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
      className="w-full p-4 bg-card shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/a9c1b948-f156-4d3c-9396-41d94569458d/e61b93829e91bce07493d08dd068dc5f.png"
            alt="DikiDrop Mascot"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold gradient-text-primary">
            DikiDrop Pre-Sale
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="border-primary text-primary hover:bg-primary/10"
          >
            <a href="https://dikidrop.fun" target="_blank" rel="noopener noreferrer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to DikiDrop.fun
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
