<h1>Authentication service</h1>
This microservice handles authentication and token validation

The available routes are:

- POST /login

```
{
    username: '',
    password: ''
}
```

- POST /register

```
{
    username: '',
    password: '',
    name: ''
}
```

- DELETE /delete?id
- GET /checkToken?id

<h1>How to run</h1>
Run the command:

```docker-compose up -d```
