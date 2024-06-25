CREATE PROCEDURE GetAllUsers
AS
BEGIN
    SELECT * FROM Users  where isDeleted = 0;
END;

Drop procedure if exists GetAllUsers;