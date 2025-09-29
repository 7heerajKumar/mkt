'use client';
import Heading from './sub/Heading';
import Image from 'next/image';
import { reviewsData, arrowIcons } from '@/assets';
import { useState, useRef, useEffect } from 'react';
import { animate, motion } from 'framer-motion';

const AUTOPLAY_MS = 4000;

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(false);
  const [paused, setPaused] = useState(false);
  const prevIndex = useRef(0);
  const slides = useRef([]);

  const forwardAnim = () => {
    const curr = slides.current[index];
    const prev = slides.current[prevIndex.current];
    if (curr) animate(curr, { x: 0 }, { delay: 0.2 });
    if (prev && prevIndex.current !== index) animate(prev, { x: '-100%' });
  };
  const backwardAnim = () => {
    const curr = slides.current[index];
    const prev = slides.current[prevIndex.current];
    if (curr) animate(curr, { x: 0 }, { delay: 0.2 });
    if (prev && prevIndex.current !== index) animate(prev, { x: '100%' });
  };

  useEffect(() => {
    if (!slides.current[index]) return;
    direction ? backwardAnim() : forwardAnim();
    prevIndex.current = index;
  }, [index, direction]);

  useEffect(() => {
    if (paused || typeof document === 'undefined' || document.hidden || reviewsData.length <= 1) return;
    const id = setInterval(() => {
      setDirection(false);
      setIndex((i) => (i + 1) % reviewsData.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (!reviewsData?.length) return null;

  return (
    <div id="reviews" className="my-20">
      <Heading text="Gallery" />
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative w-[900px] xl:w-[800px] lg:w-[640px] md:w-[95%] sm:w-[300px]
                     h-[660px] xl:h-[620px] lg:h-[560px] md:h-[540px] sm:h-[520px]
                     flex items-center justify-center overflow-hidden rounded-2xl"
        >
          {reviewsData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: i === 0 ? 0 : '100%' }}
              ref={(el) => (slides.current[i] = el)}
              className="absolute inset-0
                         grid grid-rows-[1fr_auto_auto] place-items-center gap-y-2
                         border border-yellow-500 bg-zinc-50 rounded-xl
                         dark:bg-zinc-700 transition-colors
                         px-6 md:px-5 pt-8 pb-6 overflow-hidden"
            >
              {/* Row 1: BIG image, but capped so it never hits borders */}
              <div className="row-start-1 row-end-2 flex items-center justify-center w-full h-full">
                <Image
                  src={item.image}
                  alt={item.name || 'Image'}
                  width={800}
                  height={800}
                  priority={i === 0}
                  className="
                    max-h-[460px] xl:max-h-[420px] lg:max-h-[380px] md:max-h-[360px] sm:max-h-[260px]
                    w-auto max-w-[88%]    /* leave side padding */
                    rounded-xl border border-yellow-500 p-2
                    object-contain bg-white
                  "
                />
              </div>

              {/* Row 2: Title */}
              <h2 className="row-start-2 text-2xl lg:text-xl font-semibold text-center tracking-wide text-yellow-600">
                {item.name}
              </h2>

              {/* Row 3: ONE-LINE tiny description (always visible) */}
              <p
                className="row-start-3 text-[11px] md:text-xs text-center font-normal
                           text-gray-600 dark:text-gray-200
                           w-[80%] md:w-[90%] sm:w-[92%] block
                           overflow-hidden text-ellipsis whitespace-nowrap"
                title={item.comment}
              >
                {item.comment}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls (wrap both ways) */}
        <div className="flex gap-x-4 text-4xl text-yellow-500 mt-5">
          <button
            className="hover:scale-150 transition-all"
            onClick={() => {
              setDirection(true);
              setIndex((i) => (i - 1 + reviewsData.length) % reviewsData.length);
            }}
            aria-label="Previous"
          >
            {arrowIcons[0]}
          </button>
          <button
            className="hover:scale-150 transition-all"
            onClick={() => {
              setDirection(false);
              setIndex((i) => (i + 1) % reviewsData.length);
            }}
            aria-label="Next"
          >
            {arrowIcons[1]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
