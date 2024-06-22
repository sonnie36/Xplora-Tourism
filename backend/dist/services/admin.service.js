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
            console.log(tour.title);
            console.log("Tour object:", tour);
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
                .execute("AddTour")).rowsAffected;
            if (result[0] == 1) {
                return {
                    message: "Account created successfully"
                };
            }
            else {
                return {
                    error: "Unable to create Account"
                };
            }
        });
    }
    updateTour(tour) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                    .execute('UpdateTour');
                if (result.rowsAffected[0] === 1) {
                    return { message: 'Tour updated successfully' };
                }
                else {
                    return { error: 'Unable to update tour' };
                }
            }
            catch (error) {
                console.error('Error updating tour:', error);
                throw error;
            }
        });
    }
    softDeleteTour(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
            }
            catch (error) {
                console.error('Error deleting tour:', error);
                throw error;
            }
        });
    }
    getAllTours() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = mssql_1.default.connect(sql_config_1.sqlConfig);
                const result = (yield pool).request()
                    .execute('GetAllTours');
            }
            catch (error) {
                console.error('Error getting all tours:', error);
                throw error;
            }
        });
    }
}
exports.AdminService = AdminService;
