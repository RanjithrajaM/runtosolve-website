import type { ElementType, ReactNode } from "react";
import { classNames } from "@/lib/classNames";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={classNames("container-px", className)}>{children}</Tag>;
}
