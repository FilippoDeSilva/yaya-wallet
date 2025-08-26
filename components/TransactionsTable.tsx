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
}

export default function TransactionsTable({ txs, currentAccount }: TransactionsTableProps) {
	return (
		<div className="hidden md:block overflow-auto">
			<table className="min-w-full table-fixed text-sm">
				<thead className="bg-slate-100 dark:bg-slate-700">
					<tr>
						<th className="p-3 text-left w-40">Txn ID</th>
						<th className="p-3 text-left w-32">Sender</th>
						<th className="p-3 text-left w-32">Receiver</th>
						<th className="p-3 text-right w-24">Amount</th>
						<th className="p-3 text-left w-20">Currency</th>
						<th className="p-3 text-left w-32">Cause</th>
						<th className="p-3 text-left w-40">Created At</th>
					</tr>
				</thead>
				<tbody>
					{txs.map((t) => {
						const id = t.id;
						const senderName = t.sender?.name || t.sender?.account || "—";
						const receiverName = t.receiver?.name || t.receiver?.account || "—";
						const amount = t.amount_with_currency || t.amount;
						const currency = t.currency || "—";
						const cause = t.cause || "—";
						const createdAt = t.created_at_time
							? new Date(t.created_at_time * 1000).toLocaleString()
							: "—";
						const incoming = t.is_topup || receiverName === currentAccount;
						return (
							<tr
								key={id}
								className={`border-b dark:border-slate-700 transition hover:bg-sky-50/50 dark:hover:bg-sky-900/20 ${incoming ? "bg-green-50/50 dark:bg-green-900/20" : ""}`}
							>
								<td className="p-3 break-all max-w-xs text-xs text-slate-400 font-mono">{id}</td>
								<td className="p-3 font-semibold">{senderName}</td>
								<td className="p-3 font-semibold">{receiverName}</td>
								<td className={`p-3 text-right font-bold ${incoming ? "text-green-600" : "text-red-600"}`}>{amount}</td>
								<td className="p-3">{currency}</td>
								<td className="p-3">{cause}</td>
								<td className="p-3 text-xs">{createdAt}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
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
