
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());




app.listen(5200, () => {
  console.log("running 5200");
});
