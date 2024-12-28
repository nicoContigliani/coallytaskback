tasks-api - Node.js API for Task Management
This Node.js application provides a RESTful API for managing tasks. It allows you to:

List all tasks
Get a specific task by ID
Create a new task
Update an existing task
Delete a task
Developed by Nicolás Contigliani (nico.contigliani@gmail.com)
Fullstack Programmer

Running the application:

This application runs from the index.js file instead of a server.js file. To start the application:

Clone this repository or download the code.

Install the dependencies:

Bash

npm install
Run the application:

Bash

node index.js
This will start the server and listen for incoming requests.

API Endpoints:

Endpoint	Method	Description	Success Status Code	Error Status Code
/tasks	GET	Retrieves all tasks	200	500
/tasks/:id	GET	Retrieves a specific task by ID	200 (if found)	404 (if not found)
/tasks	POST	Creates a new task	201	500
/tasks/:id	PUT	Updates an existing task	200 (if found)	404 (if not found)
/tasks/:id	DELETE	Deletes a task	200 (if found)	404 (if not found)

Exportar a Hojas de cálculo
Data Transfer Object (DTO):

This application utilizes a Data Transfer Object (DTO) to format the response data for tasks. The DTO is defined in the tasksDto.js file.

Dependencies:

This application depends on the following npm packages:

Express (web framework)
Additional Notes:

Error handling is implemented for all API endpoints to provide informative error messages in case of issues.
The code utilizes asynchronous/await syntax for cleaner and more readable handling of asynchronous operations.
