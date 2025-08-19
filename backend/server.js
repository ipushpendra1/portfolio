import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import config from "./src/config/config.js";

connectDB();

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  })
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
