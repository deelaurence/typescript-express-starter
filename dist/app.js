"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/user-auth")
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
// Use the authentication routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api", dashboard_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
