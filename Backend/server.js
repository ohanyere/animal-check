import { handler } from "./middlewear/routemiddlewear.js"
import express from "express"
import { PORT } from "./config/env.js"
import cors from "cors"
import diagnose from "./routes/diagnose.js"
import { fileURLToPath } from "url";
import path from "path"

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(handler)

app.use("/api/diagnose", diagnose)

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

 
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) =>
    res.json({ message: "Welcome to livestock disease detector" })
  );
}
app.listen(PORT, () => console.log(`server started on port ${PORT}`))