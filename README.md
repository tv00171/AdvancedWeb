# AdvancedWeb
This is a mono repo, with each folder being an individual microservice.

#How to run
To run the project, run:
`docker-compose up`
and it will build all the microservice using docker and run them.
The frontend will be running on http://localhost:8080/login.

The ports used by the microservices are:
- 8080
- 4444
- 5555
- 3000
- 8000

Make sure those ports are available in your computer or the microservices won't be able to properly run.

#Login data
Some existing account that can be used to login are:
`Email: t1@gmail.com
Password: 123`

`Email: tginkel1@gmail.com
Password: 123`

#Flow
Once logged in, the page will be empty as there are no created products. To create a product press the edit button in the header (top right) and press the create item button. Once the item has been created, you can log out (in the header, top right) and log in with a different account, where you will be able to see the newly created product. To start a chat with the seller, press the prodcut and then the start chat button. This will create a new conversation with the seller and redirect you to the chat page.
