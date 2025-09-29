"use server";
import { ContactSchema } from "./zod";
import { prisma } from "@/lib/prisma";

export const ContactMessage = async (prev: unknown, formData: FormData) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return { message: "Terima kasih telah MengContact Kami" };
  } catch (error) {
    console.log(error);
  }
};
