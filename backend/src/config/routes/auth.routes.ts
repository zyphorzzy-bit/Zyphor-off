import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserById,
} from "../services/auth.service";
import { success, error } from "../utils/response";
import {
  isValidEmail,
  isValidPassword,
  normalizeEmail,
} from "../utils/validation";

const router = Router();

/**
 * POST /api/auth/register
 */
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return error(res, "E-mail e senha são obrigatórios.", 400);
    }

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return error(res, "E-mail inválido.", 400);
    }

    if (!isValidPassword(password)) {
      return error(
        res,
        "A senha deve ter pelo menos 8 caracteres.",
        400
      );
    }

    const user = await registerUser(
      normalizedEmail,
      password,
      name
    );

    return success(res, user, 201);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/auth/login
 */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, "E-mail e senha são obrigatórios.", 400);
    }

    const user = await loginUser(email, password);

    return success(res, user);
  } catch (err) {
    if (
      err instanceof Error &&
      (
        err.message === "E-mail ou senha inválidos." ||
        err.message === "Esta conta está desativada."
      )
    ) {
      return error(res, err.message, 401);
    }

    next(err);
  }
});

/**
 * GET /api/auth/me
 *
 * Temporariamente usa x-user-id.
 * Depois vamos substituir por sessão segura.
 */
router.get("/me", async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId || typeof userId !== "string") {
      return error(res, "Não autorizado.", 401);
    }

    const user = await getUserById(userId);

    if (!user) {
      return error(res, "Usuário não encontrado.", 404);
    }

    return success(res, user);
  } catch (err) {
    next(err);
  }
});

export default router;
