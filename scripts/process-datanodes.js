const fs = require("fs");
const path = require("path");
const toml = require("toml");

const PROOFS_DIR = path.join(__dirname, "..", "data-nodes");

function run() {
  const proofFiles = fs.readdirSync(PROOFS_DIR);

  const tomlFiles = proofFiles.filter(file => {
    return path.extname(file) === '.toml'
  });

  tomlFiles.forEach((file) => {
    console.log("parsing", file);
    const rawFile = fs.readFileSync(path.join(PROOFS_DIR, file), "utf8");
    const data = toml.parse(rawFile);
    console.log(JSON.stringify(data, null, 2))
  });
}

run();
