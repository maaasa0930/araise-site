import Image from "next/image";
import Link from "next/link";

const RESERVATION_URL = "https://beauty.hotpepper.jp/kr/slnH000753877/";
const INSTAGRAM_URL = "https://www.instagram.com/araise.salon/";
const THREADS_URL = "https://www.threads.net/@araise.salon";

export default function Home() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: "rgba(250,248,245,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E8E0D5" }}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-white.png"
            alt="ARAISE"
            width={140}
            height={40}
            className="h-8 w-auto"
            style={{ filter: "invert(1) sepia(1) saturate(2) hue-rotate(10deg) brightness(0.6)" }}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#6B5344", fontFamily: "'Noto Sans JP', sans-serif" }}>
          <Link href="#services" className="hover:opacity-70 transition-opacity">メニュー</Link>
          <Link href="#access" className="hover:opacity-70 transition-opacity">アクセス</Link>
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-white text-sm font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#C8A96E" }}
          >
            ご予約はこちら
          </a>
        </nav>
        {/* Mobile CTA */}
        <a
          href={RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden px-4 py-2 text-white text-xs font-medium"
          style={{ backgroundColor: "#C8A96E" }}
        >
          予約する
        </a>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section
          className="relative flex items-center justify-center min-h-screen"
          style={{ backgroundColor: "#2C1810" }}
        >
          {/* 背景オーバーレイ */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(44,24,16,0.6)" }} />

          <div className="relative z-10 text-center px-6 pt-20">
            <p
              className="text-sm tracking-widest mb-6"
              style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Ayurveda · Thai Massage · Head Spa
            </p>
            <h1
              className="text-4xl md:text-6xl font-light leading-tight mb-6"
              style={{ color: "#FAF8F5", fontFamily: "'Noto Serif JP', serif" }}
            >
              戦闘状態のあなたが
              <br />
              来ていい場所
            </h1>
            <p
              className="text-base md:text-lg font-light mb-10 max-w-md mx-auto"
              style={{ color: "rgba(250,248,245,0.75)", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              二子玉川の完全個室サロン。
              <br />
              深夜0時まで、施術歴10年以上のセラピストが待っています。
            </p>
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 text-sm tracking-widest transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#C8A96E", color: "#FAF8F5", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              ご予約はこちら
            </a>
          </div>

          {/* スクロール表示 */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest" style={{ color: "rgba(250,248,245,0.4)", fontFamily: "'Cormorant Garamond', serif" }}>
              SCROLL
            </span>
            <div className="w-px h-12" style={{ backgroundColor: "rgba(200,169,110,0.5)" }} />
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="py-24 px-6" style={{ backgroundColor: "#FAF8F5" }}>
          <div className="max-w-4xl mx-auto">
            <p
              className="text-center text-xs tracking-widest mb-3"
              style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}
            >
              WHY ARAISE
            </p>
            <h2
              className="text-center text-2xl md:text-3xl font-light mb-16"
              style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}
            >
              ARAISEが選ばれる理由
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: "◈",
                  title: "完全個室",
                  desc: "すべての施術室が完全個室。他のお客様の気配を感じることなく、ゆっくりと過ごせます。",
                },
                {
                  icon: "◈",
                  title: "深夜0時まで営業",
                  desc: "仕事終わりでも通える深夜営業。あなたのスケジュールに合わせて予約できます。",
                },
                {
                  icon: "◈",
                  title: "施術歴平均10年以上",
                  desc: "経験を積んだセラピストのみが在籍。「手が勝手に体の問題を見つける」プロの技術を。",
                },
                {
                  icon: "◈",
                  title: "アーユルヴェーダ専門",
                  desc: "スリランカ直輸入のハーブオイルを使用。体質別に調合し、本場のアーユルヴェーダ体験を。",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 p-6"
                  style={{ border: "1px solid #E8E0D5" }}
                >
                  <span style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <div>
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B5344" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section id="services" className="py-24 px-6" style={{ backgroundColor: "#F5F0EA" }}>
          <div className="max-w-5xl mx-auto">
            <p
              className="text-center text-xs tracking-widest mb-3"
              style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}
            >
              SERVICES
            </p>
            <h2
              className="text-center text-2xl md:text-3xl font-light mb-16"
              style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}
            >
              施術メニュー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "アーユルヴェーダ",
                  nameEn: "Ayurveda",
                  desc: "スリランカ直輸入ハーブオイルを体質別に調合。全身の巡りを整え、芯から緩めるオイルトリートメント。",
                  price: "¥12,980〜",
                },
                {
                  name: "タイ古式マッサージ",
                  nameEn: "Thai Massage",
                  desc: "ストレッチと指圧を組み合わせた伝統技法。身体の歪みを整え、疲労の根本にアプローチします。",
                  price: "¥8,980〜",
                },
                {
                  name: "ドライヘッドスパ",
                  nameEn: "Head Spa",
                  desc: "頭部・首・肩の緊張を徹底的にほぐす。不眠・眼精疲労・頭痛が気になる方に。",
                  price: "¥7,980〜",
                },
                {
                  name: "足裏リフレクソロジー",
                  nameEn: "Reflexology",
                  desc: "足裏の反射区を刺激し、全身の器官に働きかける。立ち仕事・長時間座り仕事の方へ。",
                  price: "¥6,980〜",
                },
              ].map((service) => (
                <div
                  key={service.name}
                  className="flex flex-col"
                  style={{ backgroundColor: "#FAF8F5", border: "1px solid #E8E0D5" }}
                >
                  {/* 画像プレースホルダー */}
                  <div
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: "#2D4A3E" }}
                  >
                    <span
                      style={{ color: "rgba(200,169,110,0.5)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", letterSpacing: "0.2em" }}
                    >
                      {service.nameEn}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3
                      className="text-lg font-medium mb-1"
                      style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}
                    >
                      {service.name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#6B5344" }}>
                      {service.desc}
                    </p>
                    <p
                      className="text-base font-medium"
                      style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {service.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 text-sm tracking-widest transition-opacity hover:opacity-80"
                style={{ border: "1px solid #C8A96E", color: "#C8A96E", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                ご予約はこちら
              </a>
            </div>
          </div>
        </section>

        {/* ===== PRICE ===== */}
        <section id="price" className="py-24 px-6" style={{ backgroundColor: "#FAF8F5" }}>
          <div className="max-w-3xl mx-auto">
            <p
              className="text-center text-xs tracking-widest mb-3"
              style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}
            >
              PRICE
            </p>
            <h2
              className="text-center text-2xl md:text-3xl font-light mb-16"
              style={{ color: "#2C1810", fontFamily: "'Noto Serif JP', serif" }}
            >
              料金のご案内
            </h2>
            <div className="space-y-1">
              {[
                { category: "アーユルヴェーダ", items: [
                  { name: "60分", price: "¥12,980" },
                  { name: "90分", price: "¥17,980" },
                  { name: "120分", price: "¥23,980" },
                ]},
                { category: "タイ古式マッサージ", items: [
                  { name: "60分", price: "¥8,980" },
                  { name: "90分", price: "¥12,980" },
                  { name: "120分", price: "¥16,980" },
                ]},
                { category: "ドライヘッドスパ", items: [
                  { name: "45分", price: "¥7,980" },
                  { name: "60分", price: "¥10,980" },
                ]},
                { category: "足裏リフレクソロジー", items: [
                  { name: "30分", price: "¥6,980" },
                  { name: "60分", price: "¥12,980" },
                ]},
              ].map((cat) => (
                <div key={cat.category}>
                  <div
                    className="px-6 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#2D4A3E", color: "#FAF8F5", fontFamily: "'Noto Serif JP', serif" }}
                  >
                    {cat.category}
                  </div>
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center px-6 py-3 text-sm"
                      style={{ borderBottom: "1px solid #E8E0D5", color: "#2C1810" }}
                    >
                      <span>{item.name}</span>
                      <span style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-6" style={{ color: "#6B5344" }}>
              ※表示価格はすべて税込です。詳細なメニューはご予約ページでご確認ください。
            </p>
            <div className="text-center mt-8">
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 text-white text-sm tracking-widest transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#C8A96E", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                ご予約はこちら
              </a>
            </div>
          </div>
        </section>

        {/* ===== ACCESS ===== */}
        <section id="access" className="py-24 px-6" style={{ backgroundColor: "#2C1810" }}>
          <div className="max-w-4xl mx-auto">
            <p
              className="text-center text-xs tracking-widest mb-3"
              style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}
            >
              ACCESS
            </p>
            <h2
              className="text-center text-2xl md:text-3xl font-light mb-16"
              style={{ color: "#FAF8F5", fontFamily: "'Noto Serif JP', serif" }}
            >
              アクセス
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                {[
                  { label: "住所", value: "東京都世田谷区玉川2丁目" },
                  { label: "最寄り駅", value: "東急田園都市線・東急大井町線\n二子玉川駅 徒歩5分" },
                  { label: "営業時間", value: "12:00〜24:00（最終受付 22:30）" },
                  { label: "定休日", value: "不定休" },
                  { label: "電話", value: "03-6411-7315" },
                ].map((item) => (
                  <div key={item.label}>
                    <dt
                      className="text-xs tracking-widest mb-1"
                      style={{ color: "#C8A96E", fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.label}
                    </dt>
                    <dd
                      className="text-sm leading-relaxed whitespace-pre-line"
                      style={{ color: "rgba(250,248,245,0.8)", fontFamily: "'Noto Sans JP', sans-serif" }}
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </div>
              {/* Google Maps Embed */}
              <div className="h-64 md:h-full min-h-64" style={{ border: "1px solid rgba(200,169,110,0.3)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.0!2d139.627!3d35.611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQVJBSVNF!5e0!3m2!1sja!2sjp!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.5) sepia(0.3)" }}
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
      <footer className="py-12 px-6" style={{ backgroundColor: "#1A0E09", borderTop: "1px solid rgba(200,169,110,0.2)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <Image
              src="/images/logo-white.png"
              alt="ARAISE"
              width={120}
              height={35}
              className="h-7 w-auto opacity-80"
            />
            <div className="flex items-center gap-6">
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "#C8A96E", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                ご予約はこちら
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "rgba(250,248,245,0.6)", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                Instagram
              </a>
              <a
                href={THREADS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "rgba(250,248,245,0.6)", fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                Threads
              </a>
            </div>
          </div>
          <p
            className="text-center text-xs"
            style={{ color: "rgba(250,248,245,0.3)", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em" }}
          >
            © 2024 ARAISE. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
