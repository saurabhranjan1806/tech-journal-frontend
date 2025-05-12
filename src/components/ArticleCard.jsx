import { useState } from "react";
import axios from "axios";

export default function ArticleCard({ article, isBookmarked, toggleBookmark }) {
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleSummarize = async () => {
    setLoadingSummary(true);
    try {
      const response = await axios.get("https://tech-journal-xzoo.onrender.com/summarize", {
        params: {
          title: article.title,
          body: article.description, // or article.body if available
        },
      });
      setSummary(response.data);
    } catch (error) {
      console.error("Error summarizing article:", error);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{article.title}</h2>
        <button onClick={() => toggleBookmark(article)} className="text-blue-500">
          {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
        </button>
      </div>

      <p className="text-gray-700 mt-1">{article.description}</p>

      {article.concepts?.length > 0 && (
        <div className="mt-2">
          <strong>Key Concepts:</strong>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {article.concepts.map((concept, index) => (
              <li key={index}>{concept}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3">
        <button
          onClick={handleSummarize}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {loadingSummary ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {summary && (
        <div className="mt-3 bg-gray-100 p-2 rounded">
          <strong>Summary:</strong>
          <p className="text-sm">{summary}</p>
        </div>
      )}
    </div>
  );
}
