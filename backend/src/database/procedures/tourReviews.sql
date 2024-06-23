CREATE PROCEDURE GetReviewsForTour
    @tourId VARCHAR(255)
AS
BEGIN
    SELECT * FROM reviews WHERE tourId = @tourId;
END;