## How to test this lambda docker image locally

1. Install SAM
2. Setup Environemnt Vars
3. sam build --use-container
4. sam local start-api
5. Invoke-RestMethod -Uri http://localhost:3000/ -Method GET

## Test URLs

- http://localhost:3000/api/products?page=1&per_page=20
- http://localhost:3000/api/product/11056154
