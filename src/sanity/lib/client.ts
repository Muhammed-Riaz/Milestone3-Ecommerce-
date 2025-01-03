import { createClient } from 'next-sanity'

import { apiVersion} from '../env'

export const client = createClient({
  projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion,
  token:process.env.NEXT_API_TOKEN,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
