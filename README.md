# Tasks API - Node.js API for Task Management

This Node.js application provides a RESTful API for managing tasks. It allows you to:

- List all tasks
- Get a specific task by ID
- Create a new task
- Update an existing task
- Delete a task

Developed by:
**Nicolás Contigliani**  
**Email:** nico.contigliani@gmail.com  
**Role:** Fullstack Programmer

---

## Running the Application

This application runs from the `index.js` file instead of a `server.js` file.

### Steps to Start the Application:

1. **Clone the Repository**
   
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install the Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**

   ```bash
   node index.js
   ```

This will start the server and listen for incoming requests.

---

## API Endpoints

| Endpoint      | Method | Description                       | Success Status Code | Error Status Code              |
|---------------|--------|-----------------------------------|----------------------|-------------------------------|
| `/tasks`      | GET    | Retrieves all tasks               | 200                  | 500                           |
| `/tasks/:id`  | GET    | Retrieves a specific task by ID   | 200 (if found)       | 404 (if not found), 500       |
| `/tasks`      | POST   | Creates a new task                | 201                  | 500                           |
| `/tasks/:id`  | PUT    | Updates an existing task          | 200 (if found)       | 404 (if not found), 500       |
| `/tasks/:id`  | DELETE | Deletes a task                    | 200 (if found)       | 404 (if not found), 500       |

---

## Data Transfer Object (DTO)

This application utilizes a **Data Transfer Object (DTO)** to format the response data for tasks. The DTO is defined in the `tasksDto.js` file.

---

## Dependencies

This application depends on the following npm packages:

- **Express**: Web framework for handling routes and requests.

---

## Additional Notes

- **Error Handling**: Error handling is implemented for all API endpoints to provide informative error messages in case of issues.
- **Asynchronous Syntax**: The code utilizes `async/await` syntax for cleaner and more readable handling of asynchronous operations.

---

