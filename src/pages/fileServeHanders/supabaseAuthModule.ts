import { Request, Response } from "express";

import * as path from "path";
import * as fs from "fs";
export const supabaseAuthModule = (req: Request, res: Response) => {
  fs.readFile(
    path.join(__dirname, "../../../", "out", "supabaseAuthModule.js"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(404);
      } else {
        res.contentType("application/javascript");
        res.send(data);
      }
    }
  );
};
