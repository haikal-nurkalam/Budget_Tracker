import Express from "express";
import cors from "cors"; // For allowing API requests from React application
import db from "./models/index.js";
import { userController } from "./controller/userController.js";
import { transactionRouter } from "./controller/transactionController.js";
import { categoryRouter } from "./controller/categoryController.js";

const PORT = 3001;

const app = Express();

// Middleware
app.use(cors());
app.use(Express.json()); // To parse JSON bodies
app.use("/user", userController);
app.use("/transaction", transactionRouter);
app.use("/category", categoryRouter);
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

db.sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Unable to create the database tables:", error);
  });

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
