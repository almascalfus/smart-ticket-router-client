"use client";

import { useState } from "react";

interface TicketResponse {
  category: string;
  priority: string;
  assigned_team: string;
  confidence: string;
  human_review_required: boolean;
  reasoning: string;
}

export default function Home() {
  const [ticket, setTicket] = useState("");
  const [results, setResults] = useState<TicketResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const classifyTicket = async () => {
    if (!ticket.trim()) {
      setError("Please enter a support ticket.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/route-ticket", {
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
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
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

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT PANEL */}

          <div className="flex flex-col h-[650px]">

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
              disabled={loading}
              className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Classifying..." : "Classify Ticket"}
            </button>

            <div className="mt-5 rounded-xl border border-blue-900 bg-gray-800 p-4">

              <h3 className="font-semibold text-blue-400 mb-3">
                💡 Tips
              </h3>

              <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">

                <li>
                  Describe one or more issues in a single ticket.
                </li>

                <li>
                  Multiple issues will be classified separately.
                </li>

                <li>
                  Short tickets like <strong>"Login"</strong> or <strong>"Payment"</strong> are supported.
                </li>

                <li>
                  Example:
                  <br />
                  <span className="italic text-gray-400">
                    "I can't login and my payment failed yesterday."
                  </span>
                </li>

              </ul>

            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-red-100 border border-red-300 p-3">
                <p className="text-red-700 font-medium">
                  {error}
                </p>
              </div>
            )}

          </div>

          {/* RIGHT PANEL */}

          <div className="h-[650px] rounded-xl border border-gray-700 bg-gray-800 p-5 flex flex-col">

            <h2 className="text-2xl font-bold text-white mb-4">
              Classification Results
            </h2>

            <div className="flex-1 overflow-y-auto pr-2">

              {results.length === 0 ? (

                <div className="h-full flex items-center justify-center text-gray-500 text-center">
                  Submit a support ticket to view AI classification results.
                </div>

              ) : (

                <div className="space-y-5">

                  {results.map((result, index) => (

                    <div
                      key={index}
                      className="rounded-xl bg-gray-900 border border-gray-700 shadow-lg p-5"
                    >

                      <h3 className="text-lg font-bold text-blue-600 mb-4">
                        Issue {index + 1} of {results.length}
                      </h3>

                      {/* Reasoning First */}

                      <div className="mb-5">
                        <p className="font-semibold text-gray-300">
                          Reasoning
                        </p>

                        <p className="mt-2 text-white">
                          {result.reasoning}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-5">

                        <div>
                          <p className="text-sm font-semibold text-gray-400">
                            Category
                          </p>

                          <p className="text-white font-medium">
                            {result.category}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-500">
                            Assigned Team
                          </p>

                          <p className="text-gray-900 font-medium">
                            {result.assigned_team}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-500 mb-1">
                            Priority
                          </p>

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                              ${
                                result.priority === "High"
                                  ? "bg-red-100 text-red-700"
                                  : result.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                          >
                            {result.priority}
                          </span>

                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-500 mb-1">
                            Confidence
                          </p>

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                              ${
                                result.confidence === "High"
                                  ? "bg-green-100 text-green-700"
                                  : result.confidence === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                          >
                            {result.confidence}
                          </span>

                        </div>

                        <div>

                          <p className="text-sm font-semibold text-gray-500 mb-1">
                            Human Review
                          </p>

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                              ${
                                result.human_review_required
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                          >
                            {result.human_review_required ? "Yes" : "No"}
                          </span>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
