import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Shop App",
  description: "Implemented by Hamid Hassani",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <div>
          <Toaster />
        </div>
        <Header />
        <div className='container xl:max-w-screen-xl'>{children}</div>
      </body>
    </html>
  );
}
