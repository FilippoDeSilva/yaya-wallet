"use client";
import React from "react";

type Tx = {
  id: string;
  sender: { name: string; account: string };
  receiver: { name: string; account: string };
  amount_with_currency: string;
  amount: number;
  currency: string;
  cause: string;
  created_at_time: number;
  is_topup: boolean;
  is_outgoing_transfer: boolean;
};

interface TransactionsTableProps {
  txs: Tx[];
  currentAccount: string;
  loading?: boolean;
}

export default function TransactionsTable({ txs, currentAccount, loading = false }: TransactionsTableProps) {
  const skeletonRows: null[] = Array.from({ length: 15 }).map(() => null);
  const displayedRows: (Tx | null)[] = loading ? skeletonRows : txs;

  return (
    <>
      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="min-w-[700px] w-full table-fixed text-xs sm:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="p-2 sm:p-3 text-left w-32 sm:w-40">Txn ID</th>
              <th className="p-2 sm:p-3 text-left w-24 sm:w-32">Sender</th>
              <th className="p-2 sm:p-3 text-left w-24 sm:w-32">Receiver</th>
              <th className="p-2 sm:p-3 text-right w-16 sm:w-24">Amount</th>
              <th className="p-2 sm:p-3 text-left w-16 sm:w-20">Currency</th>
              <th className="p-2 sm:p-3 text-left w-24 sm:w-32">Cause</th>
              <th className="p-2 sm:p-3 text-left w-28 sm:w-40">Created At</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((t, i) => {
              if (t === null) {
                return (
                  <tr key={i} className="border-b dark:border-slate-700 animate-pulse">
                    <td colSpan={7} className="p-2 sm:p-3">
                      <div className="flex gap-2 sm:gap-4 items-center">
                        <div className="h-4 w-16 sm:w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-4 w-12 sm:w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-4 w-12 sm:w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-4 w-10 sm:w-16 bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
                        <div className="h-4 w-8 sm:w-12 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-4 w-16 sm:w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-4 w-20 sm:w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                      </div>
                    </td>
                  </tr>
                );
              }
              // t is Tx
              const id = t.id;
              const senderName = t.sender?.name || t.sender?.account || "—";
              const receiverName = t.receiver?.name || t.receiver?.account || "—";
              const amount = t.amount_with_currency || t.amount;
              const currency = t.currency || "—";
              const cause = t.cause || "—";
              const createdAt = t.created_at_time ? new Date(t.created_at_time * 1000).toLocaleString() : "—";
              const isTopup = t.sender?.account === t.receiver?.account;
              const incoming = isTopup || receiverName === currentAccount;

              return (
                <tr
                  key={id}
                  className={`border-b dark:border-slate-700 transition hover:bg-sky-50/50 dark:hover:bg-sky-900/20 ${
                    incoming ? "bg-green-50/50 dark:bg-green-900/20" : ""
                  }`}
                >
                  <td className="p-2 sm:p-3 break-all max-w-xs text-xs text-slate-400 font-mono">{id}</td>
                  <td className="p-2 sm:p-3 font-semibold">{senderName}</td>
                  <td className="p-2 sm:p-3 font-semibold">{receiverName}</td>
                  <td className={`p-2 sm:p-3 text-right font-bold ${incoming ? "text-green-600" : "text-red-600"}`}>{amount}</td>
                  <td className="p-2 sm:p-3">{currency}</td>
                  <td className="p-2 sm:p-3">{cause}</td>
                  <td className="p-2 sm:p-3 text-xs">{createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="md:hidden">
        {displayedRows.map((t, i) => {
          if (t === null) {
            return (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow mb-4 p-4 animate-pulse">
                <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              </div>
            );
          }
          // t is Tx
          const id = t.id;
          const senderName = t.sender?.name || t.sender?.account || "—";
          const receiverName = t.receiver?.name || t.receiver?.account || "—";
          const amount = t.amount_with_currency || t.amount;
          const currency = t.currency || "—";
          const cause = t.cause || "—";
          const createdAt = t.created_at_time ? new Date(t.created_at_time * 1000).toLocaleString() : "—";
          const isTopup = t.sender?.account === t.receiver?.account;
          const incoming = isTopup || receiverName === currentAccount;

          return (
            <div
              key={id}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow mb-4 p-4 flex flex-col gap-2 ${
                incoming ? "bg-green-50/50 dark:bg-green-900/20" : ""
              }`}
            >
              <div className="text-xs font-mono text-slate-400 break-all">Txn ID: {id}</div>
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Sender: {senderName}</div>
                  <div className="font-semibold text-slate-900 dark:text-white">Receiver: {receiverName}</div>
                </div>
                <div className={`font-bold text-lg ${incoming ? "text-green-600" : "text-red-600"}`}>{amount}</div>
              </div>
              <div className="flex gap-2 text-xs text-slate-500 mt-1">
                <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{currency}</span>
                <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{cause}</span>
              </div>
              <div className="text-xs text-slate-500">Created At: {createdAt}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
