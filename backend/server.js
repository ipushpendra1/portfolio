import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
