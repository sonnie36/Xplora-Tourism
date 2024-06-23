CREATE PROCEDURE BookTour
    @id VARCHAR(255),
    @userId VARCHAR(255),
    @tourId VARCHAR(255)
AS
BEGIN
    INSERT INTO bookings (id, userId, tourId, bookingDate, status)
    VALUES (@id, @userId, @tourId, GETDATE(), 'Booked');
    
    -- Update available slots
    UPDATE tours
    SET availableSlots = availableSlots - 1
    WHERE id = @tourId AND availableSlots > 0;
END;