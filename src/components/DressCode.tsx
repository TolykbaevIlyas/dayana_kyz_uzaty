"use client";

import { Ornament } from "@/components/ui/Ornament";
import { OrnamentLine } from "@/components/ui/OrnamentLine";
import { Reveal } from "@/components/ui/Reveal";
import { useInvitation } from "@/context/InvitationContext";

const FORBIDDEN_COLORS = [
  { nameRu: "Черный", nameKz: "Қара", value: "#111111" },
  { nameRu: "Белый", nameKz: "Ақ", value: "#ffffff" },
  { nameRu: "Красный", nameKz: "Қызыл", value: "#c1121f" },
  { nameRu: "Кислотный", nameKz: "Ашық қышқыл", value: "#b6ff00" },
  { nameRu: "Неоновый", nameKz: "Неон", value: "#00f5ff" },
] as const;

export function DressCode() {
  const { lang } = useInvitation();
  const isRu = lang === "ru";

  return (
    <section className="site-section dress-code-section">
      <Ornament
        size="md"
        animation="sway"
        className="section-ornament dress-code-ornament dress-code-ornament--left"
        opacity={0.12}
      />
      <Ornament
        size="sm"
        animation="float"
        className="section-ornament dress-code-ornament dress-code-ornament--right"
        opacity={0.14}
        flip="horizontal"
      />

      <div className="container">
        <Reveal>
          <p className="section-eyebrow">
            {isRu ? "Пожелание к образу" : "Киім үлгісіне тілек"}
          </p>
        </Reveal>
        <Reveal>
          <h2 className="section-title">{isRu ? "Дресс-код" : "Дресс-код"}</h2>
        </Reveal>
        <OrnamentLine />

        <Reveal className="dress-code-panel">
          <div className="dress-code-copy">
            <p className="dress-code-lead">
              {isRu
                ? "Строгого дресс-кода нет, главное - ваше присутствие и хорошее настроение."
                : "Қатаң дресс-код жоқ, ең бастысы - сіздердің келулеріңіз және жақсы көңіл-күйлеріңіз."}
            </p>
            <p className="dress-code-text">
              {isRu
                ? "Будем признательны, если вы по возможности не выберете для образа черный, белый, красный, кислотные и неоновые оттенки."
                : "Мүмкін болса, қара, ақ, қызыл, қышқыл және неон түстерін таңдамауыңызды сұраймыз."}
            </p>
          </div>

          <div className="dress-code-swatches" aria-label={isRu ? "Нежелательные цвета" : "Ұсынылмайтын түстер"}>
            {FORBIDDEN_COLORS.map((color) => (
              <div className="dress-code-swatch-card" key={color.value}>
                <span
                  className="dress-code-swatch"
                  style={{ background: color.value }}
                  aria-hidden
                />
                <span className="dress-code-swatch-name">
                  {isRu ? color.nameRu : color.nameKz}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
