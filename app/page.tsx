"use client";

import { useState } from "react";

import {
  TicketResponse,
  ClassificationResponse,
} from "@/app/ticket";

export default function Home() {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState<ClassificationResponse | null>(null);
  const [error, setError] = useState("");
  const [isloading, setisLoading] = useState(false);

  const classifyTicket = async () => {
    if (!ticket.trim()) {
      setError("Please enter a support ticket.");
      return;
    }

    setisLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/route-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail?.[0]?.msg || "Failed to classify ticket.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend.");
    } finally {
      setisLoading(false);
    }
  };

    return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-8">

        <h1 className="text-4xl font-bold text-center text-white-500">
          Smart Ticket Router
        </h1>

        <p className="text-center text-blue-300 mt-2">
          AI-Powered Ticket Classification
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT PANEL */}

          <div className="flex flex-col">

            <label className="text-lg font-bold text-gray-100 mb-3">
              Support Ticket
            </label>

            <textarea
                rows={10}
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
                placeholder="Describe your support issue here..."
                className="h-60 w-full rounded-xl bg-gray-800 border border-gray-700 p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
             />

            <button
              onClick={classifyTicket}
              disabled={isloading}
              className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isloading ? "Classifying..." : "Classify Ticket"}
            </button>

            {error && (
              <div className="mt-4 rounded-lg bg-red-100 border border-red-300 p-3">
                <p className="text-red-700 font-medium">
                  {error}
                </p>
              </div>
            )}

          </div>

          {/* RIGHT PANEL */}

              <div className="flex flex-col">

                <label className="text-lg font-bold text-gray-100 mb-3">
                  Classification Results
                </label>

                <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 flex flex-col h-[500px] overflow-hidden">

                  {(!result || result.issues.length === 0) ? (

                    <div className="h-full flex items-center justify-center text-gray-500 text-center">
                      Submit a support ticket to view AI classification results.
                    </div>

                  ) : (

                    <div className="flex-1 overflow-y-auto min-h-0 pr-2">

                      <div className="space-y-5">

                        {result.issues.map((issue, index) => (

                          <div
                            key={index}
                            className="rounded-xl bg-gray-900 border border-gray-700 shadow-lg p-5"
                          >

                            <h3 className="text-lg font-bold text-blue-600 mb-4">
                              Issue {index + 1} of {result.issues.length}
                            </h3>

                            <div className="mb-5">
                              <p className="font-semibold text-gray-300">
                                Reasoning
                              </p>

                              <p className="mt-2 text-white">
                                {issue.reasoning}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-5">

                              <div>
                                <p className="text-sm font-semibold text-gray-400">
                                  Category
                                </p>

                                <p className="text-white font-medium">
                                  {issue.category}
                                </p>
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-gray-400">
                                  Assigned Team
                                </p>

                                <p className="text-white font-medium">
                                  {issue.assigned_team}
                                </p>
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-gray-400 mb-1">
                                  Priority
                                </p>

                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    issue.priority === "High"
                                      ? "bg-red-100 text-red-700"
                                      : issue.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {issue.priority}
                                </span>
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-gray-400 mb-1">
                                  Confidence
                                </p>

                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    issue.confidence === "High"
                                      ? "bg-green-100 text-green-700"
                                      : issue.confidence === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {issue.confidence}
                                </span>
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-gray-400 mb-1">
                                  Human Review
                                </p>

                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    issue.human_review_required
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {issue.human_review_required ? "Yes" : "No"}
                                </span>
                              </div>

                            </div>

                          </div>

                        ))}

                        <details className="rounded-xl border border-gray-700 bg-gray-900">

                          <summary className="cursor-pointer px-5 py-4 text-blue-400 font-semibold hover:text-blue-300">
                            More...
                          </summary>

                          <div className="grid grid-cols-3 gap-4 p-5 border-t border-gray-700">

                            <div className="text-center">
                              <p className="text-sm text-gray-400">
                                Manual Routing
                              </p>

                              <p className="text-2xl font-bold text-red-400 mt-2">
                                {result.estimated_manual_time}s
                              </p>
                            </div>

                            <div className="text-center">
                              <p className="text-sm text-gray-400">
                                AI Routing
                              </p>

                              <p className="text-2xl font-bold text-green-400 mt-2">
                                {result.ai_routing_time}s
                              </p>
                            </div>

                            <div className="text-center">
                              <p className="text-sm text-gray-400">
                                Time Saved
                              </p>

                              <p className="text-2xl font-bold text-blue-400 mt-2">
                                {result.time_saved_percentage}%
                              </p>
                            </div>

                          </div>

                        </details>

                      </div>

                    </div>

                  )}

                </div>

              </div>

        </div>

      </div>
    </main>
  );
}