import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Footer = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const contractAddress = '3MUjjYipARdMFNWxcJAdT1k7kBEqvu3Anqszko6gpump';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Contract address copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy address',
        variant: 'destructive',
      });
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com',
    },
    {
      name: 'X/Twitter',
      url: 'https://x.com/pokellectorfun',
    },
    {
      name: 'Discord',
      url: 'https://discord.com',
    },
    {
      name: 'Telegram',
      url: 'https://telegram.org',
    },
  ];

  return (
    <footer className="w-full bg-neo-black border-t-2 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12">
          {/* LEFT SECTION */}
          <div className="flex flex-col items-center lg:items-start gap-4 flex-1">
            {/* Project Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF4D8] font-magox">
              Pokellector
            </h2>
            
            {/* Tagline */}
            <p className="text-base sm:text-lg text-[#FBF4D8]/80 text-center lg:text-left">
              Your ultimate trading card collection platform
            </p>
            
            {/* Contract Address */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm sm:text-base text-[#FBF4D8]/70">CA</span>
              <button
                onClick={handleCopyAddress}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2",
                  "text-sm sm:text-base font-semibold text-neo-yellow",
                  "border-2 border-neo-yellow rounded-lg",
                  "hover:bg-neo-yellow hover:text-neo-black",
                  "transition-all duration-200",
                  "active:scale-95"
                )}
                aria-label="Copy contract address"
              >
                {contractAddress}
                {copied ? (
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>

          {/* RIGHT SECTION - Social Links */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3",
                  "text-sm sm:text-base lg:text-lg font-semibold",
                  "text-[#FBF4D8] border-2 border-[#FBF4D8] rounded-lg",
                  "hover:bg-[#FBF4D8] hover:text-neo-black",
                  "hover:border-neo-yellow hover:scale-105",
                  "transition-all duration-200",
                  "active:scale-95"
                )}
                aria-label={social.name}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

