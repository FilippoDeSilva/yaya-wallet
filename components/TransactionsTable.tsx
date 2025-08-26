// // components/TransactionsTable.tsx
// import type { Transaction } from "@/types/transactions";

// function directionOf(t: Transaction, myAccount: string | null): "incoming" | "outgoing" | "topup" {
//   if (t.sender === t.receiver) return "topup";
//   if (!myAccount) return "outgoing";
//   return t.receiver === myAccount ? "incoming" : "outgoing";
// }

// export default function TransactionsTable({
//   data,
//   myAccount,
// }: {
//   data?: Transaction[];
//   myAccount: string | null;
// }) {
//   if (!data) data = [];

//   return (
//     <div className="overflow-x-auto rounded-xl border">
//       <table className="min-w-full divide-y">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Direction</th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">ID</th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Sender</th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Receiver</th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Amount</th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Currency</th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Cause</th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Created At</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y">
//           {data.length > 0 ? (
//             data.map((t) => {
//               const dir = directionOf(t, myAccount);
//               return (
//                 <tr key={t.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3">{dir}</td>
//                   <td className="px-4 py-3">{t.id}</td>
//                   <td className="px-4 py-3">{t.sender}</td>
//                   <td className="px-4 py-3">{t.receiver}</td>
//                   <td className="px-4 py-3 font-medium">{t.amount}</td>
//                   <td className="px-4 py-3">{t.currency}</td>
//                   <td className="px-4 py-3">{t.cause ?? "-"}</td>
//                   <td className="px-4 py-3">{new Date(t.createdAt).toLocaleString()}</td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
//                 No transactions found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
