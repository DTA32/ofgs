"use server";
import { redirect } from "next/navigation";

export async function handleSubmit(formData: FormData) {
  const password = formData.get("password");
  if (password === process.env.ADMIN_PASSWORD) {
    // bikin session 
    redirect("/admin/home");
  } else {
    redirect("/home");
  }
}
