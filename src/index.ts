import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as path from "path";
import {
  home,
  stravaAuthRedirect,
  supabaseAuthRedirect,
  supabaseAuthModule,
} from "./pages";
import {
  resetPassword,
  authChange,
  stravaSettings,
  signInPartial,
  signUpPartial,
  checkEmailPartial,
  authenticatedPartial,
  updatePassword,
  updatePasswordPage,
} from "./endpoints";
import { PORT, SUPABASE_ANON_KEY, SUPABASE_URL } from "./util/env";
import { map } from "./endpoints/map";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", [path.join(__dirname, "views")]);
app.use(express.static("public"));

app.route("/").get(home);
app.route("/exchangeStravaCode").get(stravaAuthRedirect);
app.route("/exchangeSupabaseCode").get(supabaseAuthRedirect);

app.get("/supabaseAuthModule.js", supabaseAuthModule);
app.post("/authChange", authChange);
app.post("/resetPassword", resetPassword);

/*
  page user comes back to after clicking reset the link in their email
*/
app.get("/updatePassword", updatePasswordPage);

/*
  handles user actually updating their password
*/
app.post("/updatePassword", updatePassword);

/*
  shows authenticated view 
*/
app.get("/authenticated", authenticatedPartial);
app.get("/signIn", signInPartial);
app.get("/signUp", signUpPartial);
app.get("/checkEmail", checkEmailPartial);
app.get("/stravaSettings", stravaSettings);
app.get("/map", map);

app.listen(PORT);
