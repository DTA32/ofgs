"use server";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const adminAPI = process.env.ADMIN_API;

export async function handleForm(formData: FormData) {
  const nameID = formData.get("nameID");
  const title = formData.get("title");
  const category = formData.get("category");
  const description = formData.get("description");
  try {
    const response = await fetch(
      `${apiURL}${adminAPI}/games/update/${nameID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          description,
        }),
      }
    );
    const data = await response.json();
    return (
      "NextJS Server retrieved data, " +
      data.message +
      ", Redirecting to home in a second..."
    );
  } catch (error: any) {
    return "NextJS Server error, " + error.message;
  }
}

export async function handleDelete(nameID: string) {
  try {
    const res = await fetch(`${apiURL}${adminAPI}/games/delete/${nameID}`, {
      method: "DELETE",
    });
    const data = await res.json();
  } catch (error: any) {}
}
