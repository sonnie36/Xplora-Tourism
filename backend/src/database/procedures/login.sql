CREATE PROCEDURE GetUserByEmail
    @Email VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id,
        username,
        email,
        password,
        role,
        firstName,
        lastName,
        profilePhoto,
        createdAt,
        updatedAt
    FROM Users
    WHERE email = @Email;
END;
