CREATE TABLE bookings (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    tourId VARCHAR(255) NOT NULL,
    bookingDate DATETIME DEFAULT GETDATE(),
    status VARCHAR(50) DEFAULT 'Notbooked',
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (tourId) REFERENCES tours(id)
);

select * from bookings