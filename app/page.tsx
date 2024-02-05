"use client";

import { JsonViewer, JsonViewerContent, JsonViewerHeader } from "./json-viewer";
import { useEffect, useState } from "react";

export default function Home() {
  const [domain, setDomain] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    if (!domain) return;

    const delayDebounceFn = setTimeout(() => {
      fetch("/api/ping?host=" + domain)
      .then((res) => res.json())
      .then((res) => setResponse(res))
      .catch((err) => console.error(err));
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [domain]);

  return (
    <main className="grid lg:grid-cols-2 gap-10 lg:p-10 min-h-[100vh] h-full p-10 items-center bg-white">
      <div className="flex justify-center flex-col w-full">
        <h1 className="font-bold text-[60px] text-black mx-auto ">PING HOST</h1>
        <input
          onChangeCapture={(e) => setDomain(e.currentTarget.value)}
          type="text"
          className="bg-transparent border mx-auto border-black border-opacity-50 rounded-lg p-1 text-black max-w-[300px] w-full mt-5"
        />
      </div>

      <JsonViewer>
        <JsonViewerHeader title="JSON Response" />
        {response ? (
          <JsonViewerContent json={JSON.stringify(response, null, 2)} />
        ): (
          <p className="text-black">No response yet</p>
        )}
      </JsonViewer>
    </main>
  );
}
