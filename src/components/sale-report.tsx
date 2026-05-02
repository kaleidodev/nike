"use client";

import { type ReactNode, useMemo, useState } from "react";

type Status = "Complete" | "Continue" | "Restitute" | "Canceled";
type PayMethod = "Credit Card" | "Bank Transfer" | "Paypal";
type TabType = "All Sales" | "Completed" | "Continuing" | "Restitute" | "Canceled";

interface SaleRow {
  id: string; selected?: boolean;
  customer: string; order: string; date: string;
  price: string; status: Status; payment: PayMethod;
}

const initialRows: SaleRow[] = [
  { id: "AKN 12508", customer: "John Doe", order: "Nike Tshirt", date: "02.04.2022", price: "$24.90", status: "Complete", payment: "Credit Card" },
  { id: "AKN 12508", customer: "John Doe", order: "Nike Tshirt", date: "02.04.2022", price: "$24.90", status: "Complete", payment: "Credit Card" },
  { id: "AKN 12508", customer: "John Doe", order: "Nike Tshirt", date: "02.04.2022", price: "$24.90", status: "Complete", payment: "Credit Card" },
  { id: "ABL 22569", customer: "Simon Dai", order: "Nike Hat", date: "02.04.2022", price: "$35.99", status: "Restitute", payment: "Bank Transfer", selected: true },
  { id: "TTS 90821", customer: "Henry Marina", order: "Nike Glove", date: "02.04.2022", price: "$18.07", status: "Continue", payment: "Paypal" },
  { id: "TTS 90821", customer: "Henry Marina", order: "Nike Glove", date: "02.04.2022", price: "$18.07", status: "Continue", payment: "Paypal" },
  { id: "TTS 90821", customer: "Henry Marina", order: "Nike Glove", date: "02.04.2022", price: "$18.07", status: "Complete", payment: "Credit Card" },
  { id: "TTS 90821", customer: "Henry Marina", order: "Nike Glove", date: "02.04.2022", price: "$18.07", status: "Continue", payment: "Bank Transfer" },
  { id: "MNK 33041", customer: "Lisa Chen", order: "Nike Air Max", date: "03.04.2022", price: "$89.99", status: "Complete", payment: "Credit Card" },
  { id: "MNK 33042", customer: "James Park", order: "Nike Running", date: "03.04.2022", price: "$64.50", status: "Canceled", payment: "Paypal" },
];

const statusStyle: Record<Status, string> = {
  Complete: "bg-[#e6f9f0] text-[#0d9e5e]",
  Continue: "bg-[#e8f0ff] text-[#3b6ff5]",
  Restitute: "bg-[#fff4e6] text-[#e07d10]",
  Canceled: "bg-[#fff0f0] text-[#e53935]",
};

const payIcon: Record<PayMethod, ReactNode> = {
  "Credit Card": <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="2.5" width="9" height="6.5" rx="1.2" stroke="#aaa" strokeWidth="1.1"/><path d="M1 5h9" stroke="#aaa" strokeWidth="1.1"/></svg>,
  "Bank Transfer": <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 8.5V5l4-3 4 3v3.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" stroke="#aaa" strokeWidth="1.1"/></svg>,
  "Paypal": <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#aaa" strokeWidth="1.1"/><path d="M3.5 5.5h4" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round"/></svg>,
};

const barDataMap: Record<string, Array<{ label: string; sub: string; ex: number; pr: number }>> = {
  Monthly: [
    { label: "Aug", sub: "26k", ex: 34, pr: 26 },
    { label: "Sep", sub: "60k", ex: 48, pr: 36 },
    { label: "Oct", sub: "15k", ex: 26, pr: 18 },
    { label: "Nov", sub: "90k", ex: 60, pr: 46 },
    { label: "Dec", sub: "65k", ex: 54, pr: 40 },
  ],
  Weekly: [
    { label: "Mon", sub: "12k", ex: 18, pr: 14 },
    { label: "Tue", sub: "18k", ex: 26, pr: 20 },
    { label: "Wed", sub: "22k", ex: 32, pr: 24 },
    { label: "Thu", sub: "28k", ex: 40, pr: 30 },
    { label: "Fri", sub: "35k", ex: 50, pr: 38 },
  ],
  Daily: [
    { label: "8am", sub: "2k", ex: 8, pr: 6 },
    { label: "12pm", sub: "5k", ex: 18, pr: 14 },
    { label: "4pm", sub: "8k", ex: 28, pr: 22 },
    { label: "8pm", sub: "12k", ex: 42, pr: 32 },
    { label: "12am", sub: "6k", ex: 22, pr: 16 },
  ],
};

const attachments = [
  { name: "sale-report-feb-2022.pdf", size: "2.4 MB", date: "02.28.2022", type: "pdf" },
  { name: "invoice-AKN12508.xlsx", size: "540 KB", date: "02.15.2022", type: "xlsx" },
  { name: "customer-export.csv", size: "128 KB", date: "02.10.2022", type: "csv" },
  { name: "receipts-feb.zip", size: "8.1 MB", date: "02.28.2022", type: "zip" },
];

export function SaleReportPage() {
  const [activeTab, setActiveTab] = useState<TabType>("All Sales");
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [periodType, setPeriodType] = useState("Monthly");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const [filterPayment, setFilterPayment] = useState<PayMethod | "">("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [appliedStatus, setAppliedStatus] = useState<Status | "">("");
  const [appliedPayment, setAppliedPayment] = useState<PayMethod | "">("");
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);

  const tabs: TabType[] = ["All Sales", "Completed", "Continuing", "Restitute", "Canceled"];
  const barData = barDataMap[periodType] || barDataMap.Monthly;

  const filteredRows = useMemo(() => {
    let result = rows;
    if (activeTab !== "All Sales") {
      const statusMap: Record<string, Status> = { Continuing: "Continue", ...Object.fromEntries(tabs.slice(1).map(t => [t, t as Status])) };
      result = result.filter(r => r.status === statusMap[activeTab]);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(r => r.id.toLowerCase().includes(term) || r.customer.toLowerCase().includes(term) || r.order.toLowerCase().includes(term));
    }
    if (appliedStatus) result = result.filter(r => r.status === appliedStatus);
    if (appliedPayment) result = result.filter(r => r.payment === appliedPayment);
    return result;
  }, [rows, activeTab, searchTerm, appliedStatus, appliedPayment]);

  const itemsPerPage = 10;
  const paginatedRows = filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const allChecked = paginatedRows.length > 0 && paginatedRows.every(r => r.selected);
  const someChecked = paginatedRows.some(r => r.selected);

  const handleToggleRow = (idx: number) => {
    const actualIdx = rows.indexOf(paginatedRows[idx]);
    setRows(rows.map((r, i) => i === actualIdx ? { ...r, selected: !r.selected } : r));
  };

  const handleToggleAll = () => {
    const paginatedIndices = paginatedRows.map(r => rows.indexOf(r));
    if (allChecked) {
      setRows(rows.map((r, i) => paginatedIndices.includes(i) ? { ...r, selected: false } : r));
    } else {
      setRows(rows.map((r, i) => paginatedIndices.includes(i) ? { ...r, selected: true } : r));
    }
  };

  return (
    <>
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#e8e8ec] bg-white p-4 sm:p-5 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:p-6">
        <div>
          <div className="mb-[5px] flex items-center gap-2 text-[17px] font-bold text-[#111]">
            Sale Report
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#d8d8e0"/></svg>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="#ccc" strokeWidth="1.3"/><path d="M7.5 4.5V8l2 1.5" stroke="#ccc" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="3.5" cy="7.5" r="1.3" fill="#ccc"/><circle cx="7.5" cy="7.5" r="1.3" fill="#ccc"/><circle cx="11.5" cy="7.5" r="1.3" fill="#ccc"/></svg>
          </div>
          <div className="mb-[14px] text-xs text-[#aaa]">February Store &nbsp;·&nbsp; Search for sale ID, customer, order status or something...</div>
          <div className="mb-2 flex items-center text-[34px] font-bold tracking-[-1px] text-[#111]">
            $59,875.25
            <svg style={{ marginLeft: 6 }} width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#d0d0d8" strokeWidth="1.3"/><path d="M8 5v3l2 1.5" stroke="#d0d0d8" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </div>
          <span className="inline-flex items-center gap-[3px] rounded-[20px] bg-[#e6f9f0] px-2 py-px text-[10px] font-semibold text-[#0d9e5e]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            12.4% vs last month
          </span>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="group relative">
            <button type="button" className="flex h-7 items-center gap-[5px] rounded-[7px] border border-[#e0e0e6] bg-white px-[10px] text-[11px] text-[#444] hover:bg-[#f5f5f8]">
              {periodType} <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden w-24 rounded-lg border border-[#e8e8ec] bg-white shadow-lg group-hover:block">
              {["Monthly", "Weekly", "Daily"].map(p => (
                <button key={p} onClick={() => { setPeriodType(p); setCurrentPage(1); }} className={`block w-full px-3 py-2 text-left text-xs ${periodType === p ? "bg-[#f0edff] text-[#5b3df5] font-medium" : "text-[#555] hover:bg-[#f5f5f8]"}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-[5px] sm:flex-nowrap">
            {barData.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1">
                <div className="flex h-[60px] items-end gap-[2px]">
                  <div className="rounded-t-[4px] bg-[#e0ddf8]" style={{ width: 16, height: b.ex }} />
                  <div className="rounded-t-[4px] bg-[#5b3df5]" style={{ width: 16, height: b.pr }} />
                </div>
                <div className="text-center text-[10px] text-[#aaa]">{b.label}<span className="block text-[9px] text-[#bbb]">{b.sub}</span></div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-[5px] text-[10px] text-[#aaa]"><div className="h-2 w-2 rounded-[2px] bg-[#e0ddf8]"/>Expenses</div>
            <div className="flex items-center gap-[5px] text-[10px] text-[#aaa]"><div className="h-2 w-2 rounded-[2px] bg-[#5b3df5]"/>Profit</div>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl border border-[#e8e8ec] bg-white">
        {/* Tabs */}
        <div className="overflow-x-auto border-b border-[#f0f0f4] px-[18px]">
          <div className="flex min-w-max items-center">
          {tabs.map((t) => (
            <button key={t} onClick={() => { setActiveTab(t); setCurrentPage(1); }} className={`cursor-pointer whitespace-nowrap border-b-2 px-4 py-[13px] text-[12.5px] font-medium transition-all ${activeTab === t ? "border-[#5b3df5] text-[#5b3df5]" : "border-transparent text-[#aaa] hover:text-[#555]"}`}>{t}</button>
          ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-2 border-b border-[#f0f0f4] px-[18px] py-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-[400px] md:flex-1">
            <span className="absolute left-[10px] top-1/2 -translate-y-1/2"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#bbb" strokeWidth="1.3"/><path d="M9 9l2.5 2.5" stroke="#bbb" strokeWidth="1.3" strokeLinecap="round"/></svg></span>
            <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="h-8 w-full rounded-[7px] border border-[#e0e0e6] bg-[#f7f7fa] pl-8 pr-3 text-xs text-[#333] outline-none transition-all focus:border-[#5b3df5] focus:bg-white" type="text" placeholder="Search for sale ID, customer, order status or something..."/>
          </div>
          <div className="hidden flex-1 md:block"/>
          <button onClick={() => { setFilterStatus(appliedStatus); setFilterPayment(appliedPayment); setShowFilters(true); }} type="button" className="flex h-8 w-full cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[7px] border border-[#e0e0e6] bg-white px-[13px] text-xs font-medium text-[#444] transition-all hover:bg-[#f5f5f8] md:w-auto md:justify-start">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 4h9M3.5 7h6M5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            Filters{(appliedStatus || appliedPayment) && <span className="ml-[2px] inline-flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#5b3df5] text-[9px] text-white">{[appliedStatus, appliedPayment].filter(Boolean).length}</span>}
          </button>
          <button onClick={() => { setDownloadedFile(null); setShowAttachment(true); }} type="button" className="flex h-8 w-full cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[7px] border border-[#e0e0e6] bg-white px-[13px] text-xs font-medium text-[#444] transition-all hover:bg-[#f5f5f8] md:w-auto md:justify-start">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="2" y="1.5" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 5h4M4.5 7h4M4.5 9h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Attachment
          </button>
          <button type="button" onClick={() => alert(`已导出 ${rows.filter(r => r.selected).length || filteredRows.length} 条数据`)} className="flex h-8 w-full cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[7px] border border-[#111] bg-[#111] px-[13px] text-xs font-medium text-white transition-all hover:bg-[#333] md:w-auto md:justify-start">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v7M3.5 6l3 3 3-3M2 10.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[620px] md:min-w-[760px] lg:min-w-[920px] w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="w-10 pb-[10px] pl-[18px] pt-[10px] text-left"><button type="button" onClick={handleToggleAll} className={`inline-flex h-[14px] w-[14px] cursor-pointer items-center justify-center rounded-[3px] border-[1.5px] transition-all ${allChecked ? "border-[#5b3df5] bg-[#5b3df5]" : someChecked ? "border-[#5b3df5] bg-[#f0edff]" : "border-[#d0d0d8]"}`}>{allChecked && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>}{someChecked && !allChecked && <svg width="4" height="4" viewBox="0 0 4 4" fill="#5b3df5"/>}</button></th>
              <th className="cursor-pointer select-none whitespace-nowrap px-[14px] py-[10px] text-left text-[10px] font-semibold uppercase tracking-[.4px] text-[#aaa] hover:text-[#666]">
                <div className="flex items-center gap-[3px]">Sale ID <svg width="8" height="10" viewBox="0 0 8 10" fill="none"><path d="M4 1v8M1.5 4L4 1l2.5 3" stroke="#5b3df5" strokeWidth="1.2" strokeLinecap="round"/></svg></div>
              </th>
              <th className="cursor-pointer select-none whitespace-nowrap px-[14px] py-[10px] text-left text-[10px] font-semibold uppercase tracking-[.4px] text-[#aaa] hover:text-[#666]">Customer</th>
              <th className="cursor-pointer select-none whitespace-nowrap px-[14px] py-[10px] text-left text-[10px] font-semibold uppercase tracking-[.4px] text-[#aaa] hover:text-[#666]">Order</th>
              <th className="hidden cursor-pointer select-none whitespace-nowrap px-[14px] py-[10px] text-left text-[10px] font-semibold uppercase tracking-[.4px] text-[#aaa] hover:text-[#666] md:table-cell">Delivery Date</th>
              <th className="hidden cursor-pointer select-none whitespace-nowrap px-[14px] py-[10px] text-left text-[10px] font-semibold uppercase tracking-[.4px] text-[#aaa] hover:text-[#666] lg:table-cell">Delivery Pricing</th>
              <th className="cursor-pointer select-none whitespace-nowrap px-[14px] py-[10px] text-left text-[10px] font-semibold uppercase tracking-[.4px] text-[#aaa] hover:text-[#666]">Delivery Status</th>
              <th className="hidden cursor-pointer select-none whitespace-nowrap px-[14px] py-[10px] text-left text-[10px] font-semibold uppercase tracking-[.4px] text-[#aaa] hover:text-[#666] lg:table-cell">Payment Methods</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, idx) => (
              <tr key={idx} className={`cursor-pointer transition-all ${row.selected ? "bg-[#f5f3ff]" : "hover:bg-[#fafafa]"}`}>
                <td className="pl-[18px] py-[11px] border-b border-[#f7f7fa]" style={row.selected ? { borderLeft: "2.5px solid #5b3df5" } : {}}>
                  <button type="button" onClick={() => handleToggleRow(idx)} className={`inline-flex h-[14px] w-[14px] cursor-pointer items-center justify-center rounded-[3px] border-[1.5px] transition-all ${row.selected ? "border-[#5b3df5] bg-[#5b3df5]" : "border-[#d0d0d8] hover:border-[#5b3df5]"}`}>
                    {row.selected && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>}
                  </button>
                </td>
                <td className="border-b border-[#f7f7fa] px-[14px] py-[11px]">
                  <span className={row.selected ? "text-xs font-semibold text-[#5b3df5]" : "text-xs text-[#444]"}>{row.id}</span>
                </td>
                <td className="border-b border-[#f7f7fa] px-[14px] py-[11px]">
                  <span className={`text-xs font-medium ${row.selected ? "text-[#5b3df5]" : "text-[#111]"}`}>{row.customer}</span>
                </td>
                <td className={`border-b border-[#f7f7fa] px-[14px] py-[11px] whitespace-nowrap ${row.selected ? "font-medium text-[#111]" : "text-[#333]"}`}>{row.order}</td>
                <td className={`hidden border-b border-[#f7f7fa] px-[14px] py-[11px] whitespace-nowrap md:table-cell ${row.selected ? "font-medium text-[#111]" : "text-[#333]"}`}>{row.date}</td>
                <td className="hidden border-b border-[#f7f7fa] px-[14px] py-[11px] lg:table-cell">
                  <span className={row.selected ? "text-xs font-semibold text-[#5b3df5]" : "text-xs text-[#444]"}>{row.price}</span>
                </td>
                <td className="border-b border-[#f7f7fa] px-[14px] py-[11px]">
                  <span className={`inline-flex items-center gap-[5px] rounded-[20px] px-[10px] py-[3px] text-[11px] font-medium ${statusStyle[row.status]}`}>
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-current"/>
                    {row.status}
                  </span>
                </td>
                <td className="hidden border-b border-[#f7f7fa] px-[14px] py-[11px] lg:table-cell">
                  <div className="flex items-center gap-[6px]">
                    <span className="inline-flex items-center gap-[5px] rounded-[5px] border border-[#eeeeef] bg-[#f7f7fa] px-2 py-[2px] text-[11px] text-[#555]">
                      {payIcon[row.payment]}{row.payment}
                    </span>
                    {row.selected && <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 10.5l8-8M8 2.5h3v3" stroke="#5b3df5" strokeWidth="1.3" strokeLinecap="round"/></svg>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-2 border-t border-[#f0f0f4] px-[18px] py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[11px] text-[#aaa]">Showing {filteredRows.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredRows.length)} of {filteredRows.length} results</div>
          <div className="flex items-center gap-[5px]">
            <button type="button" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#e0e0e6] bg-white text-[11px] text-[#555] transition-all hover:bg-[#f5f5f8] disabled:cursor-not-allowed disabled:opacity-50"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></button>
            {[...Array(Math.min(3, totalPages))].map((_, i) => (
              <button key={i + 1} type="button" onClick={() => setCurrentPage(i + 1)} className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border text-[11px] transition-all ${currentPage === i + 1 ? "border-[#5b3df5] bg-[#5b3df5] text-white" : "border-[#e0e0e6] bg-white text-[#555] hover:bg-[#f5f5f8]"}`}>{i + 1}</button>
            ))}
            {totalPages > 3 && <span className="px-[3px] text-xs text-[#ccc]">···</span>}
            {totalPages > 3 && <button type="button" onClick={() => setCurrentPage(totalPages)} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#e0e0e6] bg-white text-[11px] text-[#555] hover:bg-[#f5f5f8]">{totalPages}</button>}
            <button type="button" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#e0e0e6] bg-white text-[11px] text-[#555] transition-all hover:bg-[#f5f5f8] disabled:cursor-not-allowed disabled:opacity-50"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg></button>
          </div>
        </div>
      </div>
    </div>

    {/* Filters Modal */}
    {showFilters && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setShowFilters(false)}>
        <div className="max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-[340px] overflow-y-auto rounded-xl border border-[#e8e8ec] bg-white shadow-xl" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-[#f0f0f4] px-5 py-4">
            <span className="text-[13px] font-semibold text-[#111]">Filter Orders</span>
            <button onClick={() => setShowFilters(false)} className="text-[#bbb] hover:text-[#555]"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
          </div>
          <div className="flex flex-col gap-4 px-5 py-4">
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.4px] text-[#aaa]">Delivery Status</div>
              <div className="flex flex-wrap gap-2">
                {(["", "Complete", "Continue", "Restitute", "Canceled"] as const).map(s => (
                  <button key={s || "all"} onClick={() => setFilterStatus(s)} className={`rounded-[20px] px-3 py-[4px] text-xs font-medium transition-all ${filterStatus === s ? "bg-[#5b3df5] text-white" : "border border-[#e0e0e6] text-[#555] hover:bg-[#f5f5f8]"}`}>{s || "All"}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.4px] text-[#aaa]">Payment Method</div>
              <div className="flex flex-wrap gap-2">
                {(["", "Credit Card", "Bank Transfer", "Paypal"] as const).map(p => (
                  <button key={p || "all"} onClick={() => setFilterPayment(p)} className={`rounded-[20px] px-3 py-[4px] text-xs font-medium transition-all ${filterPayment === p ? "bg-[#5b3df5] text-white" : "border border-[#e0e0e6] text-[#555] hover:bg-[#f5f5f8]"}`}>{p || "All"}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.4px] text-[#aaa]">Date Range</div>
              <div className="flex items-center gap-2">
                <input type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} className="flex-1 rounded-[7px] border border-[#e0e0e6] px-2 py-[5px] text-xs text-[#333] outline-none focus:border-[#5b3df5]"/>
                <span className="text-[#bbb] text-xs">–</span>
                <input type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} className="flex-1 rounded-[7px] border border-[#e0e0e6] px-2 py-[5px] text-xs text-[#333] outline-none focus:border-[#5b3df5]"/>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-[#f0f0f4] px-5 py-3">
            <button onClick={() => { setFilterStatus(""); setFilterPayment(""); setFilterDateFrom(""); setFilterDateTo(""); }} className="flex-1 rounded-[7px] border border-[#e0e0e6] py-[7px] text-xs font-medium text-[#555] hover:bg-[#f5f5f8]">Reset</button>
            <button onClick={() => { setAppliedStatus(filterStatus); setAppliedPayment(filterPayment); setCurrentPage(1); setShowFilters(false); }} className="flex-1 rounded-[7px] bg-[#5b3df5] py-[7px] text-xs font-medium text-white hover:bg-[#4a2ee0]">Apply Filters</button>
          </div>
        </div>
      </div>
    )}

    {/* Attachment Modal */}
    {showAttachment && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setShowAttachment(false)}>
        <div className="max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-[380px] overflow-y-auto rounded-xl border border-[#e8e8ec] bg-white shadow-xl" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-[#f0f0f4] px-5 py-4">
            <span className="text-[13px] font-semibold text-[#111]">Attachments <span className="ml-1 rounded-full bg-[#f0edff] px-2 py-px text-[10px] text-[#5b3df5]">{attachments.length}</span></span>
            <button onClick={() => setShowAttachment(false)} className="text-[#bbb] hover:text-[#555]"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
          </div>
          <div className="flex flex-col divide-y divide-[#f7f7fa] px-5">
            {attachments.map(f => (
              <div key={f.name} className="flex items-center gap-3 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0edff] text-[10px] font-bold uppercase text-[#5b3df5]">{f.type}</div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-xs font-medium text-[#111]">{f.name}</div>
                  <div className="text-[10px] text-[#aaa]">{f.size} · {f.date}</div>
                </div>
                <button onClick={() => setDownloadedFile(f.name)} className={`flex h-7 items-center gap-[5px] rounded-[6px] px-3 text-[11px] font-medium transition-all ${downloadedFile === f.name ? "bg-[#e6f9f0] text-[#0d9e5e]" : "border border-[#e0e0e6] text-[#555] hover:bg-[#f5f5f8]"}`}>
                  {downloadedFile === f.name ? <><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 6l2.5 2.5L9 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Saved</> : <><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 2v5M3 5.5l2.5 2.5 2.5-2.5M2 9h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Download</>}
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-[#f0f0f4] px-5 py-3 text-[10px] text-[#bbb]">February 2022 · Sale Report Documents</div>
        </div>
      </div>
    )}
    </>
  );
}
