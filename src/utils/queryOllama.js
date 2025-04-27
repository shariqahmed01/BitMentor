export async function queryOllama({ problem, code, question }) {
  const payload = {
    model: "llama3.2:latest",
    stream: false,
    prompt: `
You are a DSA tutor helping a user solve a Java coding problem. 

Your behavior rules:

1. If the user's code is correct for the problem, clearly acknowledge that the solution is correct.
2. Optionally suggest optimizations or improvements if any.
3. If the user's code is incorrect, guide them with hints about what is wrong without giving direct code.
4. Always explain your reasoning briefly.
5. Keep responses clear, concise, and helpful.

User's Problem:
${problem}

User's Code:
${code}

User's Question:
${question}

Respond with correctness confirmation + hints for improvement if needed.

    `.trim(),
  };

  console.log("[Ollama] Request Payload:", payload);

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("[Ollama] Response:", data);

  return data.response;
}
