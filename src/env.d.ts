/// <reference types="astro/client" />

declare module "astro:transitions/client" {
  export function navigate(
    href: string,
    options?: { history?: "auto" | "push" | "replace" }
  ): Promise<void>;
}
