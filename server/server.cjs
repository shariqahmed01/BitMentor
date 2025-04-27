const express = require("express");
const cors = require("cors");
const { runJavaInDocker } = require("./utils/dockerRunner.cjs");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run", async (req, res) => {
  const { code, testCases } = req.body;

  if (!code) return res.status(400).json({ output: "No code provided." });

  try {
    const output = await runJavaInDocker(code, testCases);
    res.json({ output });
  } catch (err) {
    res.status(500).json({ output: "Server error: " + err.message });
  }
});


app.listen(3001, () => {
  console.log("Docker-safe Java executor running on port 3001");
});
