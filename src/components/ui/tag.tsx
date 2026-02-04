interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span 
      className={`
        inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
        bg-glass-subtle backdrop-blur-glass-subtle border-glass transition-glass text-white/90 shadow-sm
        ${className}
      `}
    >
      {children}
    </span>
  );
}
