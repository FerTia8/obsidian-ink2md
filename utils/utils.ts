export function trimBrackets(str : string): string {
  if (str.startsWith("![[") && str.endsWith("]]")) {
    return str.slice(3, -2);
  }
  return str;
}

export function getMimeType(base64File: string): string {
  const signatures: Record<string, string> = {
    "iVBORw0KGgo": "image/png",   // PNG
    "/9j/": "image/jpeg",         // JPEG
  };

  for (const sig in signatures) {
    if (base64File.startsWith(sig)) {
      return signatures[sig];
    }
  }

  throw new Error("Unknown File Mime Type");
}