import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARAISE（アレイズ）| 二子玉川のアーユルヴェーダ・タイ古式・ヘッドスパ",
  description:
    "二子玉川駅徒歩5分。完全個室・深夜0時まで営業。施術歴平均10年のセラピストによるアーユルヴェーダ・タイ古式マッサージ・ドライヘッドスパ。",
  openGraph: {
    title: "ARAISE（アレイズ）| 二子玉川のアーユルヴェーダ・タイ古式・ヘッドスパ",
    description:
      "二子玉川駅徒歩5分。完全個室・深夜0時まで営業。施術歴平均10年のセラピストによるアーユルヴェーダ・タイ古式マッサージ・ドライヘッドスパ。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PSJCVT7W8Q"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PSJCVT7W8Q');
          `}
        </Script>
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
