import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function about() {
  return (
    <main className="flex-1 flex flex-col container mx-auto space-y-8 pt-6 mb-32 px-8">
      <div id="title" className="pb-6 px-4 md:px-0">
        <h1 className="text-center text-4xl mb-1.5">
          DTA32&apos;s Flash Game Site
        </h1>
      </div>
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-6" id="about">
          <h2 className="text-3xl">About</h2>
          <div className="flex flex-col text-xl space-y-4">
            <p>
              This is another my long overdue side project to store
              and play my favorite flash games from my childhood (probably
              2010&apos;ish). Was planned to be done on Summer
              2023, and as long as i have new idea for this site, this won&apos;t be done.
              As this only for my personal use, i don&apos;t care if there&apos;s any game
              that you wanted but isn&apos;t listed on this site, but you may contact me
              and request it, maybe i&apos;ll consider to add it.
            </p>
            <div className="flex flex-col space-y-1">
              <p>Notes:</p>
              <ul className="list-disc list-inside">
                <li>
                  Any bug/error/crash in games on this sites are caused by the flash player,&nbsp;
                  <Link href="https://ruffle.rs/" className="underline">Ruffle</Link>.
                  As this player is open-source and still in development,
                  let&apos;s just hope that this player will be
                  improved in the future.
                </li>
                <li>
                  If a game isn&apos;t loaded after ~30 seconds, please just go
                  back, it&apos;s a bug and may consume your memory excessively
                  (hehe sorry idk how to fix it)
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-6" id="disclaimer">
          <h2 className="text-3xl">Disclaimer</h2>
          <p className="text-xl">
            This website is a fan-made archive and non-commercial dedicated to preserving classic Flash games
            that were once available on various online platforms for nostalgia and historical purposes.
            No financial gain is made in this site. This archive exists solely to keep these experiences
            accessible for nostalgic purpose. All of games metadata (descriptions, developer, publisher, etc)
            retrieved from&nbsp;
            <Link href="https://flashpointarchive.org/" className="underline">BlueMaxima’s Flashpoint Archive</Link>,
            most of games file also retrieved from that
            site, while others retrieved from other flash game preservation site or game developer/publisher site.
            Icons used in this site retrieved from&nbsp;
            <Link href="https://www.svgrepo.com/" className="underline">SVG Repo</Link>.
            Flash emulator used for emulating all flash games here is&nbsp;
            <Link href="https://ruffle.rs/" className="underline">Ruffle</Link>.
            If you are a copyright holder of contents or tool that’s used in this
            site, and wish to remove it from here or it’s violating copyright laws, please contact me
            (see Contact section) and i will comply and take action accordingly.</p>
        </div>
        <div className="flex flex-col space-y-6" id="privacy-policy">
          <h2 className="text-3xl">Privacy Policy</h2>
          <div className="text-xl flex flex-col gap-2">
            <p>
              Your privacy is important to us. This website does not collect, store, or track any personal data. 
              We do not use cookies, trackers, or any form of analytics that would identify or monitor visitors.
            </p>
            <p>The “Favorite Games” feature is entirely local to your device. It uses&nbsp;
              <Link href="https://javascript.info/indexeddb" className="underline">IndexedDB</Link>&nbsp; 
              to save your favorite games directly in your browser. These favorites are never sent to any server 
              and not accessed by us or anyone else. If you wish to remove your saved favorites, simply clear 
              the website data from your browser settings.
            </p>
            <p>
              We are committed to keeping your experience private and secure.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-6" id="contact">
          <h2 className="text-3xl">Contact</h2>
          <div className="flex flex-col text-xl">
            <p>
              Email:{" "}
              <a href="mailto:bandung2003@gmail.com" className="underline">bandung2003@gmail.com</a>
            </p>
            <p>Also check out my personal site:
              <Link href="https://dta32.my.id" className="underline">https://dta32.my.id</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
