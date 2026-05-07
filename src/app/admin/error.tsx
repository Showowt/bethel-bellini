"use client";

export default function AdminError({
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
        <h2 className="text-xl font-serif font-light text-[var(--bb-cream)] mb-2">
          Error en Admin
        </h2>
        <p className="text-[var(--bb-muted)] text-sm font-sans mb-6">
          {error.message || "Error inesperado."}
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
