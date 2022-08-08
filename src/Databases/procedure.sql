CREATE PROCEDURE createUsers(@id VARCHAR(100), @username VARCHAR(100), @email VARCHAR(100))
AS
BEGIN
INSERT INTO users(id,username,email) VALUES (@id,@username,@email)

END