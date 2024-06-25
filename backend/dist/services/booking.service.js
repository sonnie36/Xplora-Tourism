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
exports.BookingService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../config/sql.config");
const uuid_1 = require("uuid");
class BookingService {
    bookTour(userId, tourId) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield pool.request()
                .input('id', (0, uuid_1.v4)())
                .input('userId', userId)
                .input('tourId', tourId)
                .execute('BookTour');
            if (result.rowsAffected[0] === 1) {
                return { message: 'Tour booked successfully' };
            }
            else {
                return { error: 'Unable to book tour' };
            }
        });
    }
    getUserBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield pool.request()
                .input('userId', userId)
                .query('SELECT * FROM bookings WHERE userId = @userId');
            return result.recordset;
        });
    }
    cancelBooking(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield pool.request()
                .input('id', bookingId)
                .query('DELETE FROM bookings WHERE id = @id');
            if (result.rowsAffected[0] === 1) {
                return { message: 'Booking canceled successfully' };
            }
            else {
                return { error: 'Unable to cancel booking' };
            }
        });
    }
    updateBookingStatus(bookingId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield pool.request()
                .input('id', bookingId)
                .input('status', status)
                .query('UPDATE bookings SET status = @status WHERE id = @id');
            if (result.rowsAffected[0] === 1) {
                return { message: 'Booking status updated successfully' };
            }
            else {
                return { error: 'Unable to update booking status' };
            }
        });
    }
}
exports.BookingService = BookingService;
