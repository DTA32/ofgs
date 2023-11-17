import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function about() {
  return (
    <main className="flex-1 flex flex-col space-y-8 pt-6 mb-32">
      <div id="title" className="pb-6 px-4 md:px-0">
        <h1 className="text-center text-4xl mb-1.5">
          DTA32&apos;s Flash Game Site
        </h1>
      </div>
      <div className="container mx-auto md:px-12 px-6 flex flex-col space-y-12 max-w-6xl">
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl">About</h2>
          <div className="flex flex-col text-xl space-y-4">
            <p>
              DTA32&apos;s Flash Game Site is a site made by DTA32 (me) to store
              and play my favorite flash games from my childhood (probably
              2010&apos;ish). This site was made (planned to be done) on Summer
              2023 (but it still on progress LMAO). Sorry if there&apos;s game
              that you wanted but isn&apos;t listed on this site, probably i
              haven&apos;t played it yet or i forgot it.
            </p>
            <div className="flex flex-col space-y-1">
              <p>Disclaimer:</p>
              <ul className="list-disc list-inside">
                <li>
                  All games on this sites is created and owned by the game
                  developer
                </li>
                <li>
                  Any bug in games on this sites are caused by the flash player
                  (ruffle), bugfix in the future are expected
                </li>
                <li>
                  If a game isn&apos;t loaded after ~30 seconds, please just go
                  back, it&apos;s a bug and may consume your memory excessively
                  (hehe sorry haven&apos;t fixed it yet)
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl">Contact Me</h2>
          <div className="flex flex-col text-xl">
            <p>
              Email:{" "}
              <a href="mailto:bandung2003@gmail.com">bandung2003@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
