CREATE PROCEDURE SoftDeleteTour
    @id VARCHAR(255)
AS
BEGIN
    UPDATE tours SET isDeleted = 1 WHERE id = @id;
END;

    