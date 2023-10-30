"use server";
const apiURL = process.env.NEXT_PUBLIC_API_URL;
const adminAPI = process.env.ADMIN_API;

export async function handleSubmit(data: FormData) {
  const image = data.get("image") as File;
  const game = data.get("game") as File;
  if (
    data.get("nameID") === "" ||
    data.get("title") === "" ||
    data.get("category") === "" ||
    data.get("description") === "" ||
    image.size === 0 ||
    game.size === 0
  ) {
    return "Please fill out all fields";
  }
  try {
    const res = await fetch(`${apiURL}${adminAPI}/games/create`, {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    return json;
  } catch (err: any) {
    return "Error, " + err;
  }
}
