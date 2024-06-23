CREATE PROCEDURE GetToursByType
    @tourType VARCHAR(255)
AS
BEGIN
    SELECT * FROM tours WHERE tourType = @tourType AND isDeleted = 0;
END;