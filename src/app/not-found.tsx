import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-5xl px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center gap-4">
      <h2 className="text-3xl">Not Found</h2>
      <p className="text-xl">Could not find requested resource</p>
      <div className="mt-4">
        <Link className="px-6 py-3 rounded-lg bg-orange text-cream" href="/home">Return to Home</Link>
      </div>
    </div>
  )
}