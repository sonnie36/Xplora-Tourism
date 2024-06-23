CREATE PROCEDURE AddReview
    @id VARCHAR(255),
    @userId VARCHAR(255),
    @tourId VARCHAR(255),
    @reviewText VARCHAR(MAX),
    @rating INT
AS
BEGIN
    INSERT INTO reviews (id, userId, tourId, reviewText, rating, reviewDate)
    VALUES (@id, @userId, @tourId, @reviewText, @rating, GETDATE());
END;