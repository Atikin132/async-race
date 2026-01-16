export type Page = "garage" | "winners";

export function isPage(value: string): value is Page {
  return value === "garage" || value === "winners";
}
