import { initDatabase } from "./init";
import { seedDatabase } from "./seed";

initDatabase();

const shouldSeed = process.argv.includes("--seed") || process.env.SEED_ON_DEPLOY === "true";

if (shouldSeed) {
   seedDatabase();
}
