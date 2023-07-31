import { createSbServerClient } from "../../util/supabaseAuthUtil";
import { Request, Response } from "express";
import { authenticatedView, mainView, signInView } from "../../views";
import { strava } from "../../util/stravaUtil";
import { SupabaseClient } from "@supabase/supabase-js";

export const stravaSettings = async (req: Request, res: Response) => {
  try {
    let ret;
    const supabase = createSbServerClient({
      req,
      res,
    });
    const userId = await getUserId(supabase);
    const userMeta = await getUserMeta(supabase, userId);

    if (!userMeta.strava_access_token) {
      // if user hasn't setup strava
      ret = await connectYourStravaView();
    } else {
      const shouldUpdate =
        Math.abs(
          new Date().getTime() - new Date(userMeta.last_updated).getTime()
        ) > 7200000;
      // if we've updated in the last two hours
      if (shouldUpdate) {
        const updatedUserMeta = upsertStravaUserData(
          supabase,
          userMeta,
          userId
        );
        const updatedUserActivities = upsertStravaActivities(
          supabase,
          userMeta,
          userId
        );
        ret = populatedStravaView(updatedUserMeta, updatedUserActivities);
      } else {
        const activities = await getActivities(supabase, userId);
        ret = populatedStravaView(userMeta, activities);
      }
    }

    if (!req.get("hx-request")) {
      ret = mainView(authenticatedView(ret));
    }
    res.send(ret);
  } catch (e) {
    console.error(e);
    res.redirect("/");
  }
};

const getUserId = async (supabase: SupabaseClient) => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!session) throw new Error("No session in stravaSettings.ts");
  return session.user.id;
};

const getUserMeta = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase
    .from("user_meta")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data[0];
};

const getActivities = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
};

const connectYourStravaView = async () => {
  const stravaUrl = await strava.oauth.getRequestAccessURL({
    scope: "activity:read_all",
  });
  return /* html */ `
    <div class="strava-settings-view">
      <h1>Strava Settings</h1>
      <a href=${stravaUrl}><button>Connect to Strava</button></a>
    </div>
  `;
};

const upsertStravaUserData = async (
  supabase: SupabaseClient,
  userMeta: any,
  userId: string
) => {
  const now = new Date();
  const lastUpdated = new Date(userMeta.last_updated);

  // if it's been more than 2 hours since we last updated
  if (Math.abs(now.getTime() - lastUpdated.getTime()) > 7200000) {
    const access_token = userMeta.strava_access_token;
    const athlete = await strava.athlete.get({ access_token });
    const { data: userMetaUpsertData, error: userMetaUpsertError } =
      await supabase
        .from("user_meta")
        .upsert({
          user_id: userId,
          strava_firstname: athlete.firstname,
          strava_lastname: athlete.lastname,
          strava_profile_pic_url: athlete.profile,
          strava_id: athlete.id,
        })
        .select();
    if (userMetaUpsertError) throw userMetaUpsertError;
    return userMetaUpsertData;
  } else {
    return userMeta;
  }
};

const upsertStravaActivities = async (
  supabase: SupabaseClient,
  userMeta: any,
  userId: string
) => {
  const activities = [];
  let page = 1;
  while (true) {
    const activitiesResp = await strava.athlete.listActivities({
      access_token: userMeta.strava_access_token,
      per_page: 200,
      page,
    });
    // if (activitiesError) throw activitiesError;
    if (!activitiesResp.length) break;
    activities.push(...activitiesResp);
    page++;
  }

  const { data: activitiesUpsertData, error: activitiesUpsertError } =
    await supabase
      .from("activities")
      .upsert(
        activities.map((activity) => ({
          activity_id: activity.id,
          user_id: userId,
          type: activity.type,
          name: activity.name,
          distance: activity.distance,
          elevation_gain: activity.total_elevation_gain,
          start_date: activity.start_date,
          utc_offset: activity.utc_offset,
          polyline: activity.map.summary_polyline,
          moving_time: activity.moving_time,
          elapsed_time: activity.elapsed_time,
        }))
      )
      .select();
  if (activitiesUpsertError) throw activitiesUpsertError;
  return activitiesUpsertData;
};

const populatedStravaView = (userMeta: any, activities: any) => {
  return /* html */ `
  <div class="strava-settings-view">
    <h1>Strava Settings</h1>
    <div class="strava-athlete-card">
      <div class="strava-athlete-card-avatar">
        <img src="${userMeta.strava_profile_pic_url}" alt="avatar" />
      </div>
      <a href="https://www.strava.com/athletes/${
        userMeta.strava_id
      }" target="_blank">
        <h2 class="strava-athlete-card-title">
          ${userMeta.strava_firstname} ${userMeta.strava_lastname}
        </h2>
      </a>
      <p class="strava-athlete-card-id">Strava ID: ${userMeta.strava_id}</p>
    </div>    
    <div class="strava-activity-container">
      ${activities
        .map(
          (activity: any) => /* html */ `
        <div class="strava-activity-card">
          <a href="https://strava.com/activities/${
            activity.id
          }" target="_blank">
            <h3>${activity.name}</h3>
          </a>
          <div>${activity.type} on ${new Date(
            activity.start_date
          ).toLocaleDateString("en-US")}</div>
          <div class="strava-activity-metrics">
            <div>${(activity.distance * 0.000621371192).toFixed(2)}mi</div>
            <div>${(activity.elevation_gain * 0.3048).toFixed(1)}ft</div>
          </div>
        </div>
      `
        )
        .join("\n")}
    </div>
  </div>
  `;
};
