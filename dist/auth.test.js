"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app")); // Import your Express app
describe('Authentication Controller', () => {
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({ username: 'testUser', password: 'testPassword' });
        (0, chai_1.expect)(response.status).to.equal(201);
        (0, chai_1.expect)(response.body).to.have.property('message', 'User registered successfully');
    }));
    it('should log in a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ username: 'testUser', password: 'testPassword' });
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.body).to.have.property('token');
    }));
});
