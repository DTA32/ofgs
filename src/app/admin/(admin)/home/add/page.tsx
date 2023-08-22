"use client";
import { useRouter } from "next/navigation";

export default function Add() {
  const router = useRouter();
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
          <div className="flex justify-between mt-8 gap-x-56">
            <div>
              <div>
                <h4 className="text-lg">Name ID</h4>
                <div>
                  <ul className="list-inside list-disc">
                    <li>use kebab-case convention</li>
                    <li>prevent using long name (simplify if needed)</li>
                  </ul>
                </div>
                <input
                  type="text"
                  className="border py-1 px-2 mt-2 bg-white text-black"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-lg">Title</h4>
                <input
                  type="text"
                  className="border py-1 px-2 mt-2 bg-white text-black"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-lg">Category</h4>
                <input
                  type="text"
                  className="border py-1 px-2 mt-2 bg-white text-black"
                />
              </div>
            </div>
            <div>
              <div>
                <h4 className="text-lg">Description</h4>
                <textarea
                  className="border py-1 px-2 mt-2 bg-white text-black w-64"
                  rows={7}
                />
              </div>
              <div className="mt-4">
                <h4 className="text-lg">Image</h4>
                <input type="file" className="mt-2 text-sm w-3/4" />
              </div>
              <div className="mt-4">
                <h4 className="text-lg">File</h4>
                <input type="file" className="mt-2 text-sm w-3/4" />
              </div>
            </div>
          </div>
          <div className="mt-16">
            <p className="text-center">
              Note: Name ID, Image, and File <br /> can&apos;t be edited after
              submitted
            </p>
            <div className="flex justify-center mt-4">
              <button className="rounded-lg bg-green-700 py-1 px-12">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
