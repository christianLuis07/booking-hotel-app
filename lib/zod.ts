import { object, string } from "zod";

export const ContactSchema = object({
  name: string().min(6, "Nama minimal 6 karakter"),
  email: string()
    .min(6, "Email minimal 6 karakter")
    .email(" Email tidak valid"),
  subject: string().min(6, "Subject minimal 6 karakter"),
  message: string()
    .min(50, "Message minimal 50 karakter")
    .max(250, "Message maksimal 250 karakter"),
});
