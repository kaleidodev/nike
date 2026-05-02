"use client";

import { useState } from "react";

type ReportData = {
  date: string;
  count: string;
  up: boolean;
  delta: string;
  selectable: boolean;
};

const initialReportData: ReportData[] = [
  { date: "02/15/2021", count: "3 Reports to view", up: true, delta: "12.5%", selectable: true },
  { date: "02/16/2021", count: "2 Reports to view", up: false, delta: "4.5%", selectable: false },
  { date: "02/17/2021", count: "15 Reports to view", up: true, delta: "12.5%", selectable: true },
  { date: "02/18/2021", count: "20 Reports to view", up: true, delta: "12.5%", selectable: true },
  { date: "02/19/2021", count: "3 Reports to view", up: true, delta: "12.5%", selectable: false },
  { date: "02/20/2021", count: "8 Reports to view", up: false, delta: "4.5%", selectable: true },
  { date: "02/21/2021", count: "15 Reports to view", up: false, delta: "4.5%", selectable: true },
  { date: "02/22/2021", count: "20 Reports to view", up: false, delta: "4.5%", selectable: true },
  { date: "02/23/2021", count: "5 Reports to view", up: true, delta: "12.5%", selectable: false },
  { date: "02/24/2021", count: "2 Reports to view", up: true, delta: "12.5%", selectable: true },
  { date: "02/25/2021", count: "18 Reports to view", up: true, delta: "12.5%", selectable: true },
  { date: "02/26/2021", count: "20 Reports to view", up: true, delta: "12.5%", selectable: true },
  { date: "02/27/2021", count: "7 Reports to view", up: false, delta: "4.6%", selectable: false },
  { date: "02/28/2021", count: "2 Reports to view", up: true, delta: "12.5%", selectable: true },
  { date: "03/01/2021", count: "22 Reports to view", up: true, delta: "12.5%", selectable: true },
];

const historyBars = [
  { month: "Jan", expense: 66, profit: 50 },
  { month: "Feb", expense: 58, profit: 44 },
  { month: "Mar", expense: 52, profit: 38 },
  { month: "Apr", expense: 62, profit: 46 },
  { month: "May", expense: 54, profit: 40 },
  { month: "Jun", expense: 64, profit: 48 },
];

const products = [
  {
    name: "Nike Air Shoes",
    value: "$2540",
    delta: "8.5%",
    up: true,
    color: "bg-[#5b3df5]",
    size: "h-[110px] w-[110px] left-[6px] top-4",
  },
  {
    name: "Running Hat",
    value: "$923",
    delta: "4.5%",
    up: false,
    color: "bg-[#10b981]",
    size: "h-[76px] w-[76px] right-4 top-1",
  },
  {
    name: "Logo T-shirt",
    value: "$523",
    delta: "1.6%",
    up: true,
    color: "bg-[#e879a8]",
    size: "h-[68px] w-[68px] right-[22px] bottom-[6px]",
  },
];

export function HistoricalReportPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["02/15/2021"]));

  const selectableItems = initialReportData.filter(d => d.selectable);
  const selectableSet = new Set(selectableItems.map(d => d.date));
  const allSelectableSelected = selectableItems.length > 0 && selectableItems.every(d => selected.has(d.date));
  const someSelected = selectableItems.some(d => selected.has(d.date));

  const toggleRow = (date: string) => {
    if (!selectableSet.has(date)) return;
    const newSelected = new Set(selected);
    if (newSelected.has(date)) newSelected.delete(date);
    else newSelected.add(date);
    setSelected(newSelected);
  };

  const toggleAll = () => {
    if (allSelectableSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(selectableItems.map(d => d.date)));
    }
  };

  return (
    <>
      <section className="rounded-xl border border-[#e8e8ec] bg-white p-[18px]">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M2 11l3-4 3 2.5 3-5 2 2"
                stroke="#5b3df5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div className="text-[13px] font-semibold">Sales Analysis</div>
              <div className="text-[11px] text-[#aaa]">
                Shows data for selected timeframe
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-[5px] text-[10px] text-[#aaa]">
                <div className="h-2 w-2 rounded-sm bg-[#e0ddf8]"></div>Expenses
              </div>
              <div className="flex items-center gap-[5px] text-[10px] text-[#aaa]">
                <div className="h-2 w-2 rounded-sm bg-[#5b3df5]"></div>Profit
              </div>
            </div>
            <div className="rounded-[7px] border border-[#e0e0e6] px-[10px] py-[6px] text-[11px] text-[#444]">
              Last 6 Monthly
            </div>
          </div>
        </div>
        <div className="flex h-[100px] items-end gap-[6px] sm:h-[120px]">
          {historyBars.map((item) => (
            <div key={item.month} className="flex flex-1 flex-col items-center">
              <div className="flex h-full items-end gap-[2px]">
                <div
                  className="w-[18px] rounded-t bg-[#e0ddf8]"
                  style={{ height: `${item.expense}px` }}
                />
                <div
                  className="w-[18px] rounded-t bg-[#5b3df5]"
                  style={{ height: `${item.profit}px` }}
                />
              </div>
              <div className="mt-1 text-[10px] text-[#aaa]">{item.month}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[10px] bg-[#f7f7fa] px-4 py-3">
            <div className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5"
                  stroke="#aaa"
                  strokeWidth="1.3"
                />
                <path
                  d="M6.5 4v2.5l1.5 1"
                  stroke="#aaa"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[11px] font-medium text-[#888]">
                Expenses
              </span>
            </div>
            <div className="mt-1 text-[22px] font-bold tracking-[-0.5px] text-[#111]">
              $16,790
              <span className="text-[13px] font-normal text-[#999]">.50</span>
            </div>
          </div>
          <div className="rounded-[10px] bg-[#f7f7fa] px-4 py-3">
            <div className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M2 8l3-3 2 2 3-4"
                  stroke="#aaa"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 3h2v2"
                  stroke="#aaa"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[11px] font-medium text-[#888]">
                Revenue
              </span>
            </div>
            <div className="mt-1 text-[22px] font-bold tracking-[-0.5px] text-[#111]">
              $24,790
              <span className="text-[13px] font-normal text-[#999]">.50</span>
            </div>
          </div>
          <div className="rounded-[10px] bg-[#f7f7fa] px-4 py-3">
            <div className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5"
                  stroke="#aaa"
                  strokeWidth="1.3"
                />
                <path
                  d="M4.5 8.5c0-1.1.9-2 2-2s2 .9 2 2M6.5 4.5v.5"
                  stroke="#aaa"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[11px] font-medium text-[#888]">
                Profit
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="text-[22px] font-bold tracking-[-0.5px] text-[#111]">
                $8,000
                <span className="text-[13px] font-normal text-[#999]">.00</span>
              </div>
              <span className="rounded-[20px] bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                47.6%
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#e8e8ec] bg-white p-[18px]">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M2 12l3-5 3 3 3-6 2 2"
                stroke="#5b3df5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div className="text-[13px] font-semibold">Product Trends</div>
              <div className="text-[11px] text-[#aaa]">
                Select a product to view sales trends over the selected
                timeframe
              </div>
            </div>
          </div>
          <div className="self-start rounded-[7px] border border-[#e0e0e6] px-[10px] py-[6px] text-[11px] text-[#444] sm:self-auto">
            Last 3 Months
          </div>
        </div>
        <div className="flex gap-0">
          <div className="flex flex-col-reverse justify-between text-[10px] text-[#bbb] w-8 text-right pr-1.5 pb-[22px] flex-shrink-0">
            <span>0</span>
            <span>500</span>
            <span>1000</span>
            <span>1500</span>
            <span>2000</span>
          </div>
          <div className="flex-1 min-w-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 300 140"
              className="h-[140px] w-full"
              role="img"
              aria-label="Product trends line chart"
              preserveAspectRatio="none"
            >
              <path
                d="M 10 80 Q 75 60 150 70 T 290 40"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 10 65 Q 75 85 150 75 T 290 65"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 10 95 Q 75 105 150 85 T 290 75"
                fill="none"
                stroke="#5b3df5"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 10 110 Q 75 120 150 105 T 290 95"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="flex justify-between text-[10px] text-[#bbb]">
              <span>January</span>
              <span>February</span>
              <span>March</span>
            </div>
          </div>
        </div>
        <div className="mt-[10px] flex flex-wrap gap-3 text-[11px] text-[#666] sm:justify-end sm:gap-4">
          <div className="flex items-center gap-[5px]">
            <div className="h-2 w-2 rounded-full bg-[#10b981]"></div>Total
            Reports
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="h-2 w-2 rounded-full bg-[#ef4444]"></div>Nike
            Clothes
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="h-2 w-2 rounded-full bg-[#5b3df5]"></div>Nike Bag
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="h-2 w-2 rounded-full bg-[#374151]"></div>Nike Shoes
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-[#e8e8ec] bg-white">
          <div className="border-b border-[#f0f0f4] px-[18px] py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <svg
                  aria-hidden="true"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <rect
                    x="2"
                    y="2"
                    width="11"
                    height="11"
                    rx="2"
                    stroke="#5b3df5"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M5 5h5M5 7.5h5M5 10h3"
                    stroke="#5b3df5"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <div>
                  <div className="text-[13px] font-semibold">
                    Report Summary
                  </div>
                  <div className="text-[11px] text-[#aaa]">
                    Set date ranges or select a timeframe to view past reports.
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  className="flex h-7 items-center gap-1 rounded-[7px] border border-[#e0e0e6] bg-white px-[10px] text-[11px] text-[#555]"
                >
                  <svg
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 3h8M3 6h6M4 9h4"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Filters
                </button>
                <button
                  type="button"
                  className="h-7 rounded-[7px] border border-[#e0e0e6] bg-white px-[10px] text-[11px] text-[#555]"
                >
                  Category
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full border-collapse text-left text-xs">
              <thead>
                <tr className="text-[10px] font-semibold uppercase tracking-[0.4px] text-[#aaa]">
                  <th className="w-5 px-4 py-3">
                    <button type="button" onClick={toggleAll} className={`inline-flex h-[14px] w-[14px] items-center justify-center rounded-[3px] border-[1.5px] transition-all ${allSelectableSelected ? "border-[#5b3df5] bg-[#5b3df5]" : someSelected ? "border-[#5b3df5] bg-[#f0edff]" : "border-[#d0d0d8] hover:border-[#5b3df5]"} cursor-pointer`}>{allSelectableSelected && <svg aria-hidden="true" width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>}{someSelected && !allSelectableSelected && <svg width="4" height="4" viewBox="0 0 4 4" fill="#5b3df5"/>}</button>
                  </th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Reports</th>
                  <th className="w-5 px-4 py-3"></th>
                  <th className="w-5 px-4 py-3"></th>
                  <th className="px-4 py-3">Profit (Loss)</th>
                </tr>
              </thead>
              <tbody>
                {initialReportData.map((item) => {
                  const isSelected = selected.has(item.date);
                  const isSelectable = item.selectable;
                  return (
                    <tr
                      key={item.date}
                      className={`transition-all ${isSelectable ? "cursor-pointer" : "opacity-60 cursor-not-allowed"} ${isSelected ? "bg-[#f5f3ff]" : "hover:bg-[#fafafa]"}`}
                    >
                      <td className="px-4 py-2">
                        <button type="button" onClick={() => toggleRow(item.date)} disabled={!isSelectable} className={`inline-flex h-[14px] w-[14px] items-center justify-center rounded-[3px] border-[1.5px] transition-all ${isSelected ? "border-[#5b3df5] bg-[#5b3df5]" : isSelectable ? "border-[#d0d0d8] hover:border-[#5b3df5]" : "border-[#d0d0d8]"}`} style={isSelectable ? {} : { opacity: 0.5 }}>
                          {isSelected && (
                            <svg
                              aria-hidden="true"
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              fill="none"
                            >
                              <path
                                d="M1.5 4l2 2 3-3"
                                stroke="#fff"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                      <td
                        className={`px-4 py-2 ${isSelected ? "font-medium text-[#111]" : ""}`}
                      >
                        {item.date}
                      </td>
                      <td className="px-4 py-2">{item.count}</td>
                      <td className="px-4 py-2">
                        <svg
                          aria-hidden="true"
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                        >
                          <rect
                            x="2"
                            y="1.5"
                            width="9"
                            height="10"
                            rx="1.5"
                            stroke="#bbb"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M4.5 5h4M4.5 7h4M4.5 9h2"
                            stroke="#bbb"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </td>
                      <td className="px-4 py-2">
                        <svg
                          aria-hidden="true"
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                        >
                          <ellipse
                            cx="6.5"
                            cy="6.5"
                            rx="4"
                            ry="4"
                            stroke="#bbb"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M4.5 6.5l1.5 1.5 2.5-2.5"
                            stroke="#bbb"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </td>
                      <td
                        className={`px-4 py-2 text-[11px] font-semibold ${item.up ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {item.up ? (
                          <svg
                            aria-hidden="true"
                            className="mb-0.5 inline w-2"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M4 7V1M1.5 3.5L4 1l2.5 2.5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            aria-hidden="true"
                            className="mb-0.5 inline w-2"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M4 1v6M1.5 4.5L4 7l2.5-2.5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {item.delta}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-[#f0f0f4] px-[18px] py-3 text-[11px] text-[#aaa]">
            <span>{selected.size} of {selectableItems.length} reports selected</span>
            <div className="flex items-center gap-1">
              <span>The Page you are on</span>
              <input
                type="text"
                readOnly
                value="1"
                className="mx-1 h-[22px] w-7 rounded border border-[#e0e0e6] text-center text-[11px] text-[#444]"
              />
              <button
                type="button"
                className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] border border-[#e0e0e6] bg-white text-[11px] text-[#555] hover:bg-[#f5f5f8]"
              >
                <svg
                  aria-hidden="true"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M6 2L3 5l3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] border border-[#e0e0e6] bg-white text-[11px] text-[#555] hover:bg-[#f5f5f8]"
              >
                <svg
                  aria-hidden="true"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4 2l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#e8e8ec] bg-white p-[18px]">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <rect
                  x="1.5"
                  y="2.5"
                  width="11"
                  height="10"
                  rx="1.5"
                  stroke="#5b3df5"
                  strokeWidth="1.3"
                />
                <path
                  d="M4.5 1.5v2M9.5 1.5v2M1.5 6h11"
                  stroke="#5b3df5"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <div className="text-[13px] font-semibold">02/15/2021</div>
                <div className="text-[11px] text-[#aaa]">Product Breakdown</div>
              </div>
            </div>
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle cx="3" cy="7.5" r="1.2" fill="#bbb" />
              <circle cx="7.5" cy="7.5" r="1.2" fill="#bbb" />
              <circle cx="12" cy="7.5" r="1.2" fill="#bbb" />
            </svg>
          </div>
          <div className="relative my-4 h-[130px] sm:h-[150px]">
            {products.map((p) => (
              <div
                key={p.name}
                className={`absolute flex scale-90 flex-col items-center justify-center rounded-full text-white sm:scale-100 ${p.color} ${p.size}`}
              >
                <div className="font-bold">{p.value}</div>
                <div className="max-w-[80%] text-center text-[9px] leading-tight opacity-90">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            {products.map((p) => (
              <div
                key={p.name}
                className={`flex items-center justify-between rounded-[9px] px-3 py-[10px] text-white ${p.color}`}
              >
                <div className="flex items-center gap-[10px]">
                  <div>
                    <div className="text-[10px] font-semibold opacity-90">
                      {p.delta}
                    </div>
                    <div className="text-[9px] opacity-60">Compare 3 days</div>
                  </div>
                  <div className="text-xs font-medium">{p.name}</div>
                </div>
                <span>{p.up ? "⌃" : "⌄"}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
