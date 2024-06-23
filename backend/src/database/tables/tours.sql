CREATE TABLE tours (
    id VARCHAR(255) PRIMARY KEY, 
    title VARCHAR(255) NOT NULL,      
    description VARCHAR(MAX) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    duration INT NOT NULL,             
    price DECIMAL(10, 2) NOT NULL,     
    tourType VARCHAR(255) NOT NULL,  
    startDate DATE NOT NULL,       
    endDate DATE NOT NULL,          
    maxParticipants INT NOT NULL,     
    availableSlots INT NOT NULL,     
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    isDeleted BIT DEFAULT 0        
);

select * from tours;
drop table if exists tours;