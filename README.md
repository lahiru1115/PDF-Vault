# PDF Vault

Welcome to PDF Vault, a simple MERN stack application that allows users to upload and view PDF files. This project also includes basic logging functionality and ensures data security through tracing methods. The application is designed with a user-friendly interface and adheres to modern UI design trends.


## Features

- **Home Page**:
  - Form to upload PDF files.
  - List of uploaded PDFs with links to view each PDF.

- **PDF Viewer Page**:
  - Page to view the selected PDF files.

- **User Authentication**:
  - Sign up, log in, and log out functionalities.
  - Protected routes to ensure only authenticated users can upload and view PDFs.


## Technologies Used

### Frontend
- **React** for building the user interface.
- **Ant Design** for UI components.
- **Axios** for making HTTP requests.
- **React-PDF** for displaying PDF files.

### Backend
- **Node.js** and **Express.js** for the server.
- **MongoDB** for the database.
- **Mongoose** for MongoDB object modeling.
- **JSON Web Token** for authentication.
- **Winston** and **Morgan** for logging.


## Setup

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/lahiru1115/PDF-Vault.git
   cd PDF-Vault/pdf_vault_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `pdf_vault_backend` directory with the following contents:
     ```plaintext
     PORT=5000
     CORS_ORIGIN=http://localhost:3000
     MONGO_URI=<Your MongoDB URI>
     JWT_SECRET=<Your JWT Secret>
     ```

4. Run the backend server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../pdf_vault_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend server:
   ```bash
   npm start
   ```

4. Open the application in your browser at `http://localhost:3000`.


## Logging

Logging is implemented using Winston and Morgan. All API requests are logged to ensure traceability and aid in debugging.


## Data Security

To ensure data integrity and confidentiality:
- Sensitive data is encrypted before storage.
- Role-based access control (RBAC) is implemented to secure data access.


## Acknowledgements

This project extends its gratitude to the resources and contributors that have helped in its development.

---

Enjoy using PDF Vault!