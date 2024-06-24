
CREATE PROCEDURE AddTour
    @id VARCHAR(255),
    @title VARCHAR(255),
    @description VARCHAR(MAX),
    @destination VARCHAR(255),
    @duration INT,
    @price DECIMAL(10, 2),
    @tourType VARCHAR(255),
    @startDate DATE,
    @endDate DATE,
    @maxParticipants INT,
    @availableSlots INT,
    @image VARCHAR(255)  -- New parameter for the image
AS
BEGIN
    INSERT INTO tours (
        id,
        title, 
        description, 
        destination, 
        duration, 
        price, 
        tourType, 
        startDate, 
        endDate, 
        maxParticipants, 
        availableSlots,
        image  -- New column to insert into
    ) VALUES (
        @id,
        @title, 
        @description, 
        @destination, 
        @duration, 
        @price, 
        @tourType, 
        @startDate, 
        @endDate, 
        @maxParticipants, 
        @availableSlots,
        @image  -- New value to insert
    );
END;
DROP PROCEDURE IF EXISTS AddTour;