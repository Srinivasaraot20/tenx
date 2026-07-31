import { Inter } from "next/font/google";
import Script from "next/script";
import GATracker from "@/components/GATracker";
import { GoogleAnalytics } from '@next/third-parties/google';
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema } from "@/components/schema/SchemaComponents";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Best Digital Marketing Agency in Hyderabad | Digital TenX",
  description: "Looking for a results-driven digital marketing agency in Hyderabad? Get SEO, Google Ads & social media marketing that grows leads. Book a free audit today.",
  icons: {
    icon: [
      { url: "/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
      { url: "/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-48x48.webp", sizes: "48x48", type: "image/webp" },
      { url: "/favicon-64x64.webp", sizes: "64x64", type: "image/webp" },
      { url: "/icon.webp", sizes: "512x512", type: "image/webp" }
    ],
    shortcut: "/favicon.webp",
    apple: "/apple-icon.webp",
  },
};

export default function RootLayout({ children }) {
  // Inject schemas
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-63N4N1Y1RV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-63N4N1Y1RV');
          `}
        </Script>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <GATracker />
        {children}
      </body>
      
    </html>
  );
}

