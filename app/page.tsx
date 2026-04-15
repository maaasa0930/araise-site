'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RESERVATION_URL = "https://beauty.hotpepper.jp/kr/slnH000753877/";
const INSTAGRAM_URL = "https://www.instagram.com/araise.salon/";
const THREADS_URL = "https://www.threads.net/@araise.salon";

type Lang = "ja" | "en" | "zh" | "ko";

const LANG_NAMES: Record<Lang, string> = {
  ja: "日本語",
  en: "English",
  zh: "中文",
  ko: "한국어",
};

const T: Record<Lang, {
  reserve: string; reserve_short: string;
  hero_catch: string; hero_sub: string;
  concept_label: string; concept_title: string; concept_body: string[];
  why_title: string; services_title: string; services_all: string;
  staff_title: string; staff_sub: string;
  price_title: string; price_note: string;
  access_title: string;
  footer_desc: string; footer_tagline: string; copy: string;
  nav: string[];
}> = {
  ja: {
    reserve: "ご予約はこちら", reserve_short: "予約",
    hero_catch: "旅するような、\n非日常を。",
    hero_sub: "二子玉川の完全個室サロン。\n深夜0時まで、施術歴10年以上のセラピストが待っています。",
    concept_label: "CONCEPT",
    concept_title: "ARAISEとは",
    concept_body: [
      "張り詰めた毎日が続くなら、一度だけ、ここに来てみてください。",
      "世界1,000件以上のスパを自ら巡ったオーナーが、本物だと確信した技術と素材だけで作ったサロンです。アーユルヴェーダ・タイ古式・ヘッドスパ・足裏を軸に、施術歴平均10年以上のセラピストが体の状態を読み取り、芯から緩めます。",
      "ドーム型の完全個室、深夜0時まで営業。ここに来た人は、帰り道が違います。",
    ],
    why_title: "ARAISEが選ばれる理由",
    services_title: "施術メニュー", services_all: "全メニューを見る",
    staff_title: "セラピスト紹介", staff_sub: "施術歴平均10年以上。\n経験と感覚で、あなたの体の状態を読み取ります。",
    price_title: "料金のご案内", price_note: "※表示価格はすべて税込です。",
    access_title: "アクセス",
    footer_desc: "アーユルヴェーダ・タイ古式マッサージ・ヘッドスパ\n東京都世田谷区 二子玉川駅徒歩5分",
    footer_tagline: "二子玉川駅 徒歩5分 · 深夜0時まで",
    copy: "© 2024 ARAISE. All rights reserved.",
    nav: ["メニュー", "セラピスト", "料金", "アクセス"],
  },
  en: {
    reserve: "Book Now", reserve_short: "Book",
    hero_catch: "A journey-like\nexperience awaits.",
    hero_sub: "Private room salon in Futako-tamagawa.\nOpen until midnight, therapists with 10+ years experience.",
    concept_label: "CONCEPT",
    concept_title: "About ARAISE",
    concept_body: [
      "Founded by an owner who personally visited over 1,000 spas worldwide and thought: \"Why doesn't Japan have this?\"",
      "Specializing in Ayurveda, Thai Massage, Head Spa, and Reflexology — with therapists averaging 10+ years of experience. Sri Lanka-imported herb oils blended to your constitution. Authentic technique that relaxes you to the core.",
      "Fully private dome rooms, open until midnight. Come as you are — exhausted, tense, still in work mode.",
    ],
    why_title: "Why Choose ARAISE",
    services_title: "Treatments", services_all: "View All Menus",
    staff_title: "Our Therapists", staff_sub: "Average 10+ years of experience.\nReading your body through skill and intuition.",
    price_title: "Pricing", price_note: "All prices include tax.",
    access_title: "Access",
    footer_desc: "Ayurveda · Thai Massage · Head Spa\n5 min walk from Futako-tamagawa Station, Tokyo",
    footer_tagline: "5 min walk · Open until midnight",
    copy: "© 2024 ARAISE. All rights reserved.",
    nav: ["Services", "Therapist", "Price", "Access"],
  },
  zh: {
    reserve: "立即预约", reserve_short: "预约",
    hero_catch: "如旅行般的\n非日常体验。",
    hero_sub: "二子玉川完全私人包间沙龙。\n营业至午夜，拥有10年以上经验的治疗师等待着您。",
    concept_label: "CONCEPT",
    concept_title: "关于ARAISE",
    concept_body: [
      "创始人曾自费体验世界各地1,000家以上的水疗中心，萌生了「为什么日本没有这样的地方」的想法，由此创立了本沙龙。",
      "专注于阿育吠陀、泰式按摩、头皮护理和足底反射疗法，治疗师平均从业经验超过10年。",
      "完全私人包间，营业至午夜。带着工作的疲惫来吧。",
    ],
    why_title: "为什么选择ARAISE",
    services_title: "护理菜单", services_all: "查看所有菜单",
    staff_title: "治疗师介绍", staff_sub: "平均从业10年以上。\n用经验和感觉解读您身体的状态。",
    price_title: "价格说明", price_note: "所有价格均含税。",
    access_title: "交通指南",
    footer_desc: "阿育吠陀・泰式按摩・头皮护理\n东京世田谷区 二子玉川站步行5分钟",
    footer_tagline: "二子玉川站步行5分 · 营业至午夜",
    copy: "© 2024 ARAISE. All rights reserved.",
    nav: ["菜单", "治疗师", "价格", "交通"],
  },
  ko: {
    reserve: "예약하기", reserve_short: "예약",
    hero_catch: "여행하는 듯한\n비일상을.",
    hero_sub: "후타코타마가와의 완전 개인실 살롱。\n자정까지, 시술 경력 10년 이상의 테라피스트가 기다립니다.",
    concept_label: "CONCEPT",
    concept_title: "ARAISE란",
    concept_body: [
      "세계 1,000곳 이상의 스파를 직접 체험한 오너가 '왜 일본엔 이런 곳이 없지?'라는 생각으로 창업한 살롱입니다.",
      "아유르베다・타이 마사지・헤드 스파・발 반사 요법을 중심으로, 평균 시술 경력 10년 이상의 테라피스트가 재직 중입니다.",
      "완전 개인실 돔룸, 자정까지 영업. 지친 채로, 전투 상태 그대로 오셔도 됩니다.",
    ],
    why_title: "ARAISE를 선택하는 이유",
    services_title: "시술 메뉴", services_all: "전체 메뉴 보기",
    staff_title: "테라피스트 소개", staff_sub: "평균 시술 경력 10년 이상。\n경험과 감각으로 당신의 몸 상태를 읽어냅니다.",
    price_title: "요금 안내", price_note: "표시 가격은 모두 세금 포함입니다.",
    access_title: "오시는 길",
    footer_desc: "아유르베다・타이 마사지・헤드 스파\n도쿄 세타가야구 후타코타마가와역 도보 5분",
    footer_tagline: "도보 5분 · 자정까지 영업",
    copy: "© 2024 ARAISE. All rights reserved.",
    nav: ["메뉴", "테라피스트", "요금", "오시는 길"],
  },
};

// 説明文はja/enのみ。それ以外はenにフォールバック
const FEATURES = [
  { en: "Private Room",  ja: "完全個室",           enT: "Fully Private Rooms",   jaD: "すべての施術室が完全個室。他のお客様の気配を感じることなく、ゆっくりと過ごせます。",      enD: "Every treatment room is completely private, so you can fully relax without noticing other guests." },
  { en: "Late Night",    ja: "深夜0時まで営業",     enT: "Open Until Midnight",    jaD: "仕事終わりでも通える深夜営業。あなたのスケジュールに合わせて予約できます。",              enD: "Open late so you can come after work. Book at a time that fits your schedule." },
  { en: "10+ Years",     ja: "施術歴平均10年以上",  enT: "10+ Years Experience",   jaD: "経験を積んだセラピストのみが在籍。「手が勝手に体の問題を見つける」プロの技術を。",        enD: "Only therapists with deep experience. Hands that instinctively find what your body needs." },
  { en: "Authentic",     ja: "本物のアーユルヴェーダ", enT: "Authentic Ayurveda",  jaD: "スリランカ直輸入のハーブオイルを体質別に調合。1,000件超のスパ行脚で磨いた本場の技術。",  enD: "Herb oils imported directly from Sri Lanka, blended to your constitution. Refined through 1,000+ spa visits worldwide." },
];

const SERVICES = [
  { ja: "アーユルヴェーダ",     en: "Ayurveda",      nameEn: "Ayurveda",     jaD: "スリランカ直輸入ハーブオイルを体質別に調合。全身の巡りを整え、芯から緩めるオイルトリートメント。",                          enD: "Sri Lanka-imported herb oil blended to your body type. Full-body oil treatment that relaxes you to the core.", price: "¥12,980〜" },
  { ja: "タイ古式マッサージ",   en: "Thai Massage",  nameEn: "Thai Massage", jaD: "ストレッチと指圧を組み合わせた伝統技法。身体の歪みを整え、疲労の根本にアプローチします。",                                    enD: "Traditional technique combining deep stretching and pressure. Corrects imbalances and addresses the root of fatigue.", price: "¥8,980〜" },
  { ja: "ドライヘッドスパ",     en: "Dry Head Spa",  nameEn: "Head Spa",     jaD: "頭部・首・肩の緊張を徹底的にほぐす。不眠・眼精疲労・頭痛が気になる方に。",                                                    enD: "Deeply releases tension in the head, neck, and shoulders. Ideal for insomnia, eye strain, and headaches.", price: "¥7,980〜" },
  { ja: "足裏リフレクソロジー", en: "Foot Reflexology", nameEn: "Reflexology", jaD: "足裏の反射区を刺激し、全身の器官に働きかける。立ち仕事・長時間座り仕事の方へ。",                                             enD: "Stimulates reflex zones in the feet to influence the whole body. Great for those on their feet all day.", price: "¥6,980〜" },
];

const NAV_HREFS = ["#services", "#staff", "#price", "#access"];

const ACCESS_ITEMS = {
  ja: [
    { label: "ADDRESS", value: "東京都世田谷区玉川3-24-14　コスモAoi　二子玉川201号室" },
    { label: "STATION", value: "東急田園都市線・東急大井町線\n二子玉川駅 徒歩5分" },
    { label: "HOURS",   value: "12:00〜24:00（最終受付 22:30）" },
    { label: "HOLIDAY", value: "不定休" },
    { label: "TEL",     value: "03-6411-7315" },
  ],
  en: [
    { label: "ADDRESS", value: "Cosmo Aoi 201, 3-24-14 Tamagawa, Setagaya-ku, Tokyo" },
    { label: "STATION", value: "Tokyu Den-en-toshi / Oimachi Line\n5 min walk from Futako-tamagawa Station" },
    { label: "HOURS",   value: "12:00–24:00 (Last booking 22:30)" },
    { label: "HOLIDAY", value: "Irregular" },
    { label: "TEL",     value: "03-6411-7315" },
  ],
};

const PRICE_CATEGORIES = [
  { ja: "アーユルヴェーダ",     en: "Ayurveda",      items: [{ name: "60min / 60分", price: "¥12,980" }, { name: "90min / 90分", price: "¥17,980" }, { name: "120min / 120分", price: "¥23,980" }] },
  { ja: "タイ古式マッサージ",   en: "Thai Massage",  items: [{ name: "60min / 60分", price: "¥8,980" },  { name: "90min / 90分", price: "¥12,980" }, { name: "120min / 120分", price: "¥16,980" }] },
  { ja: "ドライヘッドスパ",     en: "Head Spa",      items: [{ name: "45min / 45分", price: "¥7,980" },  { name: "60min / 60分", price: "¥10,980" }] },
  { ja: "足裏リフレクソロジー", en: "Reflexology",   items: [{ name: "30min / 30分", price: "¥6,980" },  { name: "60min / 60分", price: "¥12,980" }] },
];

const FAQ_ITEMS = [
  {
    q: { ja: "ARAISEはどんなサロンですか？", en: "What kind of salon is ARAISE?" },
    a: { ja: "東京・二子玉川駅徒歩5分の完全個室リラクゼーションサロンです。アーユルヴェーダ・タイ古式マッサージ・ドライヘッドスパ・足裏リフレクソロジーを提供しています。施術歴平均10年以上のセラピストが在籍し、スリランカ直輸入のハーブオイルを使用しています。", en: "ARAISE is a fully private relaxation salon, a 5-minute walk from Futako-tamagawa Station in Tokyo. We offer Ayurveda, Thai Massage, Dry Head Spa, and Foot Reflexology, with therapists averaging 10+ years of experience and Sri Lanka-imported herb oils." },
  },
  {
    q: { ja: "二子玉川で深夜営業しているマッサージサロンはありますか？", en: "Is there a massage salon open late night in Futako-tamagawa?" },
    a: { ja: "ARAISEは深夜0時まで営業しています（最終受付22:30）。仕事帰りや深夜でも利用可能です。二子玉川駅から徒歩5分の場所にあります。", en: "ARAISE is open until midnight (last booking 22:30). You can come after work or late at night. We are a 5-minute walk from Futako-tamagawa Station." },
  },
  {
    q: { ja: "アーユルヴェーダとタイ古式マッサージの違いは何ですか？", en: "What is the difference between Ayurveda and Thai Massage?" },
    a: { ja: "アーユルヴェーダはスリランカ直輸入のハーブオイルを体質別に調合し、オイルで全身をほぐすトリートメントです。タイ古式マッサージはオイルを使わず、ストレッチと指圧を組み合わせた伝統技法で、身体の歪みや疲労の根本にアプローチします。", en: "Ayurveda uses Sri Lanka-imported herb oil blended to your body constitution for a full-body oil treatment. Thai Massage uses no oil, combining stretching and pressure point techniques to address body imbalances and the root causes of fatigue." },
  },
  {
    q: { ja: "不眠や頭痛にはどの施術がおすすめですか？", en: "Which treatment is recommended for insomnia or headaches?" },
    a: { ja: "ドライヘッドスパがおすすめです。頭部・首・肩の緊張を徹底的にほぐし、眼精疲労・頭痛・不眠が気になる方に多くご利用いただいています。45分¥7,980〜ご用意しています。", en: "We recommend the Dry Head Spa. It deeply releases tension in the head, neck, and shoulders, and is popular among guests concerned about eye strain, headaches, and insomnia. Available from ¥7,980 for 45 minutes." },
  },
  {
    q: { ja: "予約方法と料金を教えてください。", en: "How do I book, and what are the prices?" },
    a: { ja: "ホットペッパービューティーからオンライン予約が可能です。料金はアーユルヴェーダ60分¥12,980〜、タイ古式マッサージ60分¥8,980〜、ドライヘッドスパ45分¥7,980〜、足裏リフレクソロジー30分¥6,980〜（すべて税込）です。", en: "You can book online via Hot Pepper Beauty. Prices start at ¥12,980 for 60-min Ayurveda, ¥8,980 for 60-min Thai Massage, ¥7,980 for 45-min Head Spa, and ¥6,980 for 30-min Reflexology (all tax included)." },
  },
  {
    q: { ja: "口コミや評判はどうですか？", en: "What are the reviews like?" },
    a: { ja: "ホットペッパービューティーにて評価4.81（118件）を獲得しています。InRedにも掲載実績があります。", en: "We hold a 4.81 rating (118 reviews) on Hot Pepper Beauty and have been featured in InRed magazine." },
  },
];

const STAFF = [
  { name: "Therapist A", title: { ja: "アーユルヴェーダ / タイ古式", en: "Ayurveda / Thai Massage" }, years: { ja: "施術歴 12年", en: "12 years" } },
  { name: "Therapist B", title: { ja: "タイ古式 / ドライヘッドスパ", en: "Thai Massage / Head Spa" }, years: { ja: "施術歴 10年", en: "10 years" } },
  { name: "Therapist C", title: { ja: "アーユルヴェーダ / 足裏",     en: "Ayurveda / Reflexology" }, years: { ja: "施術歴 11年", en: "11 years" } },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("ja");
  const [langOpen, setLangOpen] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(250,248,245,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid #E8E0D5" : "none",
        }}
      >
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 text-xs tracking-widest transition-opacity hover:opacity-60"
            style={{ color: scrolled ? "#6B5344" : "rgba(255,255,255,0.7)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            <span style={{ fontSize: "0.6rem" }}>▼</span> Language
          </button>
          {langOpen && (
            <div
              className="absolute top-full left-0 mt-2 px-5 py-3 flex items-center gap-3 text-sm rounded-sm"
              style={{ backgroundColor: "rgba(60,50,44,0.9)", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}
            >
              {(["ja", "en", "zh", "ko"] as Lang[]).map((l, i) => (
                <span key={l} className="flex items-center gap-3">
                  {i > 0 && <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>}
                  <button
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className="transition-opacity hover:opacity-60"
                    style={{
                      color: lang === l ? "#C8A96E" : "rgba(255,255,255,0.75)",
                      fontFamily: "'Noto Sans JP', sans-serif",
                      fontWeight: lang === l ? 500 : 300,
                    }}
                  >
                    {LANG_NAMES[l]}
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <Link href="/">
          <Image
            src="/images/logo-white.png"
            alt="ARAISE"
            width={140}
            height={40}
            className="h-8 w-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{
              filter: scrolled
                ? "invert(1) sepia(1) saturate(2) hue-rotate(10deg) brightness(0.5)"
                : "brightness(0) invert(1)",
            }}
          />
        </Link>

        <div className="flex items-center gap-5">
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block text-xs tracking-widest transition-opacity hover:opacity-60"
            style={{ color: scrolled ? "#6B5344" : "rgba(255,255,255,0.8)", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            {t.reserve_short}
          </a>
          {/* ハンバーガーボタン */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex flex-col justify-center items-center gap-[7px] w-8 h-8 z-50"
            aria-label="メニューを開く"
          >
            <span
              className="block transition-all duration-300 origin-center"
              style={{
                width: "22px",
                height: "1px",
                backgroundColor: menuOpen ? "#FAF8F5" : (scrolled ? "#2C1810" : "#FAF8F5"),
                transform: menuOpen ? "translateY(3.75px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block transition-all duration-300 origin-center"
              style={{
                width: "22px",
                height: "1px",
                backgroundColor: menuOpen ? "#FAF8F5" : (scrolled ? "#2C1810" : "#FAF8F5"),
                transform: menuOpen ? "translateY(-3.75px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* ===== FULLSCREEN MENU ===== */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-between transition-all duration-500"
        style={{
          backgroundColor: "#3A2A22",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex-1 flex flex-col md:flex-row items-start justify-center gap-16 px-12 md:px-24 pt-28 pb-16">
          <nav className="flex flex-col gap-1">
            {t.nav.map((label, i) => (
              <a
                key={label}
                href={NAV_HREFS[i]}
                onClick={() => setMenuOpen(false)}
                className="transition-opacity hover:opacity-50"
                style={{
                  color: "#FAF8F5",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="md:border-l md:pl-16" style={{ borderColor: "rgba(200,169,110,0.2)" }}>
            <p className="text-xs tracking-widest mb-5" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
              SERVICES
            </p>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.nameEn}>
                  <a href="#services" onClick={() => setMenuOpen(false)} className="text-sm transition-opacity hover:opacity-50"
                    style={{ color: "rgba(250,248,245,0.7)", fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {lang === "ja" ? s.ja : s.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:ml-auto flex flex-col gap-3">
            {[
              { label: "Reservation", href: RESERVATION_URL, external: true },
              { label: "Instagram",   href: INSTAGRAM_URL,   external: true },
              { label: "Threads",     href: THREADS_URL,     external: true },
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="transition-opacity hover:opacity-50"
                style={{ color: "#FAF8F5", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 300, lineHeight: 1.6, letterSpacing: "0.05em" }}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="px-12 md:px-24 py-6 flex items-center justify-between" style={{ borderTop: "1px solid rgba(200,169,110,0.15)" }}>
          <p className="text-xs" style={{ color: "rgba(250,248,245,0.3)", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em" }}>
            {t.copy}
          </p>
          <p className="text-xs" style={{ color: "rgba(250,248,245,0.35)", fontFamily: "'Noto Sans JP', sans-serif" }}>
            {t.footer_tagline}
          </p>
        </div>
      </div>

      {/* ===== 右固定SNSアイコン ===== */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-[18px] py-5"
        style={{ backgroundColor: "rgba(38,22,14,0.88)", borderRadius: "999px", backdropFilter: "blur(10px)", width: "38px" }}
      >
        {[
          {
            label: "Instagram",
            href: INSTAGRAM_URL,
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            ),
          },
          {
            label: "Threads",
            href: THREADS_URL,
            icon: (
              <svg width="15" height="15" viewBox="0 0 192 192" fill="currentColor">
                <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.232c8.25.054 14.476 2.452 18.502 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.206 17.11 97.015 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.105 0h-.113C68.884.195 47.255 9.65 32.662 28.08 19.581 44.63 12.69 67.68 12.43 96v.04c.26 28.32 7.15 51.37 20.232 67.92C47.255 182.35 68.884 191.805 96.992 192h.113c24.56-.163 41.502-6.608 55.8-20.932 18.748-18.73 18.151-42.199 11.833-56.486-4.56-10.64-13.451-19.284-24.201-25.594Z"/>
              </svg>
            ),
          },
          {
            label: "予約",
            href: RESERVATION_URL,
            icon: (
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "0.05em", fontWeight: 400, lineHeight: 1 }}>HPB</span>
            ),
          },
          {
            label: "電話",
            href: "tel:0364117315",
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            ),
          },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.label}
            className="flex items-center justify-center transition-opacity hover:opacity-60"
            style={{ color: "rgba(250,248,245,0.9)" }}
          >
            {item.icon}
          </a>
        ))}
      </div>

      <main>
        {/* ===== HERO ===== */}
        <section
          className="relative overflow-hidden"
          style={{
            height: "calc(100svh - 38px)",
            margin: "19px 19px 0 19px",
            borderRadius: "20px",
          }}
        >
          {/* 背景 */}
          <div
            className="absolute inset-0 hero-bg"
            style={{
              backgroundColor: "#3A2E28",
              backgroundImage: "url('/images/hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* ロゴ用 中央radial */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 50% at 50% 46%, rgba(10,5,2,0.55) 0%, transparent 100%)" }}
          />
          {/* キャッチ用 下部gradient */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(15,8,3,0.65) 0%, transparent 45%)" }}
          />
          {/* 中央：ロゴのみ */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Image
              src="/images/logo-fv.png"
              alt="ARAISE"
              width={200}
              height={202}
              className="w-[120px] md:w-[170px] h-auto"
              priority
            />
          </div>
          {/* 左下：キャッチ＋サブコピー */}
          <div className="absolute bottom-8 left-7 md:bottom-12 md:left-10 z-20" style={{ maxWidth: "min(480px, 80vw)" }}>
            <p
              className="font-light"
              style={{
                color: "#C8A96E",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.6rem, 1vw, 0.7rem)",
                letterSpacing: "0.22em",
                marginBottom: "clamp(10px, 1.5vw, 14px)",
              }}
            >
              AYURVEDA · THAI MASSAGE · HEAD SPA
            </p>
            <h1
              className="font-light whitespace-pre-line"
              style={{
                color: "#FAF8F5",
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "clamp(1.7rem, 4vw, 3rem)",
                lineHeight: "1.35",
                letterSpacing: "0.06em",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
              }}
            >
              {t.hero_catch}
            </h1>
            <p
              className="font-light whitespace-pre-line"
              style={{
                color: "rgba(250,248,245,0.55)",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: "clamp(0.65rem, 1.1vw, 0.75rem)",
                lineHeight: "1.9",
                letterSpacing: "0.07em",
              }}
            >
              {t.hero_sub}
            </p>
          </div>
          {/* 右下：scroll */}
          <div className="absolute bottom-8 right-7 md:bottom-12 md:right-10 z-20 flex flex-col items-center gap-2">
            <div className="w-px h-10 md:h-14" style={{ backgroundColor: "rgba(200,169,110,0.45)" }} />
            <span
              className="text-xs"
              style={{ writingMode: "vertical-rl", color: "rgba(250,248,245,0.45)", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.2em" }}
            >
              scroll
            </span>
          </div>
        </section>

        {/* ===== CONCEPT ===== */}
        <section id="concept" className="py-28 px-6" style={{ backgroundColor: "#FAFAF8" }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-in-up">
              {/* 装飾ライン */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12" style={{ backgroundColor: "#C8A96E" }} />
                <p className="text-xs tracking-widest" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                  {t.concept_label}
                </p>
                <div className="h-px w-12" style={{ backgroundColor: "#C8A96E" }} />
              </div>
              <h2
                className="text-2xl md:text-3xl font-light mb-12"
                style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}
              >
                {t.concept_title}
              </h2>
              <div className="space-y-6">
                {t.concept_body.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm md:text-base leading-loose"
                    style={{ color: "#4A3728", fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* 2枚画像 */}
            <div className="fade-in-up grid grid-cols-2 gap-4 mt-16">
              {["/images/concept-1.jpg", "/images/concept-2.jpg"].map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden"
                  style={{ aspectRatio: "4/3", backgroundColor: "#EAE4DC" }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="py-28 px-6" style={{ backgroundColor: "#FAF8F5" }}>
          <div className="max-w-4xl mx-auto">
            <div className="fade-in-up">
              <p className="text-center text-xs tracking-widest mb-3" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                {"WHY ARAISE"}
              </p>
              <h2 className="text-center text-2xl md:text-3xl font-light mb-16" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                {t.why_title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FEATURES.map((item, i) => (
                <div key={item.en} className="fade-in-up p-8" style={{ borderTop: "1px solid #E8E0D5", transitionDelay: `${i * 80}ms` }}>
                  <p className="text-xs tracking-widest mb-3" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                    {item.en}
                  </p>
                  <h3 className="text-lg font-medium mb-3" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                    {lang === "ja" ? item.ja : item.enT}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B5344" }}>
                    {lang === "ja" ? item.jaD : item.enD}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section id="services" className="py-28 px-6 relative" style={{ backgroundColor: "#F5F0EA" }}>
          <span
            className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-xs tracking-widest pointer-events-none select-none"
            style={{ writingMode: "vertical-rl", color: "#E8E0D5", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.3em" }}
          >
            MENU
          </span>
          <div className="max-w-5xl mx-auto">
            <div className="fade-in-up">
              <p className="text-center text-xs tracking-widest mb-3" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                {"SERVICES"}
              </p>
              <h2 className="text-center text-2xl md:text-3xl font-light mb-16" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                {t.services_title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service, i) => (
                <div key={service.nameEn} className="fade-in-up flex flex-col" style={{ backgroundColor: "#FAF8F5", transitionDelay: `${i * 80}ms` }}>
                  <div className="h-52 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#EAE4DC" }}>
                    <span style={{ color: "rgba(200,169,110,0.4)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", letterSpacing: "0.25em" }}>
                      {service.nameEn}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-medium mb-2" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                      {lang === "ja" ? service.ja : service.en}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#6B5344" }}>
                      {lang === "ja" ? service.jaD : service.enD}
                    </p>
                    <p style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>{service.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="fade-in-up text-center mt-12">
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 text-sm tracking-widest transition-opacity hover:opacity-70"
                style={{ border: "1px solid #C8A96E", color: "#C8A96E", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                {t.services_all}
              </a>
            </div>
          </div>
        </section>

        {/* ===== COLUMN ===== */}
        <section className="py-28 px-6" style={{ backgroundColor: "#FAF8F5" }}>
          <div className="max-w-5xl mx-auto">
            <div className="fade-in-up flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-widest mb-2" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                  COLUMN
                </p>
                <h2 className="text-2xl md:text-3xl font-light" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                  {lang === "ja" ? "読みもの" : "Articles"}
                </h2>
              </div>
              <a
                href="#"
                className="text-xs tracking-widest transition-opacity hover:opacity-60"
                style={{ color: "#6B5344", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                {lang === "ja" ? "もっと見る →" : "View all →"}
              </a>
            </div>
            <div className="fade-in-up grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: lang === "ja" ? "アーユルヴェーダ" : "Ayurveda",
                  title: lang === "ja" ? "なぜアーユルヴェーダは眠れない人に効くのか" : "Why Ayurveda Works for People Who Can't Sleep",
                  date: "2024.03.15",
                },
                {
                  label: lang === "ja" ? "ヘッドスパ" : "Head Spa",
                  title: lang === "ja" ? "頭皮のコリが「眼精疲労」「頭痛」を引き起こしている理由" : "How Scalp Tension Causes Eye Strain and Headaches",
                  date: "2024.02.28",
                },
                {
                  label: lang === "ja" ? "タイ古式" : "Thai Massage",
                  title: lang === "ja" ? "ストレッチと指圧——タイ古式マッサージが身体の根本に届くしくみ" : "Stretch and Pressure: How Thai Massage Reaches the Root",
                  date: "2024.02.10",
                },
              ].map((article, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex flex-col transition-opacity hover:opacity-75"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div
                    className="w-full aspect-video mb-4 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: "#EAE4DC" }}
                  >
                    <span style={{ color: "rgba(200,169,110,0.4)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.2em" }}>
                      {article.label.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em" }}>
                    {article.label} · {article.date}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                    {article.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STAFF ===== */}
        <section id="staff" className="py-28 px-6" style={{ backgroundColor: "#FAF8F5" }}>
          <div className="max-w-4xl mx-auto">
            <div className="fade-in-up">
              <p className="text-center text-xs tracking-widest mb-3" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                {"THERAPIST"}
              </p>
              <h2 className="text-center text-2xl md:text-3xl font-light mb-4" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                {t.staff_title}
              </h2>
              <p className="text-center text-sm mb-16 max-w-md mx-auto whitespace-pre-line" style={{ color: "#6B5344", fontFamily: "'Noto Sans JP', sans-serif", lineHeight: "2" }}>
                {t.staff_sub}
              </p>
            </div>
            <div className="fade-in-up grid grid-cols-1 md:grid-cols-3 gap-10">
              {STAFF.map((person, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-36 h-36 rounded-full mb-5 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#EAE4DC" }}>
                    <span style={{ color: "rgba(200,169,110,0.5)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                      PHOTO
                    </span>
                  </div>
                  <p className="text-xs tracking-widest mb-1" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                    {lang === "ja" ? person.years.ja : person.years.en}
                  </p>
                  <h3 className="text-base font-medium mb-1" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                    {person.name}
                  </h3>
                  <p className="text-xs" style={{ color: "#6B5344" }}>{lang === "ja" ? person.title.ja : person.title.en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INSTAGRAM ===== */}
        <section className="py-28 px-6" style={{ backgroundColor: "#F5F0EA" }}>
          <div className="max-w-5xl mx-auto">
            <div className="fade-in-up flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-widest mb-2" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                  SOCIAL
                </p>
                <h2 className="text-2xl md:text-3xl font-light" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                  Instagram
                </h2>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-widest transition-opacity hover:opacity-60"
                style={{ color: "#6B5344", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                @araise.salon
              </a>
            </div>
            <div className="fade-in-up flex gap-1 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <a
                  key={i}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none transition-opacity hover:opacity-75"
                  style={{ width: "calc((100% - 5 * 4px) / 6)", minWidth: "120px", aspectRatio: "1 / 1", backgroundColor: "#DDD8D0", position: "relative", overflow: "hidden" }}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: "rgba(200,169,110,0.3)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", letterSpacing: "0.15em" }}
                  >
                    PHOTO
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRICE ===== */}
        <section id="price" className="py-28 px-6" style={{ backgroundColor: "#F5F0EA" }}>
          <div className="max-w-3xl mx-auto">
            <div className="fade-in-up">
              <p className="text-center text-xs tracking-widest mb-3" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                {"PRICE"}
              </p>
              <h2 className="text-center text-2xl md:text-3xl font-light mb-16" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                {t.price_title}
              </h2>
            </div>
            <div className="fade-in-up space-y-6">
              {PRICE_CATEGORIES.map((cat) => (
                <div key={cat.ja}>
                  <p className="text-xs tracking-widest mb-3 pb-2" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif", borderBottom: "1px solid #C8A96E" }}>
                    {lang === "ja" ? cat.ja : cat.en}
                  </p>
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex justify-between items-center py-3 text-sm" style={{ borderBottom: "1px solid #E8E0D5", color: "#2C1810" }}>
                      <span style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{item.name}</span>
                      <span style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>{item.price}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-8" style={{ color: "#6B5344" }}>{t.price_note}</p>
            <div className="fade-in-up text-center mt-8">
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 text-white text-sm tracking-widest transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#C8A96E", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                {t.reserve}
              </a>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-28 px-6" style={{ backgroundColor: "#FAF8F5" }}>
          <div className="max-w-3xl mx-auto">
            <div className="fade-in-up">
              <p className="text-center text-xs tracking-widest mb-3" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                {"FAQ"}
              </p>
              <h2 className="text-center text-2xl md:text-3xl font-light mb-16" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                {lang === "ja" ? "よくあるご質問" : "Frequently Asked Questions"}
              </h2>
            </div>
            <dl className="space-y-0">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="fade-in-up" style={{ transitionDelay: `${i * 60}ms`, borderTop: "1px solid #E8E0D5" }}>
                  <dt className="py-5 text-sm font-medium leading-relaxed" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                    <span className="mr-3" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>Q.</span>
                    {lang === "ja" ? item.q.ja : item.q.en}
                  </dt>
                  <dd className="pb-6 text-sm leading-loose" style={{ color: "#6B5344", fontFamily: "'Noto Sans JP', sans-serif", paddingLeft: "1.5rem" }}>
                    {lang === "ja" ? item.a.ja : item.a.en}
                  </dd>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #E8E0D5" }} />
            </dl>
          </div>
        </section>

        {/* ===== ACCESS ===== */}
        <section id="access" className="py-28 px-6" style={{ backgroundColor: "#FAF8F5" }}>
          <div className="max-w-4xl mx-auto">
            <div className="fade-in-up">
              <p className="text-center text-xs tracking-widest mb-3" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                {"ACCESS"}
              </p>
              <h2 className="text-center text-2xl md:text-3xl font-light mb-16" style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}>
                {t.access_title}
              </h2>
            </div>
            <div className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-12">
              <dl className="space-y-6">
                {(lang === "ja" ? ACCESS_ITEMS.ja : ACCESS_ITEMS.en).map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs tracking-widest mb-1" style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}>
                      {item.label}
                    </dt>
                    <dd className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#2C1810", fontFamily: "'Noto Sans JP', sans-serif" }}>
                      {item.value}
                    </dd>
                  </div>
                ))}
                <div className="pt-4">
                  <a
                    href={RESERVATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 text-white text-sm tracking-widest transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#C8A96E", fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    {t.reserve}
                  </a>
                </div>
              </dl>
              <div className="h-72 md:h-full min-h-64" style={{ border: "1px solid #E8E0D5" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d277.6612396539489!2d139.62464313079235!3d35.61426064831605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f5641b917eab%3A0x78704740b023f19c!2z44Ki44O844Om44Or44O044Kn44O844OA44O744K_44Kk5Y-k5byP44Oe44OD44K144O844K444O744OY44OD44OJ44K544OPIEFSQUlTRe-8iOOCouODrOOCpOOCuu-8iQ!5e0!3m2!1sja!2sjp!4v1776256462100!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.3) sepia(0.2)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ARAISE アクセスマップ"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="py-16 px-6" style={{ backgroundColor: "#2C1810", borderTop: "1px solid rgba(200,169,110,0.15)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
            <div>
              <Image src="/images/logo-white.png" alt="ARAISE" width={120} height={35} className="h-7 w-auto mb-4 opacity-80" />
              <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: "rgba(250,248,245,0.45)", fontFamily: "'Noto Sans JP', sans-serif" }}>
                {t.footer_desc}
              </p>
            </div>
            <nav className="flex flex-col gap-3">
              {t.nav.map((label, i) => (
                <Link key={label} href={NAV_HREFS[i]} className="text-xs transition-opacity hover:opacity-60"
                  style={{ color: "rgba(250,248,245,0.55)", fontFamily: "'Noto Sans JP', sans-serif", letterSpacing: "0.05em" }}>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="text-xs transition-opacity hover:opacity-60"
                style={{ color: "#C8A96E", fontFamily: "'Noto Sans JP', sans-serif" }}>{t.reserve}</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-xs transition-opacity hover:opacity-60"
                style={{ color: "rgba(250,248,245,0.55)", fontFamily: "'Noto Sans JP', sans-serif" }}>Instagram</a>
              <a href={THREADS_URL} target="_blank" rel="noopener noreferrer" className="text-xs transition-opacity hover:opacity-60"
                style={{ color: "rgba(250,248,245,0.55)", fontFamily: "'Noto Sans JP', sans-serif" }}>Threads</a>
            </div>
          </div>
          <p className="text-center text-xs" style={{ color: "rgba(250,248,245,0.2)", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em" }}>
            {t.copy}
          </p>
        </div>
      </footer>
    </>
  );
}
