import { useEffect, useRef, useState } from "react";

/* ─────────────  여기만 수정하세요  ───────────── */
const PROFILE = {
  name: "OH DONG RYEOL",
  title: "Video Producer & Editor",
  photo: "/assets/profile.jpg", // 프로필 사진
  reel: "/assets/reel.mp4", // 쇼릴 영상 (Play Reel 버튼으로 재생)
  email: "dhehdfuf507@naver.com",
};

/* ABOUT 섹션 내용. 항목을 지우면 그 칸은 화면에서 자동으로 사라져요. */
const ABOUT = {
  education: [
    { period: "2026.05 - 2026.11", title: "한국IT아카데미 멀티미디어 과정", detail: "영상 기획·촬영·종합편집, 2D·3D 그래픽, 영상 CG·특수영상 합성" },
    { period: "2020.03 - 2026.02", title: "차의과학대학교 의료홍보미디어학과", detail: "졸업 · 부전공 데이터경영학" },
  ],
  awards: [
    { period: "2025.11", title: "한국오츠카제약 대표이사 사장상 (전체 4위)", detail: "같생 서포터즈 우수팀 시상 · 한국생명존중희망재단" },
    { period: "2024.12", title: "지역상생 AI 교육 및 포천관광 활성화 챌린지 최우수상 (전체 2위)", detail: "포천시, 차의과학대학교" },
    { period: "2024.06", title: "CUMF 환경부 X 차의과학대학교 영상 공모전 우수상 (전체 2위)", detail: "환경부, 차의과학대학교" },
    { period: "2024.01", title: "제11회 CHA University Idea Festival 우수상 (전체 3위)", detail: "양주시, 차의과학대학교" },
    { period: "2023.12", title: "EDU TV 제4회 전국 대학생 미디어콘텐츠 공모전 은상 (전체 5위)", detail: "스마트교육재단(EDUTV)" },
    { period: "2023", title: "세바시 3분! 친환경 영상 공모전 우수상 (전체 2위)", detail: "차의과학대학교" },
    { period: "2023.06", title: "제1회 포천시 쇼츠 영상 공모전 장려상", detail: "포천시" },
  ],
  experience: [
    { period: "2025.05 - 2025.11", title: "'같이 살자, 같생' 서포터즈 4기", detail: "한국생명존중희망재단 · 캠페인 카드뉴스/영상 콘텐츠 기획·제작, 오프라인 행사 현장 홍보" },
    { period: "2025.01 - 2025.02", title: "231스튜디오 PD 인턴", detail: "촬영 레퍼런스 탐색, 촬영 소품 준비, 광고 촬영장 연출 보조 및 슬레이트" },
  ],
  skills: [
    { period: "Video", title: "Premiere Pro, After Effects" },
    { period: "Design", title: "Photoshop, Illustrator" },
    { period: "3D", title: "Cinema 4D" },
    { period: "Audio", title: "Premiere Pro, Cubase" },
    { period: "AI", title: "Gemini, Claude, GPT, Google Flow, Suno" },
    { period: "Camera", title: "Canon 70D, Canon 80D, Canon 90D, Canon 5D Mark II, LUMIX S9, SONY ZV-E10" },
    { period: "Gimbal", title: "Ronin SC" },
    { period: "Audio Gear", title: "RODE NTG5, Sony PCM-D10" },
  ],
  contact: {
    email: PROFILE.email,
    phone: "010-2325-0057", // 공개하고 싶지 않으면 "" 로 비우기
    instagram: "", // 예: "@your_id" (비워두면 화면에서 숨김)
    instagramUrl: "", // 예: "https://www.instagram.com/your_id"
  },
};

/*
  프로젝트 추가 방법: 아래 블록 하나를 복사해서 붙여넣기.
  - category 이름이 같으면 자동으로 같은 칸(섹션)에 묶여요.
  - 유튜브 embed 주소: https://www.youtube.com/embed/영상ID (썸네일은 자동으로 가져옴)
  - 영상이 없거나 자동 썸네일이 안 되는 경우: thumbnail: "/assets/thumb1.jpg" 를 추가
  - embed도 thumbnail도 없으면 카드에는 카테고리 이름이, 모달에는 "준비 중" 문구가 나와요.
*/
const PROJECTS = [
  {
    id: "MONSTER-ENERGY",
    title: "MONSTER 광고 30's",
    role: "1인 제작 (100%)",
    tools: "Google Flow, Google Gemini, Premiere Pro",
    category: "Advertisement",
    year: "2026.07.08 - 2026.07.19",
    embed: "https://www.youtube.com/embed/S1d4zx2BqBE",
    note: "몬스터 음료의 고카페인 에너지에 착안하여, '우주에서 날아온 광석의 힘을 정제해 만든 강력한 각성 음료'라는 초현실적 세계관을 연출했습니다. 생성형 AI 특유의 감각적인 비주얼 표현을 활용해 독창적이고 강렬한 브랜드 이미지를 시각화했습니다.",
  },
  {
    id: "torreta",
    title: "토레타 광고 20's",
    role: "기획(20%), 촬영(20%), 편집(100%), 조명",
    tools: "LUMIX S9, Premiere Pro, After Effects, Google flow, Claude",
    category: "Advertisement",
    year: "2026.09.09 - 2026.10.02",
    embed: "https://www.youtube.com/embed/3veK8lrnOww",
    note: "무언가에 몰입하는 순간에도, 쉬어가는 순간에도. 일상 어디에서나 필요한 이온을 가볍게 채워주는 토레타.",
  },
  {
    id: "bacchus",
    title: "텐션을 바까쓰",
    role: "기획(100%), 연출(100%), 편집(색보정 제외 100%), 조명",
    tools: "Premiere Pro, After Effects",
    category: "Advertisement",
    year: "2026.07.24 - 2026.08.10",
    embed: "https://www.youtube.com/embed/eX_BhbLody0",
    note: "피로에 지친 현대인의 일상과 침체된 분위기를 박카스 한 병으로 활력 있게 전환한다는 언어유희 ‘바까쓰(바꿨어)’를 위트 있게 시각화했습니다. 박카스를 마시는 순간 초사이언처럼 폭발적인 에너지로 각성하는 모습을 유머러스한 연출로 담아내어, 브랜드가 가진 피로회복과 기분 전환의 이미지를 직관적이고 강렬하게 전달하고자 했습니다.",
  },
  {
    id: "love-interference",
    title: "연애는 참견",
    role: "ST 카메라, 음향, 조명, 종합편집감독",
    tools: "Premiere Pro",
    category: "Variety Show",
    year: "2026.07.24 - 2026.08.10",
    embed: "https://www.youtube.com/embed/aOXRyESaZ2E",
    note: "KBS joy에서 방영한 '연애의 참견' 예능 프로그램을 패러디하였습니다.",
  },
  {
    id: "pocheon-ai-challenge",
    title: "댕댕여지도",
    role: "기획(25%), IMC 파트 제작(100%)",
    tools: "PowerPoint, Photoshop, Miricanvas, Chat Gpt, Suno AI",
    category: "Project Proposal",
    year: "2024.12",
    pdf: "/assets/pocheon-ai-challenge.pdf",
    thumbnail: "/assets/pocheon-01.jpg",
    note: "포천시가 반려동물 친화관광도시 조성 공모사업에 선정된 점에 착안해, 반려동물과 함께 다녀올 수 있는 포천 여행지를 소개하는 서비스 '댕댕여지도'를 기획했습니다. 관광지가 다양함에도 타 도시와의 차별점이 뚜렷하지 않았던 포천시의 상황을 분석하고, '반려동물 친화 도시'와 '수려한 자연관광지'라는 두 강점을 결합해 차별화된 방향을 제시했습니다. 포천시 지역상생 AI 교육 및 포천관광 활성화 챌린지에서 최우수상(전체 2위)을 수상했습니다.",
  },
  {
    id: "HEESO",
    title: "희소",
    role: "기획(25%), 조연출, 촬영(50%)",
    tools: "Canon 90D, Ronin SC",
    category: "MOVIE",
    year: "2023.12",
    embed: "https://www.youtube.com/embed/sRa82zuoELU",
    note: "'찰나 같았던 고등학생 시절의 풋풋한 사랑'을 소재로 한 단편영화입니다.코스모스 축제라는 공간적 배경 속에서 남녀 주인공이 느끼는 설렘과 서툼을 포착하고, 지나고 나면 비로소 깨닫게 되는 그 시절만의 희소성(稀少性)을 조명하고자 했습니다. 제 4회 전국대학생 미디어콘텐츠 공모전 은상(전체 5위)을 수상했습니다",
  },
  {
    id: "pocheon-shorts",
    title: "For 청춘, 포천으로 떠나자!",
    role: "기획(25%), 조연출, 음악",
    tools: "Cubase",
    category: "Shorts",
    year: "2023.05",
    embed: "https://www.youtube.com/embed/pHMzgzKVrD4",
    note: "청춘이 포천으로 떠나야 할 이유를 산정호수, 흔들다리, 이동갈비라는 포천의 대표 스폿으로 압축해 담았습니다. 잔잔한 산정호수의 풍경과 흔들다리를 건너는 스릴, 그리고 이동갈비로 마무리하는 여정을 짧은 호흡의 쇼츠로 구성해, 친구들과 훌쩍 떠나고 싶어지는 즉흥 여행의 느낌을 전달하고자 했습니다. 제1회 포천시 쇼츠 영상 공모전에서 장려상을 수상했습니다.",
  },
  {
    id: "kick-back-cover",
    title: "KICK BACK (Cover)",
    role: "기획(100%), 촬영(100%), 편집(자막 제외 100%)",
    tools: "Canon 90D, Ronin SC, Premiere Pro",
    category: "Music Video",
    year: "2025.02.04 - 2025.02.18",
    embed: "https://www.youtube.com/embed/hDciTx0XL1k",
    note: "요네즈 켄시(米津玄師)의 'KICK BACK'을 커버한 뮤직비디오입니다.",
  },
  {
    id: "Daldam-cover",
    title: "졸업 (Cover)",
    role: "기획(100%), 촬영(50%), 편집(100%), 조명",
    tools: "LUMIX S9, SONY ZV-E10, Premiere Pro",
    category: "Music Video",
    year: "2026.07.01 - 2026.07.14",
    embed: "https://www.youtube.com/embed/3wDXK25CPQk",
    note: "원곡에서의 '졸업'에 대한 의미와 다르게 해석하여 '인생 졸업' 즉, '죽음'으로 해석을 하여 제작한 뮤직비디오입니다.",
  },
  {
    id: "nomal-miyeon",
    title: "평범한 미연씨",
    role: "음향(100%), SFX(100%), 조명",
    tools: "RODE NTG5, Premiere Pro, Cubase",
    category: "MOVIE",
    year: "2026.08.12 - 2026.09.07",
    embed: "https://www.youtube.com/embed/PWTt_eaCvHE",
  },
  {
    id: "campinggogo",
    title: "캠핑카, 자 오프닝 타이틀",
    role: "1인 제작(100%)",
    tools: "Premiere Pro, After Effects, Illustrator",
    category: "Motion Graphic",
    year: "2026.08.31 - 2026.09.13",
    embed: "https://www.youtube.com/embed/Dl8aWOBpSfc",
    note: "답답한 도심을 벗어나 캠핑카를 타고 자유로운 여행을 떠나는 프로그램의 오프닝 타이틀을 모션그래픽으로 제작한 영상입니다.",
  },
  {
    id: "motion-3",
    title: "대한민국 축구 국가대표팀 소개 영상", // ← 영상 제목으로 바꿔주세요
    role: "1인 제작(100%)",
    tools: "Premiere Pro, After Effects",
    category: "Motion Graphic",
    year: "2026.08.03 - 2026.08.10",
    embed: "https://www.youtube.com/embed/ELRbVq3sg1c",
  },
];
/* ───────────────────────────────────────────── */

const withAutoplay = (url) => url + (url.includes("?") ? "&" : "?") + "autoplay=1&rel=0";

// 유튜브 썸네일 자동 추출 (maxres가 없으면 hq로 대체)
const ytId = (url) => url && (url.match(/embed\/([\w-]{11})/) || [])[1];
// 썸네일이 없으면(embed/thumbnail/slides 다 없음) null → 카드에서 색상 플레이스홀더로 대체
// hqdefault는 일반 영상·쇼츠 구분 없이 항상 존재해서 기본값으로 사용.
// maxresdefault는 쇼츠 등 일부 영상에서 아예 없는데, 이때 유튜브가 에러 대신
// 작은 회색 이미지를 내려줘서 onError로 못 걸러지는 문제가 있어 기본값에서 뺐음.
const thumbOf = (p) => p.thumbnail || p.slides?.[0] || (p.embed ? `https://i.ytimg.com/vi/${ytId(p.embed)}/hqdefault.jpg` : null);
const thumbFallback = (p) => (e) => {
  if (!p.embed) return; // 슬라이드/썸네일 이미지는 대체 썸네일이 없음
  e.currentTarget.onerror = null;
  e.currentTarget.src = `https://i.ytimg.com/vi/${ytId(p.embed)}/mqdefault.jpg`;
};

/* ───────── HOME (첫 화면) ───────── */
function Hero() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true); // 페이지 진입 시 바로 재생
  const [muted, setMuted] = useState(true); // 자동재생 정책상 처음엔 음소거로 시작

  // React의 muted 속성은 HTML에 반영이 안 될 때가 있어서 직접 지정 (모바일 자동재생에 필요)
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.muted = muted;
      const p = v.play();
      // 자동재생이 막히면 버튼이 "Play Reel"로 바뀌어서, 누르면 재생돼요
      if (p && p.catch) p.catch(() => setPlaying(false));
    } else {
      v.pause();
    }
  }, [playing]);

  return (
    <section id="top" className="relative w-full bg-[#0a0a0a] md:h-screen md:overflow-hidden">
      {/* 쇼릴 영상: 모바일은 1페이지 전체 화면, 데스크톱은 왼쪽 60% (처음부터 자동 재생) */}
      <div className="relative flex h-[100svh] w-full items-center justify-center bg-black md:absolute md:inset-y-0 md:left-0 md:block md:h-auto md:w-[60%]">
        <video
          ref={videoRef}
          src={PROFILE.reel}
          poster={PROFILE.photo}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full"
        />
        {/* 데스크톱: 오른쪽 가장자리를 어둡게 페이드 → 사진 쪽 페이드와 가운데서 자연스럽게 만남 */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to left, #0a0a0a 0%, rgba(10,10,10,0.8) 15%, rgba(10,10,10,0.35) 38%, rgba(10,10,10,0) 65%)",
          }}
        />
        {/* 모바일 전용: 영상 위 버튼 (음소거 / Stop Reel) */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-6 pb-10 md:hidden">
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "음소거 해제" : "음소거"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/30 text-base backdrop-blur-sm"
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="rounded-full border border-white/40 bg-black/30 px-5 py-2.5 text-sm backdrop-blur-sm"
          >
            {playing ? "Stop Reel" : "Play Reel"}
          </button>
        </div>
      </div>

      {/* 프로필 사진: 모바일은 2페이지 전체 화면, 데스크톱은 오른쪽 40% */}
      <div className="relative h-[100svh] w-full md:absolute md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[40%]">
        <img
          src={PROFILE.photo}
          alt={`${PROFILE.name} 프로필`}
          className="h-full w-full object-cover grayscale contrast-110"
          style={{ objectPosition: "50% 30%" }}
        />
        {/* 데스크톱: 왼쪽 가장자리를 어둡게 페이드 → 영상 쪽 페이드와 가운데서 자연스럽게 만남 */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.8) 15%, rgba(10,10,10,0.35) 38%, rgba(10,10,10,0) 65%)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[100svh] md:inset-0 md:h-auto"
        style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 50%)" }}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14">
        <div>
          <h1 className="f-display text-6xl leading-none tracking-tight md:text-9xl">{PROFILE.name}</h1>
          <p className="mt-3 text-base text-white/70 md:text-xl">{PROFILE.title}</p>

          {/* 데스크톱: 음소거 / Stop Reel 버튼은 왼쪽(이름 아래)에 배치 */}
          <div className="mt-6 hidden items-center gap-3 md:flex">
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "음소거 해제" : "음소거"}
              title={muted ? "음소거 해제" : "음소거"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-base backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {muted ? "🔇" : "🔊"}
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {playing ? "Stop Reel" : "Play Reel"}
            </button>
          </div>
        </div>

        {/* Work / About 는 오른쪽에 한 줄로 */}
        <nav className="flex flex-nowrap items-center gap-x-8">
          <a href="#work" className="text-2xl font-light transition-colors hover:text-[#D1F366] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-3xl">
            Work
          </a>
          <a href="#about" className="text-2xl font-light transition-colors hover:text-[#D1F366] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-3xl">
            About
          </a>
        </nav>
      </div>
    </section>
  );
}

/* ───────── 고정 헤더: 첫 화면을 지나면 위에서 내려오고, 현재 위치를 표시 ───────── */
function SiteHeader() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
      const mark = window.innerHeight * 0.35;
      let cur = "";
      for (const id of ["work", "about"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mark) cur = id;
      }
      setCurrent(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const link = (id, label) => (
    <a
      href={`#${id}`}
      tabIndex={visible ? 0 : -1}
      className={`transition-colors hover:text-[#D1F366] ${current === id ? "text-white" : "text-white/50"}`}
    >
      {label}
    </a>
  );

  return (
    <header
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-[#0a0a0a]/85 px-6 py-5 backdrop-blur transition-all duration-300 md:px-12 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <a href="#top" tabIndex={visible ? 0 : -1} className="text-sm transition-colors hover:text-[#D1F366]">
        {PROFILE.name}
      </a>
      <nav className="flex gap-6 text-sm">
        {link("work", "Work")}
        {link("about", "About")}
      </nav>
    </header>
  );
}

/* ───────── WORK ───────── */
function ProjectCard({ p, onOpen }) {
  return (
    <button
      onClick={() => onOpen(p)}
      className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <div className="aspect-video w-full overflow-hidden bg-white/5">
        {thumbOf(p) ? (
          <img
            src={thumbOf(p)}
            onError={thumbFallback(p)}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
            {p.category}
          </div>
        )}
      </div>
      <h4 className="mt-2 line-clamp-1 text-sm transition-colors duration-300 group-hover:text-[#D1F366] group-focus-visible:text-[#D1F366]">
        {p.title}
      </h4>
      <p className="mt-0.5 line-clamp-1 text-xs text-white/50">{p.role}</p>
    </button>
  );
}

/* 카테고리 한 칸: 2개 이하는 그대로 나란히, 3개 이상은 옆으로 넘겨서 보기 */
function CategoryBlock({ category, items, onOpen }) {
  const scrollRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const isCarousel = items.length > 2;

  useEffect(() => {
    const el = scrollRef.current;
    if (!isCarousel || !el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isCarousel, items.length]);

  const slide = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow = (dir, label, symbol, enabled) => (
    <button
      onClick={() => slide(dir)}
      disabled={!enabled}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-sm transition-colors hover:border-[#D1F366] hover:text-[#D1F366] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-25"
    >
      {symbol}
    </button>
  );

  return (
    <div className="min-w-0">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="f-serif text-2xl italic md:text-3xl">{category}</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40">{items.length}</span>
          {isCarousel && (
            <div className="flex gap-2">
              {arrow(-1, `${category} 이전 보기`, "←", canPrev)}
              {arrow(1, `${category} 다음 보기`, "→", canNext)}
            </div>
          )}
        </div>
      </div>

      {isCarousel ? (
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
        >
          {items.map((p) => (
            <div key={p.id} className="shrink-0 basis-[calc(50%-0.5rem)] snap-start">
              <ProjectCard p={p} onOpen={onOpen} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {items.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

function WorkSection({ onOpen }) {
  const groups = PROJECTS.reduce((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  // 프로젝트가 많은 카테고리를 위로 (같은 개수끼리는 PROJECTS에 나온 순서 유지)
  const sortedGroups = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);

  return (
    <section id="work" className="px-6 pb-16 pt-24 md:px-12 md:pb-20">
      <h2 className="f-display mb-8 text-4xl tracking-tight md:mb-10 md:text-6xl">Work</h2>
      {/* 데스크톱: 카테고리를 좌우 2칸으로 배치 / 모바일: 1칸 */}
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-12">
        {sortedGroups.map(([category, items]) => (
          <CategoryBlock key={category} category={category} items={items} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* ───────── ABOUT ───────── */
function Block({ title, className = "", children }) {
  return (
    <section className={className}>
      <h3 className="f-serif mb-5 text-4xl italic md:text-5xl">{title}</h3>
      <div className="border-t border-white/15">{children}</div>
    </section>
  );
}

function Row({ period, title, detail }) {
  return (
    <div className="group grid gap-1 border-b border-white/15 py-5 md:grid-cols-[8.5rem_1fr] md:gap-6">
      <p className="f-mono text-xs text-white/40 md:pt-1.5">{period}</p>
      <div>
        <p className="text-lg leading-snug transition-colors group-hover:text-[#D1F366]">{title}</p>
        {detail && <p className="mt-1 text-sm text-white/55">{detail}</p>}
      </div>
    </div>
  );
}

function AboutSection() {
  const c = ABOUT.contact;
  const has = (arr) => arr && arr.length > 0;
  const contactLink = "w-fit transition-colors hover:text-[#D1F366]";

  return (
    <section id="about" className="border-t border-white/10 px-6 pb-28 pt-28 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[5fr_7fr] md:gap-16">
        {/* 왼쪽: 사진 */}
        <aside className="md:sticky md:top-28 md:self-start">
          <div className="mx-auto w-full max-w-sm md:rotate-2">
            <img
              src={PROFILE.photo}
              alt={`${PROFILE.name} 프로필`}
              className="aspect-[3/4] w-full object-cover grayscale contrast-110 shadow-[8px_8px_0_#D1F366]"
              style={{ objectPosition: "50% 25%" }}
            />
          </div>
        </aside>

        {/* 오른쪽: 이름 + 정보 */}
        <div className="flex flex-col gap-20 md:gap-24">
          <header>
            <h2 className="f-display text-[clamp(3.75rem,11vw,9rem)] leading-[0.9] tracking-tight">
              {PROFILE.name}
            </h2>
            <span className="f-mono mt-6 inline-block bg-[#D1F366] px-3 py-1 text-sm text-[#0a0a0a] md:rotate-3">
              {PROFILE.title}
            </span>
          </header>

          {has(ABOUT.education) && (
            <Block title="Education">
              {ABOUT.education.map((it, i) => <Row key={i} {...it} />)}
            </Block>
          )}

          {has(ABOUT.awards) && (
            <Block title="Awards">
              {ABOUT.awards.map((it, i) => <Row key={i} {...it} />)}
            </Block>
          )}

          {has(ABOUT.experience) && (
            <Block title="Experience">
              {ABOUT.experience.map((it, i) => <Row key={i} {...it} />)}
            </Block>
          )}

          {has(ABOUT.skills) && (
            <Block title="Skills">
              {ABOUT.skills.map((g) => (
                <div key={g.period} className="grid gap-3 border-b border-white/15 py-5 md:grid-cols-[8.5rem_1fr] md:gap-6">
                  <p className="f-mono text-xs text-white/40 md:pt-2">{g.period}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.title.split(",").map((t) => t.trim()).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/30 px-4 py-1.5 text-sm transition-colors hover:border-[#D1F366] hover:text-[#D1F366]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Block>
          )}

          <Block title="Contact">
            <div className="flex flex-col gap-4 pt-6">
              {c.email && (
                <a href={`mailto:${c.email}`} className={`f-display break-all text-3xl leading-tight md:text-5xl ${contactLink}`}>
                  {c.email}
                </a>
              )}
              {c.phone && (
                <a href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`} className={`f-mono text-lg ${contactLink}`}>
                  {c.phone}
                </a>
              )}
              {c.instagram && (
                <a href={c.instagramUrl} target="_blank" rel="noopener noreferrer" className={`f-mono text-lg ${contactLink}`}>
                  {c.instagram}
                </a>
              )}
            </div>
          </Block>
        </div>
      </div>
    </section>
  );
}

/* ───────── 프로젝트 모달 ───────── */
function ProjectModal({ project, onClose }) {
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
      className="page-in fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]"
    >
      <button
        onClick={onClose}
        autoFocus
        className="fixed right-6 top-6 z-10 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:right-12 md:top-10"
      >
        Close
      </button>

      <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center gap-10 px-6 py-24 md:px-12">
        {project.pdf ? (
          <div className="h-[80vh] w-full overflow-hidden bg-white/5">
            <iframe src={project.pdf} title={project.title} className="h-full w-full" />
          </div>
        ) : project.slides ? (
          <div className="flex flex-col gap-4">
            {project.slides.map((src, i) => (
              <img key={i} src={src} alt={`${project.title} 슬라이드 ${i + 1}`} className="w-full" />
            ))}
          </div>
        ) : project.embed ? (
          <div className="aspect-video w-full bg-black">
            <iframe
              src={withAutoplay(project.embed)}
              title={project.title}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : project.instagram ? (
          <div className="mx-auto aspect-[9/16] w-full max-w-sm bg-black">
            <iframe
              src={`${project.instagram.replace(/\/?$/, "/")}embed`}
              title={project.title}
              className="h-full w-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-white/5 text-sm text-white/40">
            준비 중인 자료입니다
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="flex flex-col gap-1 text-sm text-white/60">
            <h3 className="mb-2 text-2xl font-light text-white md:text-3xl">{project.title}</h3>
            <p>{project.category}</p>
            <p>{project.year}</p>
            <p>{project.role}</p>
            {project.tools && <p className="mt-3 text-white/40">{project.tools}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <p className="max-w-prose leading-relaxed text-white/80">{project.note}</p>
            {project.pdf && (
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-white/50 underline underline-offset-4 transition-colors hover:text-[#D1F366]"
              >
                새 탭에서 PDF 열기
              </a>
            )}
            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-white/50 underline underline-offset-4 transition-colors hover:text-[#D1F366]"
              >
                Instagram에서 보기
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(null);

  // 예전 주소(#/work, #/about)로 들어와도 해당 위치로 이동
  useEffect(() => {
    const m = window.location.hash.match(/^#\/?(work|about)$/);
    if (m) document.getElementById(m[1])?.scrollIntoView();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased" style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Hanken+Grotesk:wght@300;400;500&family=Instrument+Serif:ital@0;1&family=Space+Mono&display=swap');
        .f-display { font-family: 'Anton', 'Hanken Grotesk', system-ui, sans-serif; font-weight: 400; }
        .f-serif { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; }
        .f-mono { font-family: 'Space Mono', ui-monospace, monospace; }
        html { background: #0a0a0a; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
        }
        .page-in { animation: pageIn 350ms ease-out both; }
        @keyframes pageIn { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .page-in { animation: none; }
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Hero />
      <SiteHeader />
      <main>
        <WorkSection onOpen={setActive} />
        <AboutSection />
      </main>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
}