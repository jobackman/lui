"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  cellSize = 56,
  idleThreshold = 4000,
  idleRippleInterval = 3000,
  enableIdleRipples = true,
}: {
  cellSize?: number;
  idleThreshold?: number;
  idleRippleInterval?: number;
  enableIdleRipples?: boolean;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [dimensions, setDimensions] = useState({ rows: 10, cols: 30 });
  const [isIdle, setIsIdle] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleRippleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const cols = Math.ceil(width / cellSize);
        const rows = Math.ceil(height / cellSize);
        setDimensions({ rows, cols });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [cellSize]);

  // Idle detection and automatic ripple generation
  useEffect(() => {
    if (!enableIdleRipples) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const resetIdleTimer = () => {
      setIsIdle(false);
      
      // Clear existing timers
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (idleRippleIntervalRef.current) {
        clearInterval(idleRippleIntervalRef.current);
      }

      // Set new idle timer
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, idleThreshold);
    };

    // User interaction events
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer);
    });

    // Initialize idle timer
    resetIdleTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (idleRippleIntervalRef.current) {
        clearInterval(idleRippleIntervalRef.current);
      }
    };
  }, [idleThreshold, enableIdleRipples]);

  // Generate automatic ripples when idle
  useEffect(() => {
    if (!isIdle || !enableIdleRipples) return;

    const generateIdleRipple = () => {
      if (dimensions.rows > 0 && dimensions.cols > 0) {
        // Generate random position
        const randomRow = Math.floor(Math.random() * dimensions.rows);
        const randomCol = Math.floor(Math.random() * dimensions.cols);
        
        setClickedCell({ row: randomRow, col: randomCol });
        setRippleKey((k) => k + 1);
      }
    };

    // Generate first ripple immediately
    generateIdleRipple();

    // Set up interval for subsequent ripples with randomization
    const startInterval = () => {
      const randomizedInterval = idleRippleInterval + (Math.random() - 0.5) * 1000;
      idleRippleIntervalRef.current = setTimeout(() => {
        generateIdleRipple();
        startInterval(); // Schedule next ripple
      }, randomizedInterval);
    };

    startInterval();

    return () => {
      if (idleRippleIntervalRef.current) {
        clearTimeout(idleRippleIntervalRef.current);
      }
    };
  }, [isIdle, dimensions, idleRippleInterval, enableIdleRipples]);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 h-full w-full overflow-hidden",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none z-10" />
      
      <DivGrid
        key={`base-${rippleKey}`}
        rows={dimensions.rows}
        cols={dimensions.cols}
        cellSize={cellSize}
        borderColor="var(--cell-border-color)"
        fillColor="var(--cell-fill-color)"
        clickedCell={clickedCell}
        onCellClick={(row, col) => {
          setClickedCell({ row, col });
          setRippleKey((k) => k + 1);
        }}
        interactive
      />
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number;
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: "100%",
    height: "100%",
  };

  return (
    <div className={cn("relative", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
