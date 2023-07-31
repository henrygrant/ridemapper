import { createSbServerClient } from "../util/supabaseAuthUtil";
import { Request, Response } from "express";
import { mainView, authenticatedView, signInView } from "../views";

export const home = async (req: Request, res: Response) => {
  const supabase = createSbServerClient({
    req,
    res,
  });
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error(error);
  }
  res.send(
    !!data.session
      ? mainView(authenticatedView(/* html */ `<div>Home</div>`))
      : mainView(signInView())
  );
};
