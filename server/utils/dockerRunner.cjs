const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const sandboxDir = path.join(__dirname, "../sandbox");

function runJavaInDocker(code) {
  return new Promise((resolve, reject) => {
    const javaFilePath = `${sandboxDir}/Solution.java`;
    fs.writeFileSync(javaFilePath, code);

    exec(`docker build -t java-runner .`, { cwd: sandboxDir }, (err, stdout, stderr) => {
      if (err) return resolve("Build error:\n" + stderr);

      exec(
        `docker run --rm --network=none --memory=256m --cpus=0.5 java-runner`,
        { timeout: 5000 },
        (err2, stdout2, stderr2) => {
          if (err2) return resolve(stderr2 || err2.message);
          resolve(stdout2);
        }
      );
    });
  });
}

module.exports = { runJavaInDocker };
