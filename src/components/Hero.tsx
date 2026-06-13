"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { PETALS, EVENT } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { useInvitation } from "@/context/InvitationContext";
import { Ornament } from "@/components/ui/Ornament";

const HERO_IMAGE = "/images/heroImg.jpg";

const silkEase = [0.25, 0.1, 0.25, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: silkEase },
  },
};

const photoReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04, x: 24 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1.1, ease: silkEase, delay: 0.15 },
  },
};

export function Hero() {
  const { t, lang } = useInvitation();
  const eventDate = EVENT.dateDisplay[lang];

  return (
    <section className="hero" id="home">
      {/* Mobile: full-bleed photo */}
      <div className="hero-mobile-bg" aria-hidden>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[center_20%]"
          />
        </motion.div>
        <div className="hero-mobile-overlay" />
      </div>

      <div className="hero-desktop-bg" aria-hidden />
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />

      {PETALS.map((petal, index) => (
        <div
          key={index}
          className="floating-petal"
          style={{
            left: petal.left,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
          aria-hidden
        />
      ))}

      <Ornament
        size="md"
        animation="spin-slow"
        className="hero-ornament-top"
        opacity={0.45}
      />
      <Ornament
        size="sm"
        animation="float"
        className="hero-ornament-corner hero-ornament-corner--tl"
        opacity={0.25}
      />
      <Ornament
        size="sm"
        animation="sway"
        className="hero-ornament-corner hero-ornament-corner--br"
        opacity={0.2}
        flip="horizontal"
      />

      <div className="hero-inner">
        <motion.div
          className="hero-content"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p className="hero-eyebrow" variants={fadeUp}>
            {t.heroEyebrow}
          </motion.p>

          <motion.h1 className="hero-name" variants={fadeUp}>
            {EVENT.brideName}
          </motion.h1>

          <motion.p className="hero-event" variants={fadeUp}>
            {t.heroEvent}
          </motion.p>

          <motion.p className="hero-date" variants={fadeUp}>
            {eventDate}
          </motion.p>

          <motion.div className="hero-divider" variants={fadeUp} aria-hidden />

          <motion.p className="hero-text" variants={fadeUp}>
            {t.heroText}
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp}>
            <button
              type="button"
              className="hero-cta"
              onClick={() => scrollToSection("rsvp")}
            >
              {t.heroCta}
            </button>
            <button
              type="button"
              className="hero-cta-ghost"
              onClick={() => scrollToSection("event")}
            >
              {lang === "ru" ? "Подробнее" : "Толығырақ"}
            </button>
          </motion.div>
        </motion.div>

        {/* Desktop: framed portrait */}
        <motion.div
          className="hero-photo"
          variants={photoReveal}
          initial="hidden"
          animate="show"
        >
          <div className="hero-photo-glow" aria-hidden />
          <div className="hero-photo-frame">
            <Image
              src={HERO_IMAGE}
              alt={EVENT.brideName}
              fill
              priority
              sizes="(max-width: 1024px) 0vw, 420px"
              quality={90}
            />
            <div className="hero-photo-badge">
              <span>{EVENT.brideName}</span>
              <small>{t.heroEvent}</small>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden
      >
        <motion.div
          className="hero-scroll-line"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
