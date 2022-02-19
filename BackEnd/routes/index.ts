import express from "express";
import type { Express } from "express-serve-static-core";
const router = express.Router();

function routes(app: Express) {
  router.get("/", (req, res) => {
    res.end("Welcome to the depth of the ocean");
  });

  return router
}



export default routes