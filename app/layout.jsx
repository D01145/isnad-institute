import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://isnadinstitute.com"),

  title: {
    default: "Isnad Institute | Online Arabic & Quran Learning",
    template: "%s | Isnad Institute",
  },

  description:
    "Learn Arabic and the Quran online with qualified teachers through private one-to-one and small group classes.",

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  themeColor: "#0F6B4F",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Isnad Institute",
    description: "Learn Arabic. Understand the Quran.",
    url: "https://isnadinstitute.com",
    siteName: "Isnad Institute",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
