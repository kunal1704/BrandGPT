"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/Hover-Border/hover-border-gradient";
import { TextGenerateEffect } from "@/components/text-generate-effect";

export default function BrandGPTPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedModel, setSelectedModel] = useState("mistral");
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
          model: selectedModel,
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
      {/* Background Glow or Beams if desired */}
      {/* Hero Title */}
      <motion.div
        className="text-center max-w-2xl mx-auto mt-[8vh]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TextGenerateEffect words="BrandGPT" />
      </motion.div>

      {/* Model + Prompt Form */}
      <section className="mt-12 flex justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2 bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-xl space-y-6">
          {/* Note */}
          <p className="text-sm text-gray-300 text-left italic">
            ⚠️ Choose <strong>Mistral</strong> if you're using a{" "}
            <strong>CPU</strong>-only system. Choose <strong>LLaMA</strong> if
            you have a <strong>GPU</strong>.
          </p>

          {/* Model Selector */}
          <div className="text-left">
            <label className="block text-md font-medium mb-2">
              Select Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/50 text-black focus:outline-none"
            >
              <option value="mistral">Mistral 7B Instruct (CPU)</option>
              <option value="llama">LLaMA 3 8B GPTQ (GPU)</option>
            </select>
          </div>

          {/* Prompt Input */}
          <div className="text-left">
            <label className="block text-md font-medium mb-2 mt-4">
              Your Brand Prompt
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your brand, tone, goals..."
              className="w-full h-32 p-4 rounded-lg text-black bg-white/50 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerateText}
              disabled={isLoading}
              className="bg-gradient-to-br from-gray-900 to-black text-white px-6 py-3 font-semibold rounded-xl hover:shadow-md"
            >
              {isLoading ? "Generating…" : "🚀 Generate Content"}
            </button>
          </div>
        </div>
      </section>

      {/* Output Section */}
      {output && (
        <section className="mt-12 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Generated Content</h2>
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 shadow-md">
            <p className="whitespace-pre-wrap">{output}</p>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="mt-4 text-sm text-blue-400 hover:underline"
            >
              📋 Copy Output
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
