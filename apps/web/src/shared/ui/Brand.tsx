export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand brand-compact" : "brand"}>
      <svg viewBox="0 0 40 44" aria-hidden="true" className="brand-mark">
        <path d="M20 39C5 35 3 22 10 10c1 8 5 8 5 8S11 6 22 2c-2 8 3 12 3 12S31 7 34 13c8 15-1 29-14 26Z" />
        <ellipse cx="22" cy="25" rx="9" ry="13" transform="rotate(-30 22 25)" />
        <path d="M17 15c7 4 0 13 9 20" />
      </svg>
      {!compact && (
        <span>
          bruma<span className="brand-cafe">CAFÉ DE ORIGEN</span>
        </span>
      )}
    </span>
  );
}
