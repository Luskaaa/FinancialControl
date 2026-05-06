export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <main className="h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-2 md:gap-4 py-4 md:py-6 px-3 md:px-4 items-center">
        {children}
      </main>
    </div>
  );
}
