"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "PIN incorrecto");
        setLoading(false);
        return;
      }

      // Store PIN for subsequent API calls
      sessionStorage.setItem("bb-admin-pin", pin);
      router.push("/admin");
    } catch {
      setError("Error de conexion");
      setLoading(false);
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bb-void)" }}>
      <div className="w-full max-w-xs text-center">
        <div className="mb-8">
          <div className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-3">
            BETHEL BELLINI
          </div>
          <h1 className="text-2xl font-serif font-light text-[var(--bb-cream)] mb-2">
            Admin Panel
          </h1>
          <p className="text-[var(--bb-muted)] text-xs font-sans">
            Ingresa el PIN de acceso
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PIN dots display */}
          <div className="flex justify-center gap-3 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  i < pin.length
                    ? "bg-[var(--bb-sand)] scale-110"
                    : "bg-[var(--bb-faint)] border border-[var(--bb-line)]"
                }`}
              />
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map(
              (key) => {
                if (key === "") return <div key="empty" />;
                if (key === "del") {
                  return (
                    <button
                      key="del"
                      type="button"
                      onClick={handleBackspace}
                      className="h-14 rounded-lg text-[var(--bb-muted)] text-sm font-sans hover:bg-[var(--bb-faint)] transition-colors"
                    >
                      ←
                    </button>
                  );
                }
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handlePinInput(key)}
                    className="h-14 rounded-lg text-[var(--bb-cream)] text-lg font-sans font-medium hover:bg-[var(--bb-faint)] active:bg-[rgba(196,168,130,0.1)] transition-colors"
                  >
                    {key}
                  </button>
                );
              },
            )}
          </div>

          {error && (
            <p className="text-[var(--bb-coral)] text-xs font-sans mb-4 animate-fade-in">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pin.length < 4 || loading}
            className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-3 rounded-lg text-sm font-bold font-sans hover:brightness-110 transition-all disabled:opacity-40"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
