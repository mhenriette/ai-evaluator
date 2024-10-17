"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmissionForm() {
  const [submission, setSubmission] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submission }),
      });

      if (!response.ok) {
        throw new Error("Evaluation failed");
      }

      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during evaluation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="submission"
          className="block text-sm font-medium text-gray-700"
        >
          Blockchain Theory Submission
        </label>
        <div className="mt-1">
          <textarea
            id="submission"
            name="submission"
            rows={10}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Paste your submission here..."
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? "Evaluating..." : "Submit for Evaluation"}
        </button>
      </div>
    </form>
  );
}
