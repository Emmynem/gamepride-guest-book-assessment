# gamepride-guest-book-assessment
This is an API for a guest book application for GamePride Ltd software developer assessment

# Live demo
Check [here](https://guestbook.emmynem.com/) for live demo

### Default Admin Details
`email` - `johndoe@example.com`

`password` - `John-Doe-1`

# Routes

## Auth Routes
Login for Admin visit `GET` - ```/api/auth/backoffice/signin```

Signup for Guest visit `GET` -  ```/api/guest/signup```

## Admin Routes
Get Admins visit `GET` -  ```/api/backoffice/admins``` **requires authentication

Get Admin visit `GET` -  ```/api/backoffice/admin``` **requires authentication

Add Admin visit `POST` -  ```/api/backoffice/admin``` **requires authentication

Edit Admin Details visit `PUT` -  ```/api/backoffice/admin``` **requires authentication

Delete Admin visit `DELETE` -  ```/api/backoffice/admin``` **requires authentication

## Guest Routes
Get Guests visit `GET` -  ```/api/guests``` **requires authentication

Get Guest visit `GET` -  ```/api/guest``` **requires authentication

Delete Guests visit `DELETE` -  ```/api/guest``` **requires authentication
 
# Project install
```
npm install
```

# Run
```
npm run start
```
