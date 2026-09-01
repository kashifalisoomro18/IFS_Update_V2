import * as React from "react";

interface HTMLMarqueeElement extends HTMLElement {
  behavior?: string;
  bgColor?: string;
  direction?: string;
  height?: string;
  hspace?: number;
  loop?: number;
  scrollAmount?: number;
  scrollDelay?: number;
  trueSpeed?: boolean;
  vspace?: number;
  width?: string;
  start(): void;
  stop(): void;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLMarqueeElement> & {
          behavior?: 'scroll' | 'slide' | 'alternate';
          direction?: 'left' | 'right' | 'up' | 'down';
          scrollamount?: number | string;
          scrolldelay?: number | string;
          loop?: number | string;
        },
        HTMLMarqueeElement
      >;
    }
  }
}
