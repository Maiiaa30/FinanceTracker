import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email invalido" }),
  password: z.string().trim().min(6, {
    message: "A password deve ter pelo menos 6 caracteres",
  }),
});
