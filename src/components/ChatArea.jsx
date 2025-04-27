import { useState } from "react";
import { queryOllama } from "../utils/queryOllama";

export default function ChatArea({ problemText, codeText }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const tutorResponse = await queryOllama({
      problem: problemText,
      code: codeText,
      question: input,
    });

    setMessages((prev) => [
      ...prev,
      { sender: "Tutor", text: tutorResponse },
    ]);
  };

  return (
    <div className="h-full w-full border bg-gray-50 p-2 rounded flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Tutor Chat</h2>

      <div className="flex-1 bg-white p-3 rounded overflow-y-auto text-sm text-gray-800 border space-y-3">
        {messages.map((m, i) => (
          <div key={i}>
            <span className="font-semibold text-blue-600">{m.sender}:</span>{" "}
            <span className="whitespace-pre-line">{m.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
      <input
  className="flex-1 border p-2 rounded text-gray-800 bg-white"
  placeholder="Ask your tutor something like 'How should I approach this?'"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) { 
      e.preventDefault();
      sendMessage();
    }
  }}
/>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
