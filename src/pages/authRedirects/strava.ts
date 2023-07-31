import { createSbServerClient } from "../../util/supabaseAuthUtil";
import { Request, Response } from "express";
import { strava } from "../../util/stravaUtil";

export const stravaAuthRedirect = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    if (!code) {
      console.error("no code provided to /exchangeStravaCode");
      res.redirect("/");
      return;
    }
    const stravaResp = await strava.oauth.getToken(code);
    const supabase = createSbServerClient({
      req,
      res,
    });
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    if (!session) throw new Error("No session in strava.ts");
    const userId = session?.user.id;
    const { error: upsertError } = await supabase.from("user_meta").upsert({
      user_id: userId,
      strava_token_expires_in: stravaResp.expires_in,
      strava_token_expires_at: stravaResp.expires_at,
      strava_refresh_token: stravaResp.refresh_token,
      strava_access_token: stravaResp.access_token,
      strava_firstname: stravaResp.firstname,
      strava_lastname: stravaResp.lastname,
      strava_profile_pic_url: stravaResp.profile,
      strava_id: stravaResp.id,
    });
    if (upsertError) throw upsertError;
    res.redirect("/stravaSettings");
  } catch (e) {
    console.error(e);
    res.redirect("/stravaSettings");
  }
};
