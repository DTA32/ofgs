"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  handleForm,
  handleDelete,
} from "@/app/admin/(admin)/games/[nameID]/handleForm";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { nameID: string } }) {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/data/get/" + params.nameID,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
    }
  );
  if (isLoading)
    return (
      <div className="m-24 text-center text-white text-4xl">Loading...</div>
    );
  if (error)
    return (
      <div className="m-24 text-center text-white">
        <h1 className="text-3xl">Error</h1>
        <h3 className="text-xl pt-8">
          Error while fetching data, please try again later.
        </h3>
      </div>
    );
  const handleSubmitInline = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await handleForm(formData);
      setStatus(res);
      router.push("/admin/home");
    } catch (error: any) {
      setStatus("Client Error");
      console.log(error);
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
            <h1 className="text-2xl text-center">Edit {params.nameID}</h1>
          </div>
          <form onSubmit={handleSubmitInline}>
            <div className="grid grid-cols-3 mt-16 gap-x-16">
              <div>
                <div>
                  <h4 className="text-lg">Title</h4>
                  <input
                    type="text"
                    className="border py-1 px-2 mt-2 bg-white text-black"
                    defaultValue={data.title}
                    name="title"
                    id="title"
                  />
                  <input
                    type="text"
                    className="hidden"
                    defaultValue={data.nameID}
                    name="nameID"
                    id="nameID"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg">Category</h4>
                  <input
                    type="text"
                    className="border py-1 px-2 mt-2 bg-white text-black"
                    defaultValue={data.category}
                    name="category"
                    id="category"
                  />
                </div>
              </div>
              <div>
                <div>
                  <h4 className="text-lg">Description</h4>
                  <textarea
                    className="border py-1 px-2 mt-2 bg-white text-black w-64"
                    rows={7}
                    defaultValue={data.description}
                    name="description"
                    id="description"
                  />
                </div>
              </div>
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/${data.nameID}`}
                  alt="image"
                  width={240}
                  height={240}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 mt-6">
              <div className="col-span-2">
                <p className="text-sm text-center">
                  Note: Name ID, Image, and File <br /> cant be edited, if
                  needed please <br />
                  re-add game (consider using same <br /> Name ID so it
                  won&apos;t confuse user)
                </p>
                <div className="flex justify-center mt-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-green-700 py-1 px-12"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="rounded-lg bg-red-700 py-1 px-6 h-1/4"
                  onClick={async () => {
                    try {
                      await handleDelete(data.nameID);
                      router.push("/admin/home");
                    } catch (error: any) {
                      console.log(error);
                    }
                  }}
                  type="button"
                >
                  Delete Game
                </button>
              </div>
            </div>
          </form>
          <p className="text-xs text-center mt-8">
            {status && `Status: ${status}`}
          </p>
        </div>
      </div>
    </main>
  );
}
