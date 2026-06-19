import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="footer-wash border-t border-glass-border py-12">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">MobiQ × RE-LITH</p>
          <p className="mt-1 text-sm text-foreground-muted">
            Akıllı şarj ağı × döngüsel batarya geri dönüşümü — tek platform.
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
          © {new Date().getFullYear()} CYCLION
        </p>
      </Container>
    </footer>
  );
}
