"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createGenerator_1 = require("./createGenerator");
const app = express_1.default();
const port = 3333;
const indexHtml = fs_1.default.readFileSync(path_1.default.resolve('./src/app/index.html'), 'utf8');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        app
            .use('/generate', createGenerator_1.createGenerator(indexHtml))
            .use(express_1.default.static(path_1.default.join(__dirname, '../../www/')));
        app.listen(port, () => console.log(`server started at http://localhost:${port}/`));
    });
}
run();
