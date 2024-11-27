import express from "express";
import path from "path";

const serveStaticFiles = (app) => {
  // This serves static files from the '/uploads' directory
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
};

export default serveStaticFiles;
