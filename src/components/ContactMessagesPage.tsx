"use client";

import { useEffect, useState } from "react";
import { apiService } from "@/lib/api";

type ContactMessageItem = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await apiService.getContactMessages({ page: 1, limit: 20 });
        setMessages((res.data || []) as ContactMessageItem[]);
      } catch (err) {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Contact Messages</h1>
      {loading ? (
        <div className="text-center text-slate-600">Loading...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow border border-slate-200 p-8">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-slate-500">No messages found.</td>
                </tr>
              ) : (
                messages.map((msg: ContactMessageItem) => (
                  <tr key={msg.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{msg.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{msg.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{msg.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{msg.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{msg.created_at}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
