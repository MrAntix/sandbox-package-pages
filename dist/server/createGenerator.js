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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const stencil = __importStar(require("../../dist/hydrate"));
function createGenerator(indexHtml) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        const name = req.query.name;
        if (!name)
            throw new Error('name is required, e.g. generate?name=something');
        const destUrl = `/packages/${name}`;
        const renderedHtml = yield stencil.renderToString(indexHtml, {
            url: destUrl,
            removeBooleanAttributeQuotes: true
        });
        const destDir = path_1.default.join(__dirname, '../../www/packages', name);
        const destFile = path_1.default.join(destDir, 'index.html');
        yield fs_1.default.promises.mkdir(destDir, { recursive: true }).catch(console.log);
        yield fs_1.default.promises.writeFile(destFile, renderedHtml.html);
        res.redirect(destUrl);
    });
}
exports.createGenerator = createGenerator;
