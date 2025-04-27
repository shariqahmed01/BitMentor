export default function ProblemInput({ value, onChange }) {
  const formatProblemText = (rawText) => {
    if (!rawText) return "";
  
    let clean = rawText
      // Remove noise words
      .replace(/Solved/i, "")
      .replace(/Easy|Medium|Hard/i, "")
      .replace(/Topics/i, "")
      .replace(/Companies/i, "")
      .replace(/Hint/i, "")
      .replace(/\r/g, "") 
      .replace(/\n{2,}/g, "\n") 
      .trim();
  
 
    clean = clean.replace(/Example\s*\d*:/g, "\nExample:\n");
    clean = clean.replace(/Constraints:/g, "\nConstraints:\n");
  

    clean = clean
      .split("\n")
      .map(line => line.trim()) 
      .filter(line => line.length > 0)
      .join("\n");
  
    return clean;
  };
  

  const handleChange = (e) => {
    const rawInput = e.target.value;
    const formattedInput = formatProblemText(rawInput);
    onChange(formattedInput);
  };

  return (
    <div className="h-full w-full border p-2 bg-gray-50 rounded flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Problem Description</h2>
      <textarea
        className="flex-1 border p-2 rounded resize-none text-gray-800 bg-white"
        placeholder="Paste your DSA question here..."
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
