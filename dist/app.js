"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index_routes"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(morgan_1.default('common', { skip: function (req, res) { return res.statusCode < 400; }, stream: __dirname + '/../morgan.log' }));
// Routes
app.use(index_routes_1.default);
app.listen(3000, () => {
    console.log('Server on port', 3000);
});
//# sourceMappingURL=app.js.map