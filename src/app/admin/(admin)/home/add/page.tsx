"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleSubmit } from "./handleSubmit";

export default function Add() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const handleSubmitInline = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await handleSubmit(formData);
      if (res.message.split(" ")[0] === "E11000") {
        setStatus("Name ID already exist");
      } else {
        setStatus(res.message);
        if (res.status === 201) {
          router.push("/admin/home");
        }
      }
    } catch (error: any) {
      setStatus(error.message);
    }
  };

  return (
    <main>
      <div className="flex justify-center mt-4 text-white">
        <div>
          <div className="grid grid-cols-3">
            <button
              className="py-0.5 px-6 rounded-lg bg-gray-500 justify-self-start"
              onClick={router.back}
            >
              Back
            </button>
            <h1 className="text-2xl text-center">Add new Game</h1>
          </div>
          <form onSubmit={handleSubmitInline}>
            <div className="flex justify-between mt-8 gap-x-56">
              <div>
                <div>
                  <h4 className="text-lg">Name ID</h4>
                  <div>
                    <ul className="list-inside list-disc">
                      <li>use kebab-case convention</li>
                      <li>prevent using long name (simplify if needed)</li>
                      <li>must be unique than other game</li>
                    </ul>
                  </div>
                  <input
                    type="text"
                    className="border py-1 px-2 mt-2 bg-white text-black"
                    id="nameID"
                    name="nameID"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg">Title</h4>
                  <input
                    type="text"
                    className="border py-1 px-2 mt-2 bg-white text-black"
                    id="title"
                    name="title"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg">Category</h4>
                  <input
                    type="text"
                    className="border py-1 px-2 mt-2 bg-white text-black"
                    id="category"
                    name="category"
                  />
                </div>
              </div>
              <div>
                <div>
                  <h4 className="text-lg">Description</h4>
                  <textarea
                    className="border py-1 px-2 mt-2 bg-white text-black w-64"
                    rows={7}
                    id="description"
                    name="description"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg">Image</h4>
                  <input
                    type="file"
                    className="mt-2 text-sm w-3/4"
                    id="image"
                    name="image"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg">File</h4>
                  <input
                    type="file"
                    className="mt-2 text-sm w-3/4"
                    id="game"
                    name="game"
                  />
                </div>
              </div>
            </div>
            <div className="mt-16">
              <p className="text-center">
                Note: Name ID, Image, and File <br /> can&apos;t be edited after
                submitted
              </p>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="rounded-lg bg-green-700 py-1 px-12"
                >
                  Add
                </button>
              </div>
              <p className="text-center mt-2 text-sm">
                {status && `Status: ${status}`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
