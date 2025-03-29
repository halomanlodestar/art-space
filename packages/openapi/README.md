# Generate client for frontend using open api specs

## Steps to generate client
1. Save the openapi spec file in the `openapi` folder. Run curl command to get the openapi spec file.
   ```bash
   curl -X GET "http://localhost:8000/api-json" -H "accept: application/json" -o openapi.json
   ```
   or 
   ```bash
   npm run fetch
    ``` 

2. Do npm i
   ```bash
   npm i
   ```
   
3. Run the openapi generator command to generate the client code.
   ```bash
   npm run openapi:generate
    ```
4. Use the generated client code in your frontend application.