"use client";

import { useTransitionNav } from "@/components/layout/PageTransition";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
  const navigate = useTransitionNav();

  const handleClick = (e: React.MouseEvent) => {
    // فقط للروابط الداخلية بدون modifier keys
    if (
      !href.startsWith("http") &&
      !href.startsWith("mailto") &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey
    ) {
      e.preventDefault();
      onClick?.();
      navigate(href);
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
