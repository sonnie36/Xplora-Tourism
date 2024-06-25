CREATE PROCEDURE SoftDeleteUser
    @id VARCHAR(255)
AS
BEGIN
    UPDATE users SET isDeleted = 1 WHERE id = @id;
END;
