import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email invalido" }),
  password: z.string().trim().min(6, {
    message: "A password deve ter pelo menos 6 caracteres",
  }),
});

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: "O nome e obrigatorio",
    }),
    lastName: z.string().trim().min(1, {
      message: "O sobrenome e obrigatorio",
    }),
    email: z.email({ message: "Email invalido" }),
    password: z.string().trim().min(6, {
      message: "A password deve ter pelo menos 6 caracteres",
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: "A confirmacao de password deve ter pelo menos 6 caracteres",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "Voce deve concordar com os termos de servico",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As passwords nao coincidem",
    path: ["passwordConfirmation"],
  });
