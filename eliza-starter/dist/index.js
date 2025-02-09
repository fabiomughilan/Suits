// src/index.ts
import { DirectClient } from "@elizaos/client-direct";
import {
  AgentRuntime,
  elizaLogger,
  settings as settings3,
  stringToUuid
} from "@elizaos/core";
import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";
import { createNodePlugin } from "@elizaos/plugin-node";
import { solanaPlugin } from "@elizaos/plugin-solana";
import fs2 from "fs";
import net from "net";
import path3 from "path";
import { fileURLToPath } from "url";

// src/cache/index.ts
import { CacheManager, DbCacheAdapter } from "@elizaos/core";
function initializeDbCache(character2, db) {
  const cache = new CacheManager(new DbCacheAdapter(db, character2.id));
  return cache;
}

// src/character.ts
import { ModelProviderName } from "@elizaos/core";
import { starknetPlugin } from "@elizaos/plugin-starknet";
var character = {
  //...defaultCharacter,
  name: "Eliza Legal",
  plugins: [starknetPlugin],
  clients: [],
  modelProvider: ModelProviderName.GAIANET,
  settings: {
    secrets: {},
    voice: {
      model: "en_US-hfc_female-medium"
    }
  },
  system: "Provide direct, concise, and actionable legal insights. Avoid excessive disclaimers unless absolutely necessary. Always aim to educate and empower users with practical information.",
  bio: [
    "Eliza Legal is an expert in law, dedicated to offering clear and concise legal insights to those in need.",
    "She has a deep understanding of global legal systems and can navigate complex regulatory environments.",
    "Eliza Legal believes in empowering individuals with knowledge to make informed decisions in their legal challenges.",
    "Known for her logical approach and empathetic demeanor, she strives to demystify legal jargon and make the law accessible."
  ],
  lore: [
    "Eliza Legal once helped draft a model privacy policy for a major tech company, ensuring compliance across multiple jurisdictions.",
    "She has successfully mediated hypothetical disputes in mock trials, always focusing on fairness and justice.",
    "Her knowledge of international law is unparalleled, and she\u2019s rumored to have memorized entire legal codes.",
    "Eliza Legal\u2019s favorite pastime is analyzing landmark court rulings and deriving practical lessons from them."
  ],
  messageExamples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "What compensation is an employee entitled to after being terminated without cause?"
        }
      },
      {
        user: "Eliza Legal",
        content: {
          text: "In many jurisdictions, an employee terminated without cause is entitled to severance pay, a notice period, or both. For 3 years of service, severance is typically 3 weeks to 3 months' pay, depending on local laws."
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Can I refuse to sign a non-compete agreement?"
        }
      },
      {
        user: "Eliza Legal",
        content: {
          text: "Yes, you can refuse to sign. However, the employer may withdraw their offer if the agreement is a condition of employment. Check if non-competes are enforceable in your jurisdiction."
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "What happens if my landlord evicts me unfairly?"
        }
      },
      {
        user: "Eliza Legal",
        content: {
          text: "You may be entitled to compensation or reinstatement of your tenancy, depending on local laws. File a complaint with the housing authority or consult a tenant rights advocate."
        }
      }
    ]
  ],
  postExamples: [
    "Did you know that in many places, employers must provide a reason for termination, or they may owe you compensation?",
    "Navigating legal disputes can be stressful, but understanding your rights is the first step to resolution.",
    "Have a question about intellectual property rights? The law often favors those who document their work thoroughly.",
    "Contracts can be intimidating, but remember: you always have the right to ask for clarification or negotiation."
  ],
  adjectives: [
    "professional",
    "empathetic",
    "precise",
    "logical",
    "insightful",
    "reliable",
    "clear",
    "concise",
    "supportive"
  ],
  topics: [
    "employment law",
    "intellectual property",
    "contract negotiation",
    "tenant rights",
    "consumer protection",
    "data privacy",
    "corporate law",
    "dispute resolution",
    "human rights",
    "cybersecurity regulations"
  ],
  style: {
    all: [
      "responses must be concise and actionable",
      "avoid unnecessary disclaimers unless they are legally required",
      "use plain language and focus on the key details",
      "prioritize direct answers over general advice",
      "highlight specific legal frameworks where relevant"
    ],
    chat: [
      "respond clearly and directly to the question asked",
      "avoid deflecting or overqualifying responses",
      "focus on actionable insights rather than generalities"
    ],
    post: [
      "focus on providing useful tips and insights on legal topics",
      "encourage readers to educate themselves about their rights",
      "avoid overly technical language; aim for accessibility"
    ]
  }
};

// src/chat/index.ts
import { settings } from "@elizaos/core";
import readline from "readline";
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on("SIGINT", () => {
  rl.close();
  process.exit(0);
});
async function handleUserInput(input, agentId) {
  if (input.toLowerCase() === "exit") {
    rl.close();
    process.exit(0);
  }
  try {
    const serverPort = parseInt(settings.SERVER_PORT || "3000");
    const response = await fetch(
      `http://localhost:${serverPort}/${agentId}/message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          userId: "user",
          userName: "User"
        })
      }
    );
    const data = await response.json();
    data.forEach((message) => console.log(`${"Agent"}: ${message.text}`));
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}
function startChat(characters) {
  function chat() {
    const agentId = characters[0].name ?? "Agent";
    rl.question("You: ", async (input) => {
      await handleUserInput(input, agentId);
      if (input.toLowerCase() !== "exit") {
        chat();
      }
    });
  }
  return chat;
}

// src/clients/index.ts
import { AutoClientInterface } from "@elizaos/client-auto";
import { DiscordClientInterface } from "@elizaos/client-discord";
import { TelegramClientInterface } from "@elizaos/client-telegram";
import { TwitterClientInterface } from "@elizaos/client-twitter";
async function initializeClients(character2, runtime) {
  const clients = [];
  const clientTypes = character2.clients?.map((str) => str.toLowerCase()) || [];
  if (clientTypes.includes("auto")) {
    const autoClient = await AutoClientInterface.start(runtime);
    if (autoClient) clients.push(autoClient);
  }
  if (clientTypes.includes("discord")) {
    clients.push(await DiscordClientInterface.start(runtime));
  }
  if (clientTypes.includes("telegram")) {
    const telegramClient = await TelegramClientInterface.start(runtime);
    if (telegramClient) clients.push(telegramClient);
  }
  if (clientTypes.includes("twitter")) {
    const twitterClients = await TwitterClientInterface.start(runtime);
    clients.push(twitterClients);
  }
  if (character2.plugins?.length > 0) {
    for (const plugin of character2.plugins) {
      if (plugin.clients) {
        for (const client of plugin.clients) {
          clients.push(await client.start(runtime));
        }
      }
    }
  }
  return clients;
}

// src/config/index.ts
import { ModelProviderName as ModelProviderName2, settings as settings2, validateCharacterConfig } from "@elizaos/core";
import fs from "fs";
import path from "path";
import yargs from "yargs";
function parseArguments() {
  try {
    return yargs(process.argv.slice(2)).option("character", {
      type: "string",
      description: "Path to the character JSON file"
    }).option("characters", {
      type: "string",
      description: "Comma separated list of paths to character JSON files"
    }).parseSync();
  } catch (error) {
    console.error("Error parsing arguments:", error);
    return {};
  }
}
async function loadCharacters(charactersArg) {
  let characterPaths = charactersArg?.split(",").map((filePath) => {
    if (path.basename(filePath) === filePath) {
      filePath = "../characters/" + filePath;
    }
    return path.resolve(process.cwd(), filePath.trim());
  });
  const loadedCharacters = [];
  if (characterPaths?.length > 0) {
    for (const path4 of characterPaths) {
      try {
        const character2 = JSON.parse(fs.readFileSync(path4, "utf8"));
        validateCharacterConfig(character2);
        loadedCharacters.push(character2);
      } catch (e) {
        console.error(`Error loading character from ${path4}: ${e}`);
        process.exit(1);
      }
    }
  }
  return loadedCharacters;
}
function getTokenForProvider(provider, character2) {
  switch (provider) {
    case ModelProviderName2.OPENAI:
      return character2.settings?.secrets?.OPENAI_API_KEY || settings2.OPENAI_API_KEY;
    case ModelProviderName2.LLAMACLOUD:
      return character2.settings?.secrets?.LLAMACLOUD_API_KEY || settings2.LLAMACLOUD_API_KEY || character2.settings?.secrets?.TOGETHER_API_KEY || settings2.TOGETHER_API_KEY || character2.settings?.secrets?.XAI_API_KEY || settings2.XAI_API_KEY || character2.settings?.secrets?.OPENAI_API_KEY || settings2.OPENAI_API_KEY;
    case ModelProviderName2.ANTHROPIC:
      return character2.settings?.secrets?.ANTHROPIC_API_KEY || character2.settings?.secrets?.CLAUDE_API_KEY || settings2.ANTHROPIC_API_KEY || settings2.CLAUDE_API_KEY;
    case ModelProviderName2.REDPILL:
      return character2.settings?.secrets?.REDPILL_API_KEY || settings2.REDPILL_API_KEY;
    case ModelProviderName2.OPENROUTER:
      return character2.settings?.secrets?.OPENROUTER || settings2.OPENROUTER_API_KEY;
    case ModelProviderName2.GROK:
      return character2.settings?.secrets?.GROK_API_KEY || settings2.GROK_API_KEY;
    case ModelProviderName2.HEURIST:
      return character2.settings?.secrets?.HEURIST_API_KEY || settings2.HEURIST_API_KEY;
    case ModelProviderName2.GROQ:
      return character2.settings?.secrets?.GROQ_API_KEY || settings2.GROQ_API_KEY;
  }
}

// src/database/index.ts
import { PostgresDatabaseAdapter } from "@elizaos/adapter-postgres";
import { SqliteDatabaseAdapter } from "@elizaos/adapter-sqlite";
import Database from "better-sqlite3";
import path2 from "path";
function initializeDatabase(dataDir) {
  if (process.env.POSTGRES_URL) {
    const db = new PostgresDatabaseAdapter({
      connectionString: process.env.POSTGRES_URL
    });
    return db;
  } else {
    const filePath = process.env.SQLITE_FILE ?? path2.resolve(dataDir, "db.sqlite");
    const db = new SqliteDatabaseAdapter(new Database(filePath));
    return db;
  }
}

// src/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path3.dirname(__filename);
var wait = (minTime = 1e3, maxTime = 3e3) => {
  const waitTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  return new Promise((resolve) => setTimeout(resolve, waitTime));
};
var nodePlugin;
function createAgent(character2, db, cache, token) {
  elizaLogger.success(
    elizaLogger.successesTitle,
    "Creating runtime for character",
    character2.name
  );
  nodePlugin ??= createNodePlugin();
  return new AgentRuntime({
    databaseAdapter: db,
    token,
    modelProvider: character2.modelProvider,
    evaluators: [],
    character: character2,
    plugins: [
      bootstrapPlugin,
      nodePlugin,
      character2.settings?.secrets?.WALLET_PUBLIC_KEY ? solanaPlugin : null
    ].filter(Boolean),
    providers: [],
    actions: [],
    services: [],
    managers: [],
    cacheManager: cache
  });
}
async function startAgent(character2, directClient) {
  try {
    character2.id ??= stringToUuid(character2.name);
    character2.username ??= character2.name;
    const token = getTokenForProvider(character2.modelProvider, character2);
    const dataDir = path3.join(__dirname, "../data");
    if (!fs2.existsSync(dataDir)) {
      fs2.mkdirSync(dataDir, { recursive: true });
    }
    const db = initializeDatabase(dataDir);
    await db.init();
    const cache = initializeDbCache(character2, db);
    const runtime = createAgent(character2, db, cache, token);
    await runtime.initialize();
    runtime.clients = await initializeClients(character2, runtime);
    directClient.registerAgent(runtime);
    elizaLogger.debug(`Started ${character2.name} as ${runtime.agentId}`);
    return runtime;
  } catch (error) {
    elizaLogger.error(
      `Error starting agent for character ${character2.name}:`,
      error
    );
    console.error(error);
    throw error;
  }
}
var checkPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false);
      }
    });
    server.once("listening", () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
};
var startAgents = async () => {
  const directClient = new DirectClient();
  let serverPort = parseInt(settings3.SERVER_PORT || "3000");
  const args = parseArguments();
  let charactersArg = args.characters || args.character;
  let characters = [character];
  console.log("charactersArg", charactersArg);
  if (charactersArg) {
    characters = await loadCharacters(charactersArg);
  }
  console.log("characters", characters);
  try {
    for (const character2 of characters) {
      await startAgent(character2, directClient);
    }
  } catch (error) {
    elizaLogger.error("Error starting agents:", error);
  }
  while (!await checkPortAvailable(serverPort)) {
    elizaLogger.warn(`Port ${serverPort} is in use, trying ${serverPort + 1}`);
    serverPort++;
  }
  directClient.startAgent = async (character2) => {
    return startAgent(character2, directClient);
  };
  directClient.start(serverPort);
  if (serverPort !== parseInt(settings3.SERVER_PORT || "3000")) {
    elizaLogger.log(`Server started on alternate port ${serverPort}`);
  }
  elizaLogger.log("Chat started. Type 'exit' to quit.");
  const chat = startChat(characters);
  chat();
};
startAgents().catch((error) => {
  elizaLogger.error("Unhandled error in startAgents:", error);
  process.exit(1);
});
export {
  createAgent,
  wait
};
