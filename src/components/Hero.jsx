'use client';
import { motion } from 'framer-motion';
import { Figtree } from 'next/font/google';
import { heroIcons } from '@/assets';

const figtree = Figtree({ subsets: ['latin'], weight: ['400','600','800'] });

// ↘️ put your real links here, same order as heroIcons
const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook',  href: '#' },
  { label: 'Dribbble',  href: '#' },
  { label: 'YouTube',   href: '#' },
];

export default function Hero() {
  return (
    <section id="home" className="h-[70vh] md:h-[60vh] grid place-items-center">
      <div className="text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`${figtree.className} text-5xl md:text-4xl sm:text-3xl font-extrabold tracking-wide text-gray-800 dark:text-white`}
        >
          <span className="text-rose-500">M</span>anoj&nbsp;
          <span className="text-emerald-500">K</span>umar&nbsp;
          <span className="text-sky-500">T</span>iwari
        </motion.h1>

        <p className="mt-2 text-lg md:text-base text-gray-700 dark:text-gray-200 tracking-wide">
          Director, Indian Institute of Management Mumbai
        </p>

        {/* social buttons (kept) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-3xl text-yellow-600 sm:text-2xl"
        >
          {heroIcons.map((icon, i) => {
            const link = socialLinks[i]?.href ?? '#';
            const label = socialLinks[i]?.label ?? `social-${i + 1}`;
            return (
              <a
                key={i}
                href={link}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 hover:bg-yellow-500/20 hover:text-yellow-700
                           focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
              >
                {icon}
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
