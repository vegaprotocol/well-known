const fs = require("fs");
const path = require("path");
const toml = require("toml");
const z = require("zod");

const PROOFS_DIR = path.join(__dirname, "..", "oracle-providers");
const OUTPUT_FILE = path.join(__dirname, "..", "oracle-proofs.json");

const STATUS = z.enum([
  "UNKNOWN",
  "GOOD",
  "SUSPICIOUS",
  "MALICIOUS",
  "RETIRED",
  "COMPROMISED",
]);

const BASE_PROOF_SCHEMA = z.object({
  format: z.enum(["url", "signed_message"]),
  available: z.boolean(),
});

const PROOF_SCHEMA = z.discriminatedUnion("type", [
  BASE_PROOF_SCHEMA.extend({
    type: z.literal("public_key"),
    public_key: z.string().min(64),
    message: z.string().min(1),
  }),
  BASE_PROOF_SCHEMA.extend({
    type: z.literal("eth_address"),
    eth_address: z.string().min(42),
    message: z.string().min(1),
  }),
  BASE_PROOF_SCHEMA.extend({
    type: z.literal("web"),
    url: z.string().url(),
  }),
  BASE_PROOF_SCHEMA.extend({
    type: z.literal("github"),
    url: z.string().url(),
  }),
  BASE_PROOF_SCHEMA.extend({
    type: z.literal("twitter"),
    url: z.string().url(),
  }),
]);

const BASE_ORACLE_SCHEMA = z.object({
  status: STATUS,
  status_reason: z.string(),
  first_verified: z.date(),
  last_verified: z.date(),
});

const ORACLE_SCHEMA = z.discriminatedUnion("type", [
  BASE_ORACLE_SCHEMA.extend({
    type: z.literal("public_key"),
    public_key: z.string().min(64), // TODO check chars
  }),
  BASE_ORACLE_SCHEMA.extend({
    type: z.literal("eth_address"),
    eth_address: z.string().min(42), // TODO check chars
  }),
]);

const PROVIDER_SCHEMA = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  description_markdown: z.string(),
  oracle: ORACLE_SCHEMA,
  proofs: z.array(PROOF_SCHEMA),
});

function run() {
  const result = [];
  const proofFiles = fs.readdirSync(PROOFS_DIR);

  // Loop through each file in directory
  proofFiles.forEach((file) => {
    console.log("parsing", file);
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
      const validatedData = PROVIDER_SCHEMA.parse(data);
      validatedData[
        "github_link"
      ] = `https://github.com/vegaprotocol/well-known/blob/main/oracle-providers/${file}`;

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

  return true;
}

run();
