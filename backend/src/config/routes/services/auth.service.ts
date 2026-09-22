import { prisma } from "../config/prisma";
import {
  hashPassword,
  comparePassword,
} from "../utils/password";
import {
  isValidEmail,
  isValidPassword,
  normalizeEmail,
} from "../utils/validation";

export async function registerUser(
  email: string,
  password: string,
  name?: string
) {
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    throw new Error("E-mail inválido.");
  }

  if (!isValidPassword(password)) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      name: name?.trim() || null,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      name: true,
      isActive: true,
      createdAt: true,
    },
  });

  return user;
}

export async function loginUser(
  email: string,
  password: string
) {
  const normalizedEmail = normalizeEmail(email);

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user || !user.passwordHash) {
    throw new Error("E-mail ou senha inválidos.");
  }

  if (!user.isActive) {
    throw new Error("Esta conta está desativada.");
  }

  const validPassword = await comparePassword(
    password,
    user.passwordHash
  );

  if (!validPassword) {
    throw new Error("E-mail ou senha inválidos.");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isActive: user.isActive,
  };
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      isActive: true,
      createdAt: true,
    },
  });
}
