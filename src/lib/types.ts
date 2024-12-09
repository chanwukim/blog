import type { SVGProps } from "react";

/**
 * `children` 속성을 선택적으로 포함하고 있으며, 모든 props에 `Readonly`가 적용되어 변경할 수 없도록 한다.
 * TypeScript 5.7부터 지원 예정
 * @see https://github.com/microsoft/TypeScript/pull/58296
 */
export type PropsWithChildren<P = unknown> = Readonly<
  P & {
    children?: React.ReactNode;
  }
>;

export interface IconProps extends SVGProps<SVGSVGElement> {
  children?: never;
  size?: number;
}

export interface Post {
  slug: string;
  title: string;
  category: string;
  description?: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
  content: string;
}

interface AsProps<C extends React.ElementType> extends PropsWithChildren {
  as?: C;
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProps<C> & P);

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {},
> = AsProps<C> &
  Props &
  Omit<React.ComponentPropsWithRef<C>, PropsToOmit<C, Props>>;
