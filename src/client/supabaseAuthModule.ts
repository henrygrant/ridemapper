import {
  createSupabaseClient,
  BrowserCookieAuthStorageAdapter,
} from "@supabase/auth-helpers-shared";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
function createBrowserClient(
  supabaseUrl: string,
  supabaseKey: string,
  { options, cookieOptions }: any = {}
) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "supabaseUrl and supabaseKey are required to create a Supabase client! Find these under Settings > API in your Supabase dashboard."
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    ...options,
    global: {
      ...options?.global,
      headers: {
        ...options?.global?.headers,
        "X-Client-Info": "auth-helpers-htmx@0.0.0",
      },
    },
    auth: {
      storageKey: cookieOptions?.name,
      storage: new BrowserCookieAuthStorageAdapter(cookieOptions),
    },
  });
}
document.supabase = createBrowserClient("SUPABASE_URL", "SUPABASE_ANON_KEY");
document.supabase.auth.onAuthStateChange((event, session) => {
  document.supabasesession = session;
});

function initMap() {
  return new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        }),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
}

document.body.addEventListener("htmx:afterSettle", (evt: any) => {
  console.log(evt);
  if (evt.detail.pathInfo.responsePath === "/map") {
    initMap();
  }
});
