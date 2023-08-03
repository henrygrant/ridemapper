import { createSbServerClient } from "../../util/supabaseAuthUtil";
import { Request, Response } from "express";
import { authenticatedView, mainView } from "../../views";
import { SupabaseClient } from "@supabase/supabase-js";

export const map = async (req: Request, res: Response) => {
  try {
    const supabase = createSbServerClient({
      req,
      res,
    });
    const userId = await getUserId(supabase);
    const userMeta = await getUserMeta(supabase, userId);
    const activities = await getActivities(supabase, userId);
    let ret = /* html */ `
      <div class="map-container">
        <div id="map"></div>      
      </div>
    `;
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
