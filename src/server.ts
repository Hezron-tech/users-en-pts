import express, { json } from "express";
import router from "./Routes/router";

const app = express();


app.use(json());

app.use("/users", router);

app.listen(5000, () => {
  console.log("server is running");
});
