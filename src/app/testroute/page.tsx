"use client";
import { useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Sebuah test yang monoton</h1>
      <button
        className="rounded bg-slate-500 px-2 py-1"
        onClick={() => setCount(count + 1)}
      >
        Pencet
      </button>
      <p>Button clicked {count}x times</p>
    </div>
  );
}
