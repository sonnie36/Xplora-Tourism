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
exports.AdminService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../config/sql.config");
const uuid_1 = require("uuid");
class AdminService {
    createTour(tour) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield (yield pool.request()
                .input('id', (0, uuid_1.v4)())
                .input('title', tour.title)
                .input('description', tour.description)
                .input('destination', tour.destination)
                .input('duration', tour.duration)
                .input('price', tour.price)
                .input('tourType', tour.tourType)
                .input('startDate', tour.startDate)
                .input('endDate', tour.endDate)
                .input('maxParticipants', tour.maxParticipants)
                .input('availableSlots', tour.availableSlots)
                .input('image', tour.image || null)
                .execute("AddTour")).rowsAffected;
            if (result[0] == 1) {
                return { message: "Tour created successfully" };
            }
            else {
                return { error: "Unable to create tour" };
            }
        });
    }
    updateTour(tour) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const result = yield pool.request()
                .input('id', tour.id)
                .input('title', tour.title)
                .input('description', tour.description)
                .input('destination', tour.destination)
                .input('duration', tour.duration)
                .input('price', tour.price)
                .input('tourType', tour.tourType)
                .input('startDate', tour.startDate)
                .input('endDate', tour.endDate)
                .input('maxParticipants', tour.maxParticipants)
                .input('availableSlots', tour.availableSlots)
                .input('image', tour.image || null)
                .execute('UpdateTour');
            if (result.rowsAffected[0] === 1) {
                return { message: 'Tour updated successfully' };
            }
            else {
                return { error: 'Unable to update tour' };
            }
        });
    }
    softDeleteTour(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const result = yield pool.request()
                .input('id', id)
                .execute('SoftDeleteTour');
            if (result.rowsAffected[0] === 1) {
                return { message: 'Tour deleted successfully' };
            }
            else {
                return { error: 'Unable to delete tour' };
            }
        });
    }
    getAllTours() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const result = yield pool.request().execute('GetAllTours');
            return result.recordset;
        });
    }
    getToursByType(tourType) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const result = yield pool.request()
                .input('tourType', tourType)
                .execute('GetToursByType');
            return result.recordset;
        });
    }
}
exports.AdminService = AdminService;
