"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "everything";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
            top: "10%",
            left: "10%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Main headline */}
        <div className="mb-6">
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-semibold tracking-tight leading-none" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            <motion.span
              className="text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              autom
            </motion.span>
            <motion.span
              className="text-[#8B5CF6] inline-block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                filter: [
                  "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))",
                  "drop-shadow(0 0 25px rgba(139, 92, 246, 0.8))",
                  "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))",
                ],
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                scale: { type: "spring", stiffness: 200, damping: 15 },
                filter: { duration: 2, repeat: Infinity }
              }}
            >
              8
            </motion.span>
            <br />
            <motion.span
              className="text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-[0.7em] bg-[#8B5CF6] ml-1 align-middle"
              />
            </motion.span>
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          From chaos to autopilot. The automation system for modern businesses.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/contact">
            <motion.button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#06B6D4] text-white font-semibold text-lg shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Start Free Trial
            </motion.button>
          </Link>
          
          <Link href="/services">
            <motion.button
              className="group px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg flex items-center gap-2"
              whileHover={{ scale: 1.02, borderColor: "rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              See How It Works
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <motion.div
              className="w-1.5 h-3 rounded-full bg-[#8B5CF6]"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
