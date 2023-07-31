import { Request, Response } from "express";
import { authenticatedView, signInView, signUpView } from "../../views";

export const authenticatedPartial = async (req: Request, res: Response) => {
  res.send(authenticatedView(/* html */ `<div>Home</div>`));
};

export const signInPartial = async (req: Request, res: Response) => {
  res.send(signInView());
};

export const signUpPartial = async (req: Request, res: Response) => {
  res.send(signUpView());
};

export const checkEmailPartial = async (req: Request, res: Response) => {
  res.send(/* html */ `<div>check your email</div>`);
};
