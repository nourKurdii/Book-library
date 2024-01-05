# Book-library
https://drive.google.com/file/d/1WZ65VQJLdTc8u0YNC58iKGwSbNDTx4J7/view?usp=sharing
# Authentication Endpoints

## Signup (POST /signup)
- **Functionality**: Registers a new user.
- **Error Handling**:
  - If the provided email already exists, it throws an error indicating 'Email already exists'.
  - If any unexpected error occurs during the signup process, it responds with a generic 'Failed to sign up' message.
- **Response Structure**:
  - Successful signup: Returns a status code 201 with a JSON response indicating 'Signed up successfully'.
  - Error case: Returns a status code 500 with a JSON response containing the specific error message.

## Login (POST /login)
- **Functionality**: Logs in a user.
- **Error Handling**:
  - If the user is not found, it responds with a 404 status code and a message 'User not found'.
  - If there's an error during password comparison or session creation, it responds with specific error messages.
- **Response Structure**:
  - Successful login: Returns a status code 200 with a JSON response 'Logged in successfully'.
  - Incorrect password: Returns a status code 401 with a message 'Invalid username or password'.
  - Error case: Returns a status code 500 with a JSON response containing the specific error message.

## Change Password (POST /changePassword)
- **Functionality**: Allows a user to change their password.
- **Error Handling**:
  - Handles missing required parameters (email, password, newPassword) with a 400 status and a message.
  - Validates the user and updates the password if the provided password matches the existing one.
- **Response Structure**:
  - Successful password update: Returns a status code 200 with a JSON response 'Password updated successfully'.
  - Incorrect credentials: Returns a status code 401 with a message 'Invalid username or password'.
  - Error case: Returns a status code 500 with a JSON response containing the specific error message.

## Logout (DELETE /logout)
- **Functionality**: Logs out a user and deletes all their sessions.
- **Error Handling**:
  - Handles cases where no sessions are found for the user with a 404 status and a message.
  - Handles errors during session deletion with a 500 status and a specific error message.
- **Response Structure**:
  - Successful logout: Returns a status code 200 with a JSON response 'Logged out successfully'.
  - No sessions found: Returns a status code 404 with a message 'No sessions found for the user'.
  - Error case: Returns a status code 500 with a JSON response containing the specific error message.

# Books Endpoints

## Add New Book (POST /books)
- **Functionality**: Adds a new book associated with the logged-in user (publisher).
- **Error Handling**:
  - Validation Errors:
    - Missing or invalid title or isbn fields result in a 400 status with specific error messages.
    - Non-existent publisher ID triggers a 400 status with an appropriate error.
  - General Errors: Any unexpected error leads to a 500 status with detailed error information.
- **Response Structure**:
  - Successful Book Addition: Returns a 201 status with a JSON response indicating 'Book added successfully'.
  - Error Responses: Validation or publisher errors return a 400 status with a JSON response containing specific error messages. Unexpected errors return a 500 status with a JSON response containing detailed error information.

## Get All Books (GET /books)
- **Functionality**: Retrieves all books with detailed information (including publishers and comments).
- **Error Handling**:
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Book Retrieval: Returns a 200 status with a JSON response containing book details.
  - Error Responses: Unexpected errors return a 500 status with a JSON response containing detailed error information.

## Get Specific Book by ID (GET /books/:id)
- **Functionality**: Retrieves a specific book by its ID along with associated publisher and comments.
- **Error Handling**:
  - Book Not Found: If the requested book is not found, it returns a 404 status with an appropriate error message.
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Book Retrieval: Returns a 200 status with a JSON response containing book details.
  - Error Responses: Book not found returns a 404 status with an error message. Unexpected errors return a 500 status with a JSON response containing detailed error information.

## Update Book by ID (PUT /books/:id)
- **Functionality**: Updates a book's details if the logged-in user is the book's publisher.
- **Error Handling**:
  - Unauthorized Access: If the logged-in user is not the book's publisher, it triggers a 400 status with an appropriate error message.
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Update: Returns a 200 status with a JSON response indicating 'Book updated successfully'.
  - Error Responses: Unauthorized access or unexpected errors return a 400 or 500 status, respectively, with detailed error information.

## Delete Book by ID (DELETE /books/:id)
- **Functionality**: Deletes a book if the logged-in user is the book's publisher.
- **Error Handling**:
  - Unauthorized Access: If the logged-in user is not the book's publisher, it triggers a 400 status with an appropriate error message.
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Deletion: Returns a 200 status with a JSON response indicating 'Book deleted successfully'.
  - Error Responses: Unauthorized access or unexpected errors return a 400 or 500 status, respectively, with detailed error information.

# Publishers Endpoints

## Add New Publisher (POST /publishers)
- **Functionality**: Validates and adds a new publisher.
- **Error Handling**:
  - Validation Errors:
    - Missing or invalid name field results in a 400 status with a specific error message.
    - If the publisher name already exists, it triggers a 400 status with an appropriate error.
  - General Errors: Any unexpected error leads to a 400 status with detailed error information.
- **Response Structure**:
  - Successful Publisher Addition: Returns a 201 status with a JSON response containing the newly created publisher.
  - Error Responses: Validation or duplication errors return a 400 status with a JSON response containing specific error messages. Unexpected errors return a 500 status with a JSON response containing detailed error information.

## Get All Publishers (GET /publishers)
- **Functionality**: Retrieves all publishers.
- **Error Handling**:
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Publisher Retrieval: Returns a 200 status with a JSON response containing an array of publishers.
  - Error Responses: Unexpected errors return a 500 status with a JSON response containing detailed error information.

## Get Specific Publisher by ID (GET /publishers/:id)
- **Functionality**: Retrieves a specific publisher by its ID.
- **Error Handling**:
  - Publisher Not Found: If the requested publisher is not found, it returns a 404 status with an appropriate error message.
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Publisher Retrieval: Returns a 200 status with a JSON response containing publisher details.
  - Error Responses: Publisher not found returns a 404 status with an error message. Unexpected errors return a 500 status with a JSON response containing detailed error information.

## Delete Publisher by ID (DELETE /publishers/:id)
- **Functionality**: Deletes a publisher if there are no associated books.
- **Error Handling**:
  - Associated Books Exist: If associated books are found, it triggers a 400 status with an appropriate error.
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Deletion: Returns a 200 status with a message indicating 'Publisher deleted successfully'.
  - Error Responses: Associated books exist or unexpected errors return a 400 or 500 status, respectively, with detailed error information.

## Get Books by Publisher ID (GET /publishers/:id/books)
- **Functionality**: Retrieves books associated with a specific publisher.
- **Error Handling**:
  - Publisher Not Found: If the requested publisher is not found, it returns a 500 status with an appropriate error message.
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Book Retrieval: Returns a 200 status with a JSON response containing an array of books associated with the publisher.
  - Error Responses: Publisher not found or unexpected errors return a 500 status with a JSON response containing detailed error information.

# Comments Endpoints

## Add New Comment (POST /comments)
- **Functionality**: Validates and adds a new comment.
- **Error Handling**:
  - Validation Errors:
    - Missing or invalid book_id field results in a 500 status with an appropriate error message.
    - If the associated book with the given ID does not exist, it triggers a 500 status with an appropriate error.
  - General Errors: Any unexpected error leads to a 500 status with detailed error information.
- **Response Structure**:
  - Successful Comment Addition: Returns a 201 status with a JSON response containing the newly created comment.
  - Error Responses: Validation or book not found errors return a 500 status with a JSON response containing specific error messages. Unexpected errors return a 500 status with a JSON response containing detailed error information.

## Delete Comment by ID (DELETE /comments/:id)
- **Functionality**: Deletes a comment based on its ID.
- **Error Handling**:
  - General Errors: Any unexpected error returns a 500 status with detailed error information.
- **Response Structure**:
  - Successful Deletion: Returns a 200 status with a message indicating 'Comment deleted successfully'.
  - Error Responses: Unexpected errors return a 500 status with a JSON response containing detailed error information.
