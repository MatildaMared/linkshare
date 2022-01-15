<h1 align="center">Linkshare</h1>

<p align="center">"Linkshare" is a web app where you create lists of links and share them with friends.</p>

---

## Links 🌍

- [GitHub Repo](https://github.com/MatildaMared/linkshare "Linkshare Repo")

---

## Screenshots 📸

Coming soon...

---

## About the app 📝

Coming soon...

---

## Technologies used 💻

- HTML
- CSS
- JavaScript
- React
- styled-components
- Node.js
- Express
- MongoDB

---

## Icons 🎨

This app is using icons from https://feathericons.com/

---

## Getting Started 🛫

1. Clone the repo, either by downloading a zip file through this GitHub repository, or by running `git clone https://github.com/MatildaMared/linkshare.git`

2. Install NPM packages for backend by running `npm install` in root folder

3. Cd into client directory and run `npm install` to install NPM packages for frontend.

4. In the root directory, you can run `npm start` to start the backend server. In the client directory you can run `npm run dev` to start the frontend development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

---

## API Routes

### Users API

#### Creating a new user

Creating a new user is made by sending a POST request to ```/api/users```

Requires an object in the request body with the following data:
```
{
  firstName: "First name of user",
  email: "email@email.com,
  password: "password1234"
}
```
The e-mail adress is validated and has to be unique and the password needs to contain at least 8 characters. 

Response, if successful, will be looking like this:
```
    {
      success: true,
      user: {
        lists: [],
        _id: 'MongoDB ID',
        firstName: 'First name of user',
        email: 'email@email.com'
      },
      token: 'JWT token string'
    }
```

The JWT token in the response needs to be stored by the frontend and sent along in Authorization header when making other requests to the API to authorize the user.

---


## Author 👩‍💻

**Matilda Mared**

- [GitHub Profile](https://github.com/MatildaMared "MatildaMared")
- [LinkedIn Profile](https://www.linkedin.com/in/matilda-mared "MatildaMared")
- [Email](mailto:rohitjain19060@gmail.com?subject=Hi "Hi!")

---

## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!
