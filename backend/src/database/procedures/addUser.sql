CREATE PROCEDURE CreateUser
    @id VARCHAR(255),
    @username VARCHAR(50),
    @password VARCHAR(255),
    @email VARCHAR(100),
    @role VARCHAR(20),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @profilePhoto VARCHAR(255)   -- Default to NULL if not provided
AS
BEGIN
  
        INSERT INTO Users (id, username, password, email, role, firstName, lastName, profilePhoto, createdAt, updatedAt)
        VALUES (@id, @username, @password, @email, @role, @firstName, @lastName, @profilePhoto, GETDATE(), GETDATE());

END;

 drop procedure CreateUser
