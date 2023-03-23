const fs = require("fs");
const path = require("path");
const toml = require("toml");
const z = require("zod");

const PROOFS_DIR = path.join(__dirname, "..", "oracle-providers");
const OUTPUT_FILE = path.join(__dirname, "..", "oracle-proofs.json");

const PROOF_SCHEMA = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  description_md: z.string(),
  oracle: z.object({
    id: z.string().min(1),
    public_key: z.string(),
    status: z.enum([
      "UNKNOWN",
      "GOOD",
      "SUSPICIOUS",
      "MALICIOUS",
      "RETIRED",
      "COMPROMISED",
    ]),
    status_reason: z.string(),
    first_verified: z.date(),
    last_verified: z.date(),
  }),
  proofs: z.array(
    z.object({
      type: z.string(),
      format: z.enum(["URL", "signed_message"]),
      url: z.string().optional(),
      pubkey: z.string().optional(),
      message: z.string().optional(),
      available: z.boolean(),
    })
  ),
});

function run() {
  const result = [];
  const proofFiles = fs.readdirSync(PROOFS_DIR);

  // Loop through each file in directory
  proofFiles.forEach((file) => {
    const validityResult = isFileValid(file);
    const warn = (msg) => console.warn(`${file}: ${msg}`);

    if (validityResult !== true) {
      warn(validityResult);
      return;
    }

    const rawFile = fs.readFileSync(path.join(PROOFS_DIR, file), "utf8");

    let data;

    try {
      data = toml.parse(rawFile);
    } catch (err) {
      warn("invalid toml");
      return;
    }

    // If it passes zod validation push it to result data, otherwise skip it
    try {
      const validatedData = PROOF_SCHEMA.parse(data);

      // Add to array which will be written to json file
      result.push(validatedData);
    } catch (error) {
      warn("validation failed");
      return;
    }
  });

  fs.writeFile(OUTPUT_FILE, JSON.stringify(result, null, 2), (error) => {
    if (error) {
      throw new Error(`Failed to write ${OUTPUT_FILE}`);
    }
  });
}

function isFileValid(file) {
  // Only use toml files
  if (!file.endsWith(".toml")) {
    return "invalid extension";
  }

  const [pubkey, name] = file.split("-");

  if (pubkey.length !== 64 || !/^[A-Fa-f0-9]*$/i.test(pubkey)) {
    return "invalid filename convention: pubkey";
  }

  if (!name?.length) {
    return "invalid filename convention: proof name";
  }

  return true;
}

run();
