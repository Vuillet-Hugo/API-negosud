import express from "express";
import helmet from "helmet";
import cors from "cors";

// import indexRouter from "./routes/index.js";
import produitRouter from "./routes/produits.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import orderRouter from "./routes/order.js";

import catch404Errors from "./midlewares/catch404errors.js";
import catchAllErrors from "./midlewares/catchAllErrors.js";

const app = express();

app.use(helmet()); //sécurité
app.use(cors()); //sécurité liée aux clients web
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use("/", indexRouter);
app.use("/produits", produitRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/orders", orderRouter);

app.use(catch404Errors);

app.use(catchAllErrors);

export default app;
