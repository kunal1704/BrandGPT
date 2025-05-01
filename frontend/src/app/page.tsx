// src/app/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Brain, Bot } from "lucide-react";
import { CardSpotlight } from "@/components/Card_Spotlight/card-spotlight";
import { BackgroundBeams } from "@/components/background-beams";
import { TextGenerateEffect } from "../components/text-generate-effect";
import { TypewriterEffectSmooth } from "../components/typewriter-effect";
import { HoverBorderGradient } from "../components/Hover-Border/hover-border-gradient";

interface TypewriterWord {
  text: string;
  className?: string;
}
const typewriter_words: TypewriterWord[] = [
  {
    text: "Your",
  },
  {
    text: "AI-",
  },
  {
    text: "powered",
  },
  {
    text: "personal",
  },
  {
    text: "Branding",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "Agent.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center px-6 py-12">
      <BackgroundBeams />

      {/* Hero Section */}
      <motion.div
        className="text-center max-w-2xl mt-[10vh]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TextGenerateEffect words="BrandGPT" />

        <TypewriterEffectSmooth
          words={typewriter_words}
          className="text-lg sm:text-xl md:text-2xl"
        />

        <div className="w-full flex justify-center mt-8">
          <Link href="/brandgpt" passHref>
            <HoverBorderGradient
              containerClassName=""
              className="bg-gradient-to-br from-gray-900 to-black text-white px-6 py-3 text-base font-semibold flex items-center gap-2"
            >
              <span className="text-xl">🚀</span>
              Try BrandGPT
            </HoverBorderGradient>
          </Link>
        </div>
      </motion.div>

      {/* Features */}
      <section className="mt-25 font-bold grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-5xl w-full relative">
        <FeatureCard
          icon={<Bot className="w-8 h-8 text-pink-500" />}
          title="Model Flexibility"
          description="Switch between Models depending on your hardware constraints."
        />
        <FeatureCard
          icon={<Brain className="w-8 h-8 text-purple-500" />}
          title="Smart & Personal"
          description="AI that understands your goals and delivers personal content."
        />
        <FeatureCard
          icon={<Sparkles className="w-8 h-8 text-yellow-500" />}
          title="Open Source"
          description="Transparent, customizable, and free."
        />
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <CardSpotlight className="p-6 rounded-2xl border border-white/10 shadow-lg h-full flex flex-col items-center justify-center text-center bg-white/3 backdrop-blur-sm transition duration-300 hover:shadow-pink-500/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-base text-gray-300 leading-relaxed">
        {description}
      </p>
    </CardSpotlight>
  );
}
