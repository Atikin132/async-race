export function hasStringProp(obj: object, key: string): boolean {
  return (
    key in obj && typeof (obj as Record<string, unknown>)[key] === "string"
  );
}

export function hasNumberProp(obj: object, key: string): boolean {
  return (
    key in obj && typeof (obj as Record<string, unknown>)[key] === "number"
  );
}
