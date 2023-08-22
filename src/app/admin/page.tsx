"use client";
import { handleSubmit } from "@/app/admin/handleSubmit";

export default function Admin() {
  return (
    <div className="flex justify-center align-center my-32 text-white text-center">
      <div>
        <h1 className="text-2xl">Admin Page</h1>
        <form action={handleSubmit}>
          <input
            type="password"
            className="border block rounded-full bg-transparent py-1 px-4 mt-8"
            id="password"
            placeholder="Password"
            name="password"
          />
          <button
            type="submit"
            className="py-1 px-8 border rounded-lg bg-green-800 mt-4"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
