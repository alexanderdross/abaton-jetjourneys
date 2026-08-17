// Registry of all journeys. To add a journey, create a new file in this folder
// and add it to the array below. Data is validated by src/lib/journeys.ts.
import { collectionJourneys } from "./collection";

export const journeys = [...collectionJourneys];
