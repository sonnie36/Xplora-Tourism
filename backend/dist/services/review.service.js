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
exports.ReviewService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../config/sql.config");
const uuid_1 = require("uuid");
class ReviewService {
    addReview(userId, tourId, reviewText, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield pool.request()
                .input('id', (0, uuid_1.v4)())
                .input('userId', userId)
                .input('tourId', tourId)
                .input('reviewText', reviewText)
                .input('rating', rating)
                .execute('AddReview');
            if (result.rowsAffected[0] === 1) {
                return { message: 'Review added successfully' };
            }
            else {
                return { error: 'Unable to add review' };
            }
        });
    }
    getReviewsForTour(tourId) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield pool.request()
                .input('tourId', tourId)
                .execute('GetReviewsForTour');
            return result.recordset;
        });
    }
}
exports.ReviewService = ReviewService;
