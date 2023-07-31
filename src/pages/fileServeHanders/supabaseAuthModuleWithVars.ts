import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../util/env";
import { Request, Response } from "express";

import * as path from "path";
import * as fs from "fs";
export const supabaseAuthModuleWithVars = (req: Request, res: Response) => {
  fs.readFile(
    path.join(
      __dirname,
      "../../../",
      "public",
      "scripts",
      "supabaseAuthModule.js"
    ),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(404);
      } else {
        const toSend = data
          .toString()
          .replace("SUPABASE_URL_REPLACE_ME", SUPABASE_URL)
          .replace("SUPABASE_ANON_KEY_REPLACE_ME", SUPABASE_ANON_KEY);
        res.contentType("application/javascript");
        res.send(toSend);
      }
    }
  );
};
