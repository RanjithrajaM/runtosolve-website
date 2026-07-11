import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Centered, max-width content wrapper used across every section. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn("container-px", className)}>{children}</Tag>;
}
