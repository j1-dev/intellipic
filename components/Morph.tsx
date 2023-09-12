'use client';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useRef } from 'react';

export default function Morph({ texts }: { texts: string[] }): JSX.Element {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const morphTime = 1.5;
  const cooldownTime = 0.2;

  let textIndex = texts.length - 1;
  let time = useRef(new Date());
  let morph = useRef(0);
  let cooldown = useRef(cooldownTime);

  const setMorph = useCallback(
    (fraction: number) => {
      const elts = {
        text1: text1Ref.current,
        text2: text2Ref.current
      };

      if (elts.text2) {
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 10, 100)}px)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.7) * 100}%`;
      }

      fraction = 1 - fraction;

      if (elts.text1) {
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 10, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.7) * 100}%`;
        elts.text1.textContent = texts[textIndex % texts.length];
      }

      if (elts.text2) {
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      }
    },
    [texts, textIndex]
  );

  const animate = useCallback(() => {
    const newTime = new Date();
    const shouldIncrementIndex = cooldown.current > 0;
    const dt = (newTime.getTime() - time.current.getTime()) / 1000;
    time.current = newTime;

    cooldown.current -= dt;

    if (cooldown.current <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      debouncedDoMorph();
    } else {
      doCooldown();
    }
  }, [textIndex]);

  const debouncedDoMorph = useCallback(
    debounce(
      () => {
        morph.current -= cooldown.current;
        cooldown.current = 0;

        let fraction = morph.current / morphTime;

        if (fraction > 1) {
          cooldown.current = cooldownTime;
          fraction = 1;
        }

        setMorph(fraction);
      },
      5,
      {
        leading: true,
        trailing: false
      }
    ),
    [setMorph]
  );

  const doCooldown = useCallback(() => {
    morph.current = 0;

    const elts = {
      text1: text1Ref.current,
      text2: text2Ref.current
    };

    if (elts.text2) {
      elts.text2.style.filter = '';
      elts.text2.style.opacity = '100%';
    }

    if (elts.text1) {
      elts.text1.style.filter = '';
      elts.text1.style.opacity = '0%';
    }
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const startAnimation = () => {
      animationFrame = requestAnimationFrame(startAnimation);
      animate();
    };

    startAnimation();

    return () => {
      cancelAnimationFrame(animationFrame);
      debouncedDoMorph.cancel();
    };
  }, [animate, debouncedDoMorph]);

  return (
    <>
      <div id="container">
        <span id="text1" ref={text1Ref}></span>
        <span id="text2" ref={text2Ref}></span>
      </div>
      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
