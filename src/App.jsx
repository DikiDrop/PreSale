
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import TokenSaleCard from "@/components/TokenSaleCard";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <main className="w-full max-w-md mt-8 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text-primary"
          >
            Get Your DIKI Tokens Now!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center text-muted-foreground mb-8 max-w-lg mx-auto"
          >
            Participate in the exclusive pre-sale event. Send SOL to the address below and secure your spot in the DikiDrop revolution. Tokens distributed manually after the sale.
          </motion.p>
          <TokenSaleCard />
        </main>
        
        <Toaster />
      </div>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          © {new Date().getFullYear()} DikiDrop.fun - All rights reserved
        </motion.p>
      </footer>
    </div>
  );
};

export default App;
