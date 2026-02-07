export function Hero() {
  return (
    <div className="relative text-center">
      <h1 className="relative inline-flex items-center justify-center overflow-visible text-4xl md:text-5xl font-black tracking-tight leading-none">
        <span className="relative z-10 px-1 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(210,238,255,0.5),rgba(255,255,255,0.9))] bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(15,18,30,0.4)]">
          LucyUI
        </span>
        <span
          className="absolute z-0 translate-y-[2px] select-none text-transparent stroke-[1.15px] stroke-white/65 [text-shadow:0_0_10px_rgba(200,235,255,0.55)]"
          aria-hidden="true"
        >
          LucyUI
        </span>
      </h1>
      <div className="mt-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.45em] text-foreground/45">
        <span className="h-[1px] w-8 bg-foreground/15" aria-hidden="true" />
        Ready for Midnight
        <span className="h-[1px] w-8 bg-foreground/15" aria-hidden="true" />
      </div>
    </div>
  );
}
