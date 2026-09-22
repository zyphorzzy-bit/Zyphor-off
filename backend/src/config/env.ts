import "dotenv/config";

function getEnv(name: string, required = true): string {
  const value = process.env[name];

  if (required && (!value || value.trim() === "")) {
    throw new Error(`Variável de ambiente obrigatória não configurada: ${name}`);
  }

  return value ?? "";
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT || 3000),

  DATABASE_URL: getEnv("DATABASE_URL"),

  SESSION_SECRET: getEnv("SESSION_SECRET"),

  EMAIL_USER: getEnv("EMAIL_USER", false),
  EMAIL_APP_PASSWORD: getEnv("EMAIL_APP_PASSWORD", false),

  DISCORD_CLIENT_ID: getEnv("DISCORD_CLIENT_ID", false),
  DISCORD_CLIENT_SECRET: getEnv("DISCORD_CLIENT_SECRET", false),
  DISCORD_REDIRECT_URI: getEnv("DISCORD_REDIRECT_URI", false),

  GITHUB_CLIENT_ID: getEnv("GITHUB_CLIENT_ID", false),
  GITHUB_CLIENT_SECRET: getEnv("GITHUB_CLIENT_SECRET", false),

  PAYMENT_ACCESS_TOKEN: getEnv("PAYMENT_ACCESS_TOKEN", false)
} as const;
