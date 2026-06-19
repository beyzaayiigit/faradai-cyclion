"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useAuthStore } from "@/stores/authStore";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      onClose();
      setPassword("");
    } else {
      setError("Geçerli e-posta ve en az 6 karakterli şifre girin.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="fixed left-1/2 top-1/2 z-[61] w-[min(100%-2rem,400px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-glass-border glass-panel p-6 shadow-[0_0_40px_var(--shadow-primary)]"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-primary">
                  Yakında · Prototip
                </span>
                <h2 id="login-title" className="font-display text-lg font-semibold">
                  Demo girişi
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-surface-container"
                aria-label="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-4 text-sm text-foreground-muted">
              Rezervasyon hizmeti henüz aktif değil. Bu ekran, ilerideki filo
              girişi ve rezervasyon akışını göstermek için tasarlanmış bir
              prototiptir. Denemek için herhangi bir e-posta ve 6+ karakterli
              şifre yeterlidir.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="login-email" className="mb-1 block text-xs text-foreground-muted">
                  E-posta
                </label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@firma.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password" className="mb-1 block text-xs text-foreground-muted">
                  Şifre
                </label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              {error && (
                <p className="text-sm text-status-occupied" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Giriş yapılıyor…" : "Demo Girişi Yap"}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
