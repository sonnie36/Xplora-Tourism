CREATE TABLE reviews (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    tourId VARCHAR(255) NOT NULL,
    reviewText VARCHAR(MAX),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    reviewDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (tourId) REFERENCES tours(id)
);

select * from reviews;
drop table reviews