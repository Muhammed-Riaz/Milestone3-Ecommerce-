import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,  // Ensure it's correct
  useCdn: false,  // Use false for fresh data
});
