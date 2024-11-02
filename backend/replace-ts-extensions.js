import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, "dist");

function replaceImportExtensions(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const updatedContent = content.replace(
    /from\s+['"](.+?)\.ts['"]/g,
    (match, p1) => {
      return `from '${p1}.js'`;
    }
  );
  fs.writeFileSync(filePath, updatedContent, "utf8");
}

function processDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);

      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.error("Error stating file.", error);
          return;
        }

        if (stat.isFile() && filePath.endsWith(".js")) {
          replaceImportExtensions(filePath);
        } else if (stat.isDirectory()) {
          processDirectory(filePath);
        }
      });
    });
  });
}

processDirectory(directoryPath);
