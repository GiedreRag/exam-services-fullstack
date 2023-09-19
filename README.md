![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![Security Status](https://img.shields.io/security-headers?label=Security&url=https%3A%2F%2Fgithub.com&style=flat-square)
![Gluten Status](https://img.shields.io/badge/Gluten-Free-green.svg)
![Eco Status](https://img.shields.io/badge/ECO-Friendly-green.svg)
[![Discord](https://discord.com/api/guilds/571393319201144843/widget.png)](https://discord.gg/dRwW4rw)

# E SHOP

_services project_

<br>

## 🌟 About

This project is for educational porposes only. 

This project provides a full-stack template with a client built with React and Bootstrap, and a server built with Express.js, connected to a MySQL database.

Site published at: https://github.com/GiedreRag/exam-services-fullstack

## 🎯 Project features/goals

- Github pages
- README / [markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- git branch
- active register form
- active login form
- form validations
- admin and user roles
- account pages with generated content
- different pages and navigation between them
- react icons

## Technologies Used

### Client:
- React ^18.2.0
- Bootstrap ^5.3.2
- React Router DOM ^6.16.0
- React Icons ^4.11.0

### Server:
- Express.js ^4.18.2
- MySQL2 ^3.6.1
- Multer ^1.4.5-lts.1
- Helmet ^7.0.0

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/GiedreRag/exam-services-fullstack.git
    ```

2. **Install dependencies**:

    - For the main project:
        ```bash
        npm install
        ```

    - For the client:
        ```bash
        cd client
        npm install
        ```

    - For the server:
        ```bash
        cd server
        npm install
        ```

3. **Setup your database**:

    Ensure you have MySQL running and adjust the server's environment or configuration to match your setup.

## Running the Project

You can run both the client and the server in development mode using:

```bash
npm run dev
```

Once both are running, you can visit http://localhost:3000 in your browser to view the client.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Using the website

The database is configured to create 'users', 'roles', and 'posters' tables with some content in them. 

3 users already set up for imediate usage:

- Admin: email: jonas@jonas.lt password: jonas@jonas.lt

- User 1: email: ona@ona.lt password: ona@ona.lt 

- User 2: email: lukas@lukas.lt password: lukas@lukas.lt 

### Admin can:

- Update form
- See all posters
- Add new poster
- Update/delete posters
- See all users

### User can:

- See all poster
- Add like or not like on the poster

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ⚠️ License

Distributed under the MIT License. See LICENSE.txt for more information.

## 👱 Authors

Giedre: [Github](https://github.com/GiedreRag)

## Acknowledgments

Special thanks to all libraries and tools used in this project.
