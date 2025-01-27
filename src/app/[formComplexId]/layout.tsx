export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container w-full m-auto px-4 py-10">{children}</main>;
}
