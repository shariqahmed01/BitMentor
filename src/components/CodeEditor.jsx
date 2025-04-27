import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange }) {
  const [output, setOutput] = useState("Click 'Run Code' to execute.");

  const runCode = async () => {
    try {
      const response = await fetch("http://localhost:3001/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: value }),
      });

      const data = await response.json();
      setOutput(data.output || "No output returned.");
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div className="h-full w-full border p-2 bg-white rounded flex flex-col">
      {/* Header + Run Button */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Java Code Editor</h2>
        <button
          type="button"
          onClick={runCode}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Run Code
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 mb-4">
      <Editor
  height="100%"
  defaultLanguage="java"
  value={value}
  onChange={(val) => onChange(val ?? "")}
  theme="vs-dark"
  options={{
    automaticLayout: true,
    tabSize: 4,
    insertSpaces: true,
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    snippetSuggestions: "inline",
  }}
/>

      </div>

      {/* Output Box */}
      <div className="bg-gray-100 p-2 border rounded text-sm overflow-y-auto h-32 text-gray-800">
        <strong>Output:</strong>
        <pre className="whitespace-pre-wrap mt-1">{output}</pre>
      </div>
    </div>
  );
}
