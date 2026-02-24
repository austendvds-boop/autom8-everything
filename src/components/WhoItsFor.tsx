"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    title: "Owners who are tired of missed leads",
    description: "You are getting inquiries, but slow follow-up means jobs slip away.",
  },
  {
    title: "Teams with too much manual work",
    description: "Your staff is busy copying info, sending reminders, and chasing updates.",
  },
  {
    title: "Businesses ready for steady growth",
    description: "You want more calls every month, not random spikes that are hard to repeat.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Who This Is <span className="gradient-text">For</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Built for local business owners who want more calls, more booked jobs, and less missed follow-up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-[#12121A] border border-white/5 rounded-2xl p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[#A1A1AA] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
