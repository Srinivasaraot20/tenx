import { Inter } from "next/font/google";
import Script from "next/script";
import GATracker from "@/components/GATracker";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema } from "@/components/schema/SchemaComponents";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Best Digital Marketing Agency in Hyderabad | TenX",
  description: "Looking for a results-driven digital marketing agency in Hyderabad? Get SEO, Google Ads & social media marketing that grows leads. Book a free audit today.",
  metadataBase: new URL("https://www.digitalmarketingtenx.com"),
  icons: {
    icon: [
      { url: "/favicon-48x48.webp", sizes: "48x48", type: "image/webp" },
      { url: "/favicon-64x64.webp", sizes: "64x64", type: "image/webp" },
      { url: "/favicon-192x192.webp", sizes: "192x192", type: "image/webp" },
    ],
    shortcut: "/favicon-48x48.webp",
    apple: [
      { url: "/apple-icon.webp", sizes: "180x180", type: "image/webp" },
    ],
  },
};

export default function RootLayout({ children }) {
  // Inject schemas
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <GATracker />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-63N4N1Y1RV"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-63N4N1Y1RV');
          `}
        </Script>
      </body>
    </html>
  );
}


