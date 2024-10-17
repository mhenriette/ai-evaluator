"use client";

import { useEffect, useState } from "react";

export default function EvaluationResult() {
  const [evaluation, setEvaluation] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch("/api/evaluation");
        if (response.ok) {
          const data = await response.json();
          setEvaluation(data.evaluation);
        }
      } catch (error) {
        console.error("Error fetching evaluation:", error);
      }
    };

    fetchEvaluation();
  }, []);

  if (!evaluation) {
    return null;
  }

  return (
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Evaluation Result
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Feedback</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
              {evaluation}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
