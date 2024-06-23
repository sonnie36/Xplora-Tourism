CREATE PROCEDURE UpdateUser
    @id VARCHAR(255),
    @username VARCHAR(50),
    @email VARCHAR(100),
    @password VARCHAR(255),
    @role VARCHAR(20),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @profilePhoto VARCHAR(255) = NULL
AS
BEGIN
    UPDATE Users
    SET username = @username,
        email = @email,
        password = @password,
        role = @role,
        firstName = @firstName,
        lastName = @lastName,
        updatedAt = GETDATE(),
        profilePhoto = CASE WHEN @profilePhoto IS NOT NULL THEN @profilePhoto ELSE profilePhoto END
    WHERE id = @id;
END;

drop procedure if exists UpdateUser;