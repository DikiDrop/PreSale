
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info, AlertCircle, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import TokenCounter from "@/components/TokenCounter";
import CopyButton from "@/components/CopyButton";

const WALLET_ADDRESS = "FgmMdCSNd2CjBbEYtekqUV9Tgx7ycQQ9YsvXs6UWfeoh";
const TOTAL_TOKENS = 400000000;
const SOFT_CAP = 150;
const TOKEN_PRICE = 0.000000375; // SOL per DIKI token
const LOCAL_STORAGE_KEY = "dikiDropRaisedAmount";

const TokenSaleCard = () => {
  const [solAmount, setSolAmount] = useState(1);
  const [tokenAmount, setTokenAmount] = useState(Math.floor(1 / TOKEN_PRICE));
  const [progress, setProgress] = useState(0);
  const [raisedAmount, setRaisedAmount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const storedRaisedAmount = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialRaised = storedRaisedAmount ? parseFloat(storedRaisedAmount) : 0;
    setRaisedAmount(initialRaised);
    setProgress(Math.min((initialRaised / SOFT_CAP) * 100, 100));
  }, []);

  const handleSolChange = (value) => {
    const newSolAmount = Math.max(0.1, value[0]); // Ensure min 0.1 SOL
    setSolAmount(newSolAmount);
    setTokenAmount(Math.floor(newSolAmount / TOKEN_PRICE));
  };

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    const clampedValue = Math.max(0.1, value); // Ensure min 0.1 SOL
    setSolAmount(clampedValue);
    setTokenAmount(Math.floor(clampedValue / TOKEN_PRICE));
  };

  const handlePurchase = () => {
    const currentRaised = raisedAmount;
    const newRaisedAmount = currentRaised + solAmount;

    localStorage.setItem(LOCAL_STORAGE_KEY, newRaisedAmount.toString());

    setRaisedAmount(newRaisedAmount);
    setProgress(Math.min((newRaisedAmount / SOFT_CAP) * 100, 100));

    toast({
      title: "Ready to Purchase!",
      description: `To complete your purchase of ${tokenAmount.toLocaleString()} DIKI, send exactly ${solAmount.toFixed(4)} SOL to the address shown. Tokens will be airdropped manually after the pre-sale.`,
      duration: 7000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="w-full max-w-md mx-auto shadow-xl overflow-hidden border-2 border-primary/20">
        <CardHeader className="card-header-gradient-bg">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Zap className="mr-2 h-6 w-6" /> DIKI Token Pre-Sale
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Fuel the DikiDrop revolution!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Pre-Sale Progress</h3>
              <span className="text-sm font-medium text-primary">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Raised: <span className="font-semibold text-foreground">{raisedAmount.toFixed(2)} SOL</span></span>
              <span>Soft Cap: <span className="font-semibold text-foreground">{SOFT_CAP} SOL</span></span>
            </div>
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 leading-relaxed">
              <strong className="font-medium">Important:</strong> Send SOL only from a wallet you control (e.g., Phantom, Solflare). Do not send from exchanges. Tokens are distributed manually post-sale.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="sol-amount" className="font-medium">Amount in SOL (Min 0.1)</Label>
              <Input
                id="sol-amount"
                type="number"
                min="0.1"
                step="0.1"
                value={solAmount}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold border-2 focus:border-primary focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Adjust quickly</Label>
              <Slider
                min={0.1}
                max={10} 
                step={0.1}
                value={[solAmount]}
                onValueChange={handleSolChange}
                className="[&>span:first-child]:bg-primary"
                thumbClassName="bg-background border-2 border-primary ring-offset-background focus-visible:ring-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.1 SOL</span>
                <span>10 SOL</span>
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 text-center">
              <div className="text-sm text-muted-foreground mb-1">You'll Receive Approximately:</div>
              <div className="flex items-baseline justify-center">
                <TokenCounter value={tokenAmount} className="text-3xl md:text-4xl gradient-text-primary" duration={0.5} />
                <span className="ml-2 text-xl font-medium text-primary">DIKI</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Send SOL to this Official Pre-Sale Address:</Label>
            <div className="p-3 bg-muted rounded-md text-sm font-mono break-all border">
              {WALLET_ADDRESS}
            </div>
            <CopyButton text={WALLET_ADDRESS} className="w-full mt-1 border-secondary text-secondary hover:bg-secondary/10" />
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={handlePurchase}
            className="w-full text-lg py-3 h-auto button-primary-gradient pulse-glow-button shadow-lg"
            size="lg"
          >
            Get Purchase Instructions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
       <p className="text-center text-xs text-muted-foreground mt-4">
         Total pre-sale supply: {TOTAL_TOKENS.toLocaleString()} DIKI
       </p>
    </motion.div>
  );
};

export default TokenSaleCard;
