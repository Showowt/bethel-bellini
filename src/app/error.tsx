"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bb-void)" }}
    >
      <div className="text-center max-w-sm">
        <div className="text-[var(--bb-sand)] text-4xl font-serif mb-4">
          ◈
        </div>
        <h2 className="text-xl font-serif font-light text-[var(--bb-cream)] mb-2">
          Algo salio mal
        </h2>
        <p className="text-[var(--bb-muted)] text-sm font-sans mb-6">
          {error.message || "Error inesperado. Intenta de nuevo."}
        </p>
        <button
          onClick={reset}
          className="bg-[var(--bb-sand)] text-[var(--bb-void)] px-6 py-3 rounded-lg text-sm font-bold font-sans hover:brightness-110 transition-all"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
