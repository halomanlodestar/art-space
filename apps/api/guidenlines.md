# Project Architecture Guidelines

## Project Structure Guidelines

1. **Controller Layer**

   - Deals with the request-response side of the backend.
   - Responsible for handling incoming HTTP requests and sending responses.
   - May include throwing errors.

2. **Service Layer**

   - Handles business logic.
   - Fetches data from the repository layer.
   - Checks for Authorization.
   - Should never make a database call itself.
   - Throws internal errors or custom exceptions that can be translated into HTTP errors by the controller layer.

3. **Repository Layer**
   - Manages making database calls.
   - Decides whether the data will be retrieved from cache or database.
   - Will not throw HTTP errors; service layer can throw Authentication and NotFound errors.
   - In case of not found in repository layer, it will propagate nulls up to the service layer, which will then handle and throw a not found error.
   - Assumes that all method calls are authorized, i.e., there will be no authentication and authorization checks in the repository layer.
