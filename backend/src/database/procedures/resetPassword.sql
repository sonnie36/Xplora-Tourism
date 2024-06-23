CREATE PROCEDURE ResetPassword
    @id VARCHAR(255),
    @password VARCHAR(255)
AS
BEGIN
    -- Update the password for the user with the specified ID
    UPDATE Users
    SET password = @password,
        updatedAt = GETDATE()  -- Update the updatedAt field to the current date and time
    WHERE id = @id;
    
END;