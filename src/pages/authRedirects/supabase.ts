import { Request, Response } from "express";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../util/env";
import { createSbServerClient } from "../../util/supabaseAuthUtil";

export const supabaseAuthRedirect = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (code) {
    const supabase = createSbServerClient({
      req,
      res,
    });
    await supabase.auth.exchangeCodeForSession(code);
    res.redirect("/");
  }
};
