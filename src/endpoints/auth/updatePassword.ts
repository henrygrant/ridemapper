import { createSbServerClient } from "../../util/supabaseAuthUtil";
import { mainView, updatePasswordView, signInView } from "../../views";
import { Request, Response } from "express";

export const updatePasswordPage = async (req: Request, res: Response) => {
  const supabase = createSbServerClient({
    req,
    res,
  });
  res.send(mainView(updatePasswordView()));
};

/*
  handles user actually updating their password
*/
export const updatePassword = async (req: Request, res: Response) => {
  const supabase = createSbServerClient({
    req,
    res,
  });
  if (!req.body.password) {
    res.send(updatePasswordView("enter the new password first"));
    return;
  }
  const { error } = await supabase.auth.updateUser({
    password: req.body.password as string,
  });
  if (error) {
    console.error(error);
    res.send(signInView("error resetting password"));
  } else {
    res.redirect("/");
  }
};
