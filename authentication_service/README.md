<h1>Authentication service</h1>
This microservice handles authentication and token validation

The available routes are:

- POST /login

```
body: {
    username: '',
    password: ''
}
returns: {
    "success": true,
    "payload": {
        "id": 24,
        "email": "t1@gmail.com",
        "name": "Toni van Ginkel",
        "session": {
            "refresh_token": "8viQNUYEEccOF+JI6TJWeg==",
            "session_token": "+HHA4IGNxeVBB4EDXZN7Dw=="
        }
    }
}
```

- POST /register

```
body: {
    username: '',
    password: '',
    name: ''
}

returns: {
    "success": true,
    "payload": {
        "id": 25,
        "email": "t2@gmail.com",
        "name": "Toni van Ginkel",
        "session": {
            "refresh_token": "gkRonKXrcNiL7gREr1dcrg==",
            "session_token": "igdEK43M96uA+6LQsVgz+g=="
        }
    }
}
```
- POST /validateToken
```
body: {
    token: ''
}
return: {
    success: true,
    isTokenValid: true
}
```
- GET /userInfo?id
```
returns: {
    "success": true,
    "payload": {
        "id": 24,
        "email": "t1@gmail.com",
        "name": "Toni van Ginkel",
        "session": {
            "refresh_token": "8viQNUYEEccOF+JI6TJWeg==",
            "session_token": "+HHA4IGNxeVBB4EDXZN7Dw=="
        }
    }
}
```

<h1>How to run</h1>
To run the backend run the following commands:

```
yarn i
yarn dev
```

To run the databse run the following commands:

```docker-compose up -d db```
