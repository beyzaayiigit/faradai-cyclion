"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { submitContact } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setLoading(true);
    setError(null);
    try {
      await submitContact({
        name: String(form.get("name")),
        email: String(form.get("email")),
        company: String(form.get("company") || ""),
        message: String(form.get("message")),
      });
      formEl.reset();
      setSent(true);
    } catch {
      setError("Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact" tone="muted">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-xl"
        >
          <SectionHeader
            compact
            label="İletişim"
            title="Pitch Deck İsteyin"
            description="Yatırımcı ve stratejik ortaklar için özel sunum materyalleri."
            align="center"
            className="mb-6"
          />

          {sent ? (
            <div
              className="flex flex-col items-center gap-3 rounded-xl border border-secondary/30 bg-secondary/10 p-6 text-center"
              role="status"
            >
              <CheckCircle className="text-secondary-text" size={36} />
              <p className="font-semibold">Talebiniz alındı</p>
              <p className="text-sm text-foreground-muted">
                En kısa sürede sizinle iletişime geçeceğiz.
              </p>
              <Button variant="ghost" onClick={() => setSent(false)}>
                Yeni mesaj gönder
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {error ? (
                <p className="rounded-lg border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                  {error}
                </p>
              ) : null}
              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-foreground-muted">
                  Ad Soyad
                </label>
                <Input id="name" name="name" required placeholder="Adınız" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-foreground-muted">
                  E-posta
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ornek@sirket.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="mb-1 block text-sm text-foreground-muted">
                  Şirket (opsiyonel)
                </label>
                <Input id="company" name="company" placeholder="Şirket adı" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm text-foreground-muted">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Pitch deck veya iş birliği hakkında..."
                  className="w-full rounded-lg border border-glass-border bg-surface-container/80 px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Gönderiliyor..." : "Bizimle İletişime Geçin"}
              </Button>
            </form>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
