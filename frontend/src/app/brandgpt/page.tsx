"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/hover-border-gradient";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { TypewriterEffectSmooth } from "@/components/typewriter-effect";

export default function BrandGPTPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateText = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: input,
          temperature: 0.7,
          max_tokens: 300,
          model: "mistral",
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: { outputs: string } = await res.json();
      setOutput(data.outputs);
    } catch (e) {
      console.error(e);
      setOutput("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-12">
      {/* Hero */}
      <motion.div
        className="text-center max-w-2xl mx-auto mt-[10vh]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TextGenerateEffect words="BrandGPT" />
        <TypewriterEffectSmooth
          words={[
            { text: "AI-powered" },
            { text: "personal branding" },
            { text: "assistant" },
          ]}
          className="text-lg sm:text-xl md:text-2xl"
        />
      </motion.div>

      {/* Input */}
      <section className="mt-10 flex justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Describe Your Brand</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your brand details..."
            className="w-full h-32 p-4 rounded-lg text-black bg-white/50 mb-4"
          />
          <button
            onClick={handleGenerateText}
            disabled={isLoading}
            className="bg-gradient-to-br from-gray-900 to-black text-white px-6 py-3 font-semibold rounded-lg"
          >
            {isLoading ? "Generating…" : "🚀 Generate Content"}
          </button>
        </div>
      </section>

      {/* Output */}
      {output && (
        <section className="mt-10 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Generated Content</h2>
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="whitespace-pre-wrap">{output}</p>
          </div>
        </section>
      )}
    </main>
  );
}
