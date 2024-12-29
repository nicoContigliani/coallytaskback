# 🚀 Tasks API - Modern Node.js API for Task Management

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

A robust RESTful API built with Node.js for efficient task management, featuring JWT authentication, MongoDB integration, and a clean architecture.

## 🚀 Project Deploy 

Api: https://coallytaskback.up.railway.app
Front:https://coallytaskfront.netlify.app/login



## 🚀 Documentation Swagger 

https://coallytaskback.up.railway.app/doc_swagger

## 🌟 Features

- **JWT Authentication**: Secure endpoint access with JSON Web Tokens
- **MongoDB Integration**: Persistent data storage with MongoDB
- **Clean Architecture**: Organized codebase with DAO/DTO pattern
- **Input Validation**: Request validation using express-validator
- **Swagger Documentation**: API documentation with OpenAPI specification
- **Error Handling**: Comprehensive error management system

## 👨‍💻 Developer

**Nicolás Contigliani**  
💼 Full-Stack Developer  
📧 [nico.contigliani@gmail.com](mailto:nico.contigliani@gmail.com)

## 🏗️ Project Structure

```
tasks-api/
├── index.js                 # Application entry point
├── src/
│   ├── apiservices/        # API services and routes
│   │   ├── auth/           # Authentication endpoints
│   │   │   └── authRoutes.js
│   │   └── tasks/          # Tasks endpoints
│   │       ├── tasksController.js
│   │       ├── tasksDao.js
│   │       ├── tasksDto.js
│   │       └── tasksRoutes.js
│   ├── config/             # Configuration files
│   │   ├── db.js          # Database configuration
│   │   └── swagger.js      # Swagger documentation setup
│   ├── middleware/         # Custom middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── models/            # Database models
│   │   └── Task.js        # Task mongoose model
│   ├── services/          # Business logic services
│   └── tools/             # Utility functions
│       └── express_validations.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nicoContigliani/coallytaskback
   cd coallytaskback
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   
   # MongoDB Configuration
   MONGO_URI=your_local_mongodb_uri
   MONGO_URI_ATLAS=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your_database?retryWrites=true&w=majority
   
   # Authentication
   SECRET_KEY_JWT=your_jwt_secret_key
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

## 🔒 Authentication

The API implements a static authentication system for demonstration purposes:

1. **Obtain JWT Token**
   - Endpoint: `POST http://localhost:5000/api/auth/`
   - This endpoint provides a JWT token for accessing protected routes

2. **Using the Token**
   - Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

## 🛣️ API Endpoints

### Authentication
| Method | Endpoint      | Description          | Auth Required |
|--------|--------------|---------------------|---------------|
| POST   | /api/auth/   | Get JWT token       | No           |

### Tasks
| Method | Endpoint      | Description          | Auth Required | Success Code | Error Codes    |
|--------|--------------|---------------------|---------------|--------------|----------------|
| GET    | /tasks       | List all tasks      | Yes          | 200         | 401, 500       |
| GET    | /tasks/:id   | Get task by ID      | Yes          | 200         | 401, 404, 500  |
| POST   | /tasks       | Create new task     | Yes          | 201         | 401, 400, 500  |
| PUT    | /tasks/:id   | Update task         | Yes          | 200         | 401, 404, 500  |
| DELETE | /tasks/:id   | Delete task         | Yes          | 200         | 401, 404, 500  |

## 🏛️ Architecture

### Data Access Layer
- **DAO (Data Access Object)**: Handles database operations
- **DTO (Data Transfer Object)**: Formats response data
- **Models**: Defines database schemas

### Middleware
- **Authentication**: JWT verification
- **Validation**: Request data validation
- **Error Handling**: Global error management

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT implementation
- **dotenv**: Environment configuration
- **cors**: Cross-origin resource sharing
- **express-validator**: Input validation
- **swagger-ui-express**: API documentation

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```

### API Documentation
Access Swagger documentation at:
```
http://localhost:5000/api-docs
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐️ If you find this project useful, please consider giving it a star!

Made with ❤️ by Nicolás Contigliani