"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type ActiveNav = "sale" | "history";

const pageMeta: Record<string, { active: ActiveNav; breadcrumb: string[] }> = {
  "/": { active: "sale", breadcrumb: ["Reports", "Sale Report"] },
  "/historical-report": {
    active: "history",
    breadcrumb: ["Reports", "Sale Report", "Historical Report"],
  },
};

function Sidebar({ active }: { active: ActiveNav }) {
  return (
    <aside className="hidden w-[220px] shrink-0 border-r border-[#e8e8ec] bg-white lg:flex lg:flex-col">
      <div className="border-b border-[#f0f0f4] px-[18px] py-5">
        <div className="flex items-center gap-[10px]">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#111] text-xs font-bold text-white">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 13L8 3l5 10"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 9.5h5"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold tracking-[-0.3px]">
              NikeRetail
            </div>
            <div className="text-[10px] text-[#999]">Chicago 2nd Store</div>
          </div>
        </div>
      </div>
      <div className="flex cursor-pointer items-center gap-[10px] border-b border-[#f0f0f4] px-4 py-3 hover:bg-[#fafafa]">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8e4ff] text-[11px] font-semibold text-[#5b3df5]">
          SD
        </div>
        <div>
          <div className="text-xs font-semibold">Simon Dai</div>
          <div className="text-[10px] text-[#999]">Sales Manager</div>
        </div>
        <svg aria-hidden="true" style={{ marginLeft: "auto" }} width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-[10px] text-[12.5px]">
        <div className="px-[10px] pt-[10px] pb-1 text-[10px] font-semibold uppercase tracking-[0.8px] text-[#aaa]">
          Main
        </div>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="5"
              height="5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="9"
              y="2"
              width="5"
              height="5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="2"
              y="9"
              width="5"
              height="5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="9"
              y="9"
              width="5"
              height="5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          Dashboard
        </div>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 2a4 4 0 1 1 0 8A4 4 0 0 1 8 2z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M2 14c0-2.2 2.7-4 6-4s6 1.8 6 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Customers Statics
        </div>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 12V7M6 12V5M9 12V8M12 12V3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Daily Sale
        </div>

        <div className="px-[10px] pt-[10px] pb-1 text-[10px] font-semibold uppercase tracking-[0.8px] text-[#aaa]">
          Management
        </div>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="12"
              height="3"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="2"
              y="7"
              width="12"
              height="3"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="2"
              y="12"
              width="7"
              height="2"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          Product Management
          <span className="ml-auto text-[10px] text-[#bbb]">›</span>
        </div>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2 4h12M4 4V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1M5 8h6M5 11h4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <rect
              x="2"
              y="4"
              width="12"
              height="9"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          Order Management
        </div>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2 10l3-3 3 2 3-4 3 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Sales Management
          <span className="ml-auto text-[10px] text-[#bbb]">›</span>
        </div>

        <div className="px-[10px] pt-[10px] pb-1 text-[10px] font-semibold uppercase tracking-[0.8px] text-[#aaa]">
          Reports
        </div>
        <Link
          href="/"
          className={
            active === "sale"
              ? "flex items-center gap-2 rounded-[7px] bg-[#f0edff] px-[10px] py-2 font-medium text-[#5b3df5]"
              : "flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]"
          }
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="12"
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M5 8h6M5 5h6M5 11h3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Sale Report
          <span className="ml-auto rounded-[10px] bg-[#5b3df5] px-[6px] py-px text-[9px] font-semibold text-white">
            3
          </span>
        </Link>
        <Link
          href="/historical-report"
          className={active === "history" ? "block rounded-[7px] py-[6px] pl-9 pr-[10px] text-xs font-medium text-[#5b3df5]" : "block rounded-[7px] py-[6px] pl-9 pr-[10px] text-xs text-[#777] hover:bg-[#f5f5f8] hover:text-[#111]"}
        >
          Historical Report
        </Link>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 2v4M8 10v4M2 8h4M10 8h4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle
              cx="8"
              cy="8"
              r="2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          Leaderboards
        </div>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M8 5v3l2 1.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Supplier Management
        </div>
        <div className="flex items-center gap-2 rounded-[7px] px-[10px] py-2 text-[#555] hover:bg-[#f5f5f8]">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 5h10M3 8h7M3 11h5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          User Analytics
        </div>
      </nav>
      <div className="border-t border-[#f0f0f4] px-4 py-3 text-xs text-[#888]">
        <div className="flex items-center gap-2">
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <circle
              cx="7"
              cy="7"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M7 6v4M7 4.5v .5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          Help & Support
        </div>
        <div className="mt-2 flex items-center gap-2">
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="10"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M4 7h6M7 4v6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          Customizable folders
        </div>
      </div>
    </aside>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { active, breadcrumb } = pageMeta[pathname] ?? pageMeta["/"];

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#111]">
      <div className="flex min-h-screen">
        <Sidebar active={active} />
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center border-b border-[#e8e8ec] bg-white px-6">
            <div className="flex items-center gap-1 text-xs text-[#aaa]">
              {breadcrumb.map((item, idx) => (
                <div key={item} className="flex items-center gap-1">
                  {idx > 0 && (
                    <svg
                      aria-hidden="true"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M4 3l3 3-3 3"
                        stroke="#ccc"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  <span
                    className={
                      idx === breadcrumb.length - 1
                        ? "font-medium text-[#111]"
                        : ""
                    }
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                className="flex h-8 items-center gap-2 rounded-[7px] border border-[#e0e0e6] bg-white px-[14px] text-xs"
              >
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7 2v7M4 6l3 3 3-3M2 10v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                Export
              </button>
              <button
                type="button"
                className="flex h-8 items-center gap-2 rounded-[7px] border border-[#111] bg-[#111] px-[14px] text-xs text-white"
              >
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M9 2H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4l3-3V3a1 1 0 0 0-1-1z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M9 2v3h3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                Share
              </button>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 md:p-6">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
