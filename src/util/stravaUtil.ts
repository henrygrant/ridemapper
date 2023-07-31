import strava from "strava-v3";
import {
  STRAVA_ACCESS_TOKEN,
  STRAVA_CLIENT_ID,
  STRAVA_SECRET,
  HOST,
} from "./env";

strava.config({
  access_token: STRAVA_ACCESS_TOKEN,
  client_id: STRAVA_CLIENT_ID,
  client_secret: STRAVA_SECRET,
  redirect_uri: `http://${HOST}/exchangeStravaCode`,
});

export { strava };
