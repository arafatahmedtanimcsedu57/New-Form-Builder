import type { Metadata } from "next";
import { Providers } from "@/app/provider";

import "./../globals.css";

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Create any form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Providers>
          <main className="container w-full m-auto px-4 py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
