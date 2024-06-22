CREATE PROCEDURE AddTour
    @id VARCHAR (255),
    @title VARCHAR(255),
    @description VARCHAR(MAX),
    @destination VARCHAR(255),
    @duration INT,
    @price DECIMAL(10, 2),
    @tourType VARCHAR(255),
    @startDate DATE,
    @endDate DATE,
    @maxParticipants INT,
    @availableSlots INT
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
        availableSlots
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
        @availableSlots
    );
END;

DROP PROCEDURE IF EXISTS AddTour;