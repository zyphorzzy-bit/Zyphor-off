export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateRequired(
  values: Record<string, unknown>,
  fields: string[]
): string | null {
  for (const field of fields) {
    const value = values[field];

    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return `O campo "${field}" é obrigatório.`;
    }
  }

  return null;
        }
