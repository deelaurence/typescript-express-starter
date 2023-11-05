"use strict";
// tests/auth.test.ts
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
const app_1 = __importDefault(require("./app")); // Import your Express app
const supertest_1 = __importDefault(require("supertest"));
describe('Authentication', () => {
    it('should return a JWT token on successful login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/auth/login')
            .send({ username: 'testUser', password: 'testPassword' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    }));
    it('should return an error on unsuccessful login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/auth/login')
            .send({ username: 'nonExistentUser', password: 'wrongPassword' });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Unauthorized');
    }));
});
