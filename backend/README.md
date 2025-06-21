## How to test this lambda docker image locally

1. Install SAM
2. sam build --use-container
3. sam local start-api
4. Invoke-RestMethod -Uri http://localhost:3000/ -Method GET

##

http://localhost:3000/api/products?page=1&per_page=20
