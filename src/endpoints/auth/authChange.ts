import { createSbServerClient } from "../../util/supabaseAuthUtil";
import { Request, Response } from "express";
import { authenticatedView, signInView } from "../../views";

export const authChange = async (req: Request, res: Response) => {
  const supabase = createSbServerClient({
    req,
    res,
  });
  const { data, error } = await supabase.auth.getSession();
  if (!data.session || error) {
    res.send(signInView());
  } else {
    res.send(authenticatedView("<div>Authenticated!</div>"));
  }
};
