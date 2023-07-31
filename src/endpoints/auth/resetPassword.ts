import { HOST } from "../../util/env";
import { createSbServerClient } from "../../util/supabaseAuthUtil";
import { Request, Response } from "express";
import { signInView } from "../../views";

export const resetPassword = async (req: Request, res: Response) => {
  const supabase = createSbServerClient({
    req,
    res,
  });
  if (!req.body.email) {
    res.send(signInView("enter your email first"));
    return;
  }
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    req.body.email as string,
    {
      redirectTo: `http://${HOST}/updatePassword`,
    }
  );
  if (error) {
    console.error(error);
    res.send(signInView("error resetting password"));
  } else {
    res.send(signInView("check your email"));
  }
};
