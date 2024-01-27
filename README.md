**# IntelliQuiz **

This is a Quiz Application built with Java Spring Boot for the backend, MySQL for the database, and Angular for the frontend.

## Features

- User authentication and authorization
- Quiz creation and management
- Quiz-taking functionality
- Score tracking and history
- User-friendly interface

## Technologies Used

- **Backend:**
  - Java Spring Boot
  - Spring Security for authentication and authorization
  - MySQL for data storage
  - Hibernate ORM for database interaction

- **Frontend:**
  - Angular for the user interface
  - Angular CLI for project scaffolding and development
  - Angular Material for UI components

## Prerequisites

Before running the application, ensure you have the following installed:

- Java Development Kit (JDK)
- Node.js and npm (Node Package Manager)
- Angular CLI
- MySQL Database

## Getting Started

### Backend (Java Spring Boot)

1. Clone the repository:

   ```bash
   git clone https://github.com/ashwinicode/IntelliQuiz.git

    Navigate to the backend folder:

    bash

cd quiz-application/backend

Open src/main/resources/application.properties and configure your MySQL database settings.

Run the Spring Boot application:

bash

    ./mvnw spring-boot:run

    The backend server will run at http://localhost:8080.

Frontend (Angular)

    Navigate to the frontend folder:

    bash

cd quiz-application/frontend

Install dependencies:

bash

npm install

Run the Angular application:

bash

    ng serve

    The frontend server will run at http://localhost:4200.

    Open your browser and go to http://localhost:4200 to access the IntelliQuiz

Database Setup

Create a MySQL database named quizdb and import the SQL script provided in backend/src/main/resources/database/quizdb.sql.
Contributing

Feel free to contribute to the development of this project. Fork the repository, make your changes, and submit a pull request.



