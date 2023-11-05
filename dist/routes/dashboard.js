"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middleware/authentication"));
const router = express_1.default.Router();
const dashboard_1 = __importDefault(require("../controllers/dashboard"));
// Define a route for the dashboard
router.get('/dashboard', authentication_1.default, dashboard_1.default);
exports.default = router;
