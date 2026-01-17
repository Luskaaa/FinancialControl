"use client";

export default function GridDebug() {
  const columns = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 px-4">
      {columns.map((col) => (
        <div
          key={col}
          className={`
            bg-blue-500/10 border border-blue-500/30
            ${col > 4 ? "hidden md:block" : ""}
            ${col > 8 ? "hidden xl:block" : ""}
          `}
        >
          <span className="text-blue-500/50 text-xs p-1">{col}</span>
        </div>
      ))}
    </div>
  );
}
