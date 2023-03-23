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
  first_verified: z.date(),
  last_verified: z.date(),
});

const PROOF_SCHEMA = z.discriminatedUnion("type", [
  BASE_PROOF_SCHEMA.extend({
    type: z.literal("SignedMessage"),
    message: z.string(),
  }),
  BASE_PROOF_SCHEMA.extend({
    type: z.literal("Url"),
    url: z.string().url(),
  }),
]);

const BASE_IDENTITY_SCHEMA = z.object({
  status: STATUS,
  status_reason: z.string(),
  proofs: z.array(PROOF_SCHEMA),
});

const IDENTITY_SCHEMA = z.discriminatedUnion("type", [
  BASE_IDENTITY_SCHEMA.extend({
    type: z.literal("PubKey"),
    key: z.string().min(64), // TODO check chars
  }),
  BASE_IDENTITY_SCHEMA.extend({
    type: z.literal("ETHAddress"),
    address: z.string().min(42), // TODO check chars
  }),
]);

const PROVIDER_SCHEMA = z.object({
  name: z.string().min(1),
  status: STATUS,
  status_reason: z.string(),
  trusted: z.boolean(),
  url: z.string().url(),
  description_markdown: z.string(),
  isTestNetworkOnly: z.boolean().optional(),
  identities: z.array(IDENTITY_SCHEMA),
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
      const validatedData = PROVIDER_SCHEMA.parse(data);
      validatedData[
        "github_link"
      ] = `https://raw.githubusercontent.com/vegaprotocol/well-known/feat/add-process-script/oracle-providers/${file}`;

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
