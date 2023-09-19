# Product API

This is a sample RESTful API for managing products.

### Requirements


    Java 8

    Docker

### Build and Run


    Build the project using Gradle:


    ./gradlew build


    Build the Docker image:


    docker build -t product-api .


    Run the Docker container:


    docker run -p 8080:8080 product-api

    
* The API should now be accessible at http://localhost:8080.

### API Documentation

* The API documentation is generated using Swagger and can be accessed at (http://localhost:8080/swagger-ui.html).
        