'use client';

import { useEffect, useState, useRef, type ReactNode } from 'react';

function cn(...inputs: (string | false | null | undefined)[]): string {
  return inputs.filter(Boolean).join(' ');
}

function useIsVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [visible, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-600 ease-out',
        show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface ShowcaseTab {
  id: string;
  label: string;
  description: string;
}

export function CodeShowcase({
  tabs,
  children,
}: {
  tabs: ShowcaseTab[];
  children: ReactNode[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="overflow-hidden rounded-xl border bg-fd-card shadow-sm">
      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b bg-fd-secondary/30">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActive(i)}
            className={cn(
              'relative px-5 py-3 text-sm font-medium transition-colors',
              active === i
                ? 'text-fd-foreground'
                : 'text-fd-muted-foreground hover:text-fd-foreground/80',
            )}
          >
            {tab.label}
            {active === i && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-fd-primary" />
            )}
          </button>
        ))}
      </div>
      {/* Tab description */}
      <div className="border-b bg-fd-secondary/10 px-5 py-3">
        <p className="text-sm text-fd-muted-foreground">
          {tabs[active].description}
        </p>
      </div>
      {/* Tab content */}
      <div className="relative">
        {children.map((child, i) => (
          <div
            key={i}
            className={cn(
              active === i ? 'block' : 'hidden',
            )}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
