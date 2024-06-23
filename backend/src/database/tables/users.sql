CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL,  -- 'user' or 'admin'
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    profilePhoto VARCHAR(255),  -- Optional field for storing profile photo URL
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE() 
);

select * from Users
drop table Users