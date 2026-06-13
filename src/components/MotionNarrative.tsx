"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionProof } from "@/content/pages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const narrative =
  "The right home energy plan starts with the roof over your head, the bill you pay every month, and the warranty you can trust if something goes wrong.";

export function MotionNarrative() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const pin = section.querySelector(".motion-pin");
      const words = gsap.utils.toArray<HTMLElement>(".reveal-word", section);
      const images = gsap.utils.toArray<HTMLElement>(".motion-image", section);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isCompact = window.matchMedia("(max-width: 720px)").matches;

      if (prefersReducedMotion || isCompact) {
        gsap.set(words, { opacity: 1, y: 0 });
        gsap.set(images, { opacity: 1, scale: 1 });
        return;
      }

      if (pin) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          pinSpacing: false
        });
      }

      gsap.fromTo(
        words,
        { opacity: 0.12, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.045,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 62%",
            end: "45% center",
            scrub: true
          }
        }
      );

      images.forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 0.82, opacity: 0.42 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image,
              start: "top 82%",
              end: "bottom 25%",
              scrub: true
            }
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="motion-narrative" ref={sectionRef}>
      <div className="motion-pin">
        <p className="eyebrow">Whole-home energy planning</p>
        <h2>
          {narrative.split(" ").map((word, index) => (
            <span className="reveal-word" key={`${word}-${index}`}>
              {word}
            </span>
          ))}
        </h2>
      </div>
      <div className="motion-gallery">
        {motionProof.map((item) => (
          <article className="motion-card" key={item.title}>
            <div className="motion-image" style={{ backgroundImage: `url(${item.image})` }} aria-hidden="true" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
