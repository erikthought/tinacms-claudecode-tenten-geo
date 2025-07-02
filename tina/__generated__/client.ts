import { createClient } from "tinacms/dist/client";
import { queries } from "./types";

const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export const client = createClient({ 
  url: `https://content.tinajs.io/1.5/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`, 
  token: process.env.TINA_TOKEN, 
  queries 
});
export default client;
  