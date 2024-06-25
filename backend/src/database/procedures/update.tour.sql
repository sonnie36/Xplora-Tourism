CREATE PROCEDURE UpdateTour
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
    @image VARCHAR(255)  -- Parameter for the image
AS
BEGIN
    UPDATE tours
    SET 
        title = @title,
        description = @description,
        destination = @destination,
        duration = @duration,
        price = @price,
        tourType = @tourType,
        startDate = @startDate,
        endDate = @endDate,
        maxParticipants = @maxParticipants,
        availableSlots = @availableSlots,
        image = @image,  -- Update the image column
        updatedAt = GETDATE()
    WHERE id = @id;
END;


DROP PROCEDURE IF EXISTS UpdateTour;
