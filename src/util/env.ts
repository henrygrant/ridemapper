import "dotenv/config";

interface env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  STRAVA_CLIENT_ID: string;
  STRAVA_SECRET: string;
  STRAVA_ACCESS_TOKEN: string;
  STRAVA_REFRESH_TOKEN: string;
  GOOGLE_MAPS_API_KEY: string;
  HOST: string;
  PORT: number;
}

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `localhost:${PORT}`;

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env");
}

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID as string;
const STRAVA_SECRET = process.env.STRAVA_SECRET as string;
const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN as string;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN as string;

if (
  !STRAVA_CLIENT_ID ||
  !STRAVA_SECRET ||
  !STRAVA_ACCESS_TOKEN ||
  !STRAVA_REFRESH_TOKEN
) {
  throw new Error(
    "STRAVA_CLIENT_ID, STRAVA_SECRET, STRAVA_ACCESS_TOKEN, and STRAVA_REFRESH_TOKEN must be set in .env"
  );
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error("GOOGLE_MAPS_API_KEY must be set in .env");
}

export {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  STRAVA_CLIENT_ID,
  STRAVA_SECRET,
  STRAVA_ACCESS_TOKEN,
  STRAVA_REFRESH_TOKEN,
  GOOGLE_MAPS_API_KEY,
  HOST,
  PORT,
};
