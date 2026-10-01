import { useEffect, useRef, useState } from "react";

/* ─────────────  여기만 수정하세요  ───────────── */
const PROFILE = {
  name: "OH DONG RYEOL",
  title: "Video Producer & Editor",
  photo: "/assets/profile.jpg",
  reel: "/assets/profile.jpg", // 임시로 프로필 사진 연결
  email: "dhehdfuf507@naver.com",
};

const PROJECTS = [
  {
    id: "MONSTER-ENERGY",
    title: "MONSTER 광고 30's",
    role: "1인 제작 (100%)",
    tools: "Google Flow, Google Gemini, Premiere Pro",
    category: "AI Advertisement",
    year: "2026.07.08 - 2026.07.19",
    embed: "https://www.youtube.com/embed/eX_BhbLody0",
    note: "몬스터 음료의 고카페인 에너지에 착안하여, '우주에서 날아온 광석의 힘을 정제해 만든 강력한 각성 음료'라는 초현실적 세계관을 연출했습니다. 생성형 AI 특유의 감각적인 비주얼 표현을 활용해 독창적이고 강렬한 브랜드 이미지를 시각화했습니다.",
  },
  {
    id: "bacchus",
    title: "텐션을 바까쓰",
    role: "기획(100%), 연출(100%), 편집(색보정 제외 100%)",
    tools: "Premiere Pro, After Effects",
    category: "Advertisement",
    year: "2026.07.24 - 2026.08.10",
    embed: "https://www.youtube.com/embed/eX_BhbLody0",
    note: "피로에 지친 현대인의 일상과 침체된 분위기를 박카스 한 병으로 활력 있게 전환한다는 언어유희 ‘바까쓰(바꿨어)’를 위트 있게 시각화했습니다. 박카스를 마시는 순간 초사이언처럼 폭발적인 에너지로 각성하는 모습을 유머러스한 연출로 담아내어, 브랜드가 가진 피로회복과 기분 전환의 이미지를 직관적이고 강렬하게 전달하고자 했습니다.",
  },
  {
    id: "love-interference",
    title: "연애는 참견",
    role: "ST 카메라, SFX",
    tools: "Premiere Pro",
    category: "Variety Show",
    year: "2026.07.24 - 2026.08.10",
    embed: "https://www.youtube.com/embed/KXNbb6IWhEc",
    note: "KBS joy에서 방영한 '연애의 참견' 예능 프로그램을 패러디하였습니다.",
  },
];
/* ───────────────────────────────────────────── */

const withAutoplay = (url) => url + (url.includes("?") ? "&" : "?") + "autoplay=1&rel=0";

function Hero() {
  const videoRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const playing = hovering || pinned;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [playing]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <video
        ref={videoRef}
        src={PROFILE.reel}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <img
        src={PROFILE.photo}
        alt={`${PROFILE.name} 프로필`}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out"
        style={{ opacity: playing ? 0 : 1 }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 55%)" }}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14">
        <div>
          <h1 className="text-5xl font-light tracking-tight md:text-8xl">{PROFILE.name}</h1>
          <p className="mt-3 text-base text-white/70 md:text-xl">{PROFILE.title}</p>
        </div>

        <button
          onClick={() => setPinned((p) => !p)}
          className="w-fit rounded-full border border-white/40 px-6 py-3 text-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {pinned ? "Stop Reel" : "Play Reel"}
        </button>
      </div>
    </section>
  );
}

function ProjectList({ onOpen }) {
  return (
    <section id="work" className="px-6 py-28 md:px-12 md:py-40">
      <h2 className="mb-12 text-sm text-white/50 md:mb-20">Selected Work</h2>
      <ul className="group/list border-t border-white/10">
        {PROJECTS.map((p) => (
          <li key={p.id} className="border-b border-white/10">
            <button
              onClick={() => onOpen(p)}
              className="group grid w-full grid-cols-1 gap-2 py-8 text-left transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:grid-cols-[1fr_auto] md:items-baseline md:gap-12 md:py-12"
            >
              <span className="text-4xl font-light tracking-tight transition-colors duration-300 group-hover:text-[#D1F366] group-focus-visible:text-[#D1F366] md:text-7xl">{p.title}</span>
              <span className="flex flex-col text-sm text-white/60 md:items-end md:text-right">
                <span>{p.category}</span>
                <span>{p.role}, {p.year}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function VideoModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="modal-in fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]"
    >
      <button
        onClick={onClose}
        autoFocus
        className="fixed right-6 top-6 z-10 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:right-12 md:top-10"
      >
        Close
      </button>

      <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center gap-10 px-6 py-24 md:px-12">
        <div className="aspect-video w-full bg-black">
          <iframe
            src={withAutoplay(project.embed)}
            title={project.title}
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
          <div>
            <h3 className="text-2xl font-light md:text-3xl">{project.title}</h3>
            <p className="mt-2 text-sm text-white/60">{project.category}</p>
            <p className="text-sm text-white/60">{project.role}, {project.year}</p>
          </div>
          <p className="max-w-prose leading-relaxed text-white/80">{project.note}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased" style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&display=swap');
        html { scroll-behavior: smooth; background: #0a0a0a; }
        .modal-in { animation: modalIn 350ms ease-out both; }
        @keyframes modalIn { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .modal-in { animation: none; }
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Hero />
      <ProjectList onOpen={setActive} />

      <footer className="px-6 pb-16 md:px-12 md:pb-24">
        <a
          href={`mailto:${PROFILE.email}`}
          className="text-2xl font-light text-white/70 transition-colors hover:text-white md:text-4xl"
        >
          {PROFILE.email}
        </a>
      </footer>

      {active && <VideoModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
}