CREATE PROCEDURE CreateUser
    @id VARCHAR(255),
    @username VARCHAR(50),
    @password VARCHAR(255),
    @email VARCHAR(100),
    @role VARCHAR(20),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @profilePhotoUrl VARCHAR(255) = NULL  -- Default to NULL if not provided
AS
BEGIN
  
        INSERT INTO Users (id, username, password, email, role, firstName, lastName, profilePhotoUrl, createdAt, updatedAt)
        VALUES (@id, @username, @password, @email, @role, @firstName, @lastName, @profilePhotoUrl, GETDATE(), GETDATE());

END;

 drop procedure CreateUser
