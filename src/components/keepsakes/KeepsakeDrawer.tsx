import type { LovesContent } from "@/lib/types";
import { KeepsakeItem } from "./KeepsakeItem";

/** "Things I Couldn't Throw Away": a wooden tray lined with paper. */
export function KeepsakeDrawer({ drawer }: { drawer: LovesContent["drawer"] }) {
  const hasSamples = drawer.keepsakes.some((k) => k.isPlaceholder);
  return (
    <article aria-labelledby="drawer-title">
      <div className="mx-auto max-w-[62ch] text-center">
        <p className="font-hand text-[1.7rem] leading-none text-terracotta" aria-hidden="true">
          open the drawer ↓
        </p>
        <h3 id="drawer-title" className="mt-1 font-serif text-4xl text-forest sm:text-5xl">
          {drawer.title}
        </h3>
        <p className="mt-3 text-lg text-ink">{drawer.intro}</p>
      </div>

      {/* The drawer: wood frame, inner lining, a little brass pull */}
      <div className="relative mx-auto mt-10 max-w-5xl">
        <div className="relative border-[10px] border-brown bg-brown p-0 shadow-lift sm:border-[14px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[10px] opacity-30 mix-blend-multiply [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_18px,rgb(55_52_47/0.25)_18px,rgb(55_52_47/0.25)_19px)] sm:-inset-[14px]"
          />
          <ul className="relative grid grid-cols-2 bg-[color-mix(in_srgb,var(--sage)_28%,var(--paper))] shadow-[inset_0_6px_14px_rgb(55_52_47/0.35)] sm:grid-cols-3 lg:grid-cols-4">
            {drawer.keepsakes.map((item) => (
              <KeepsakeItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <span
          aria-hidden="true"
          className="absolute -bottom-4 left-1/2 h-4 w-24 -translate-x-1/2 rounded-b-full bg-ink/70 shadow-paper"
        />
      </div>
      {hasSamples && (
        <p className="mt-8 text-center font-hand text-xl text-ink">
          Items marked “sample” are stand-ins until the real keepsakes and their stories are added.
        </p>
      )}
    </article>
  );
}
