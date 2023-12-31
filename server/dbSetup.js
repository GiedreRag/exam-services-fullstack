import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './env.js';
import { hash } from './lib/hash.js';

const database_reset = false;

async function dbSetup() {
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    if (database_reset) {
        await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
    }

    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    if (database_reset) {
        await rolesTable(connection);
        await usersTable(connection);
        await tokensTable(connection);
        await citiesTable(connection);
        await servicesTable(connection);

        await generateRoles(connection);
        await generateUsers(connection);
        await generateCities(connection);
        await generateServices(connection);
    }

    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        fullname varchar(60) NOT NULL,
                        email varchar(60) NOT NULL,
                        password_hash varchar(200) NOT NULL,
                        role_id int(10) NOT NULL DEFAULT 2,
                        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY role_id (role_id),
                        CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create users table.");
        console.log(error);
        throw error;
    }
}

async function tokensTable(db) {
    try {
        const sql = `CREATE TABLE tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        token varchar(40) NOT NULL,
                        user_id int(10) NOT NULL,
                        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create tokens table.");
        console.log(error);
        throw error;
    }
}

async function rolesTable(db) {
    try {
        const sql = `CREATE TABLE roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(20) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create roles table.");
        console.log(error);
        throw error;
    }
}

async function citiesTable(db) {
    try {
        const sql = `CREATE TABLE cities (
                        id int(3) NOT NULL AUTO_INCREMENT,
                        title varchar(30) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create cities table.");
        console.log(error);
        throw error;
    }
}

async function servicesTable(db) {
    try {
        const sql = `CREATE TABLE services (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        title varchar(60) NOT NULL,
                        img varchar(200) NOT NULL,
                        city_id int(3) NOT NULL,
                        user_id int(3) NOT NULL,
                        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY city_id (city_id),
                        KEY user_id (user_id),
                        CONSTRAINT services_ibfk_1 FOREIGN KEY (city_id) REFERENCES cities (id),
                        CONSTRAINT services_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create services table.");
        console.log(error);
        throw error;
    }
}

async function generateRoles(db) {
    try {
        const sql = `INSERT INTO roles (role) VALUES ('admin'), ('seller');`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create roles into a role' table.");
        console.log(error);
        throw error;
    }
}

async function generateUsers(db) {
    try {
        const sql = `INSERT INTO users (fullname, email, password_hash, role_id) 
                    VALUES ('Jonas Jonaitis', 'jonas@jonas.lt', '${hash('jonas@jonas.lt')}', 1),
                     ('Ona Onaite', 'ona@ona.lt', '${hash('ona@ona.lt')}', 2),
                     ('Lukas Lukaitis', 'lukas@lukas.lt', '${hash('lukas@lukas.lt')}', 2),
                     ('Rokas Rokaitis', 'rokas@rokas.lt', '${hash('rokas@rokas.lt')}', 2);`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create users into a users' table.");
        console.log(error);
        throw error;
    }
}


async function generateCities(db) {
    try {
        const sql = `INSERT INTO cities (title) VALUES ('Vilnius'), ('Kaunas'), ('Klaipėda'), ('Panevėžys'), ('Šiauliai');`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create cities into a cities' table.");
        console.log(error);
        throw error;
    }
}

async function generateServices(db) {
    try {
        const sql = `INSERT INTO services (img, title, city_id, user_id) 
                    VALUES ('http://localhost:3001/images/serviceImg/serviceImg_1697006216624.jpeg', 'Taisau gerai', 1, 2), 
                    ('http://localhost:3001/images/serviceImg/serviceImg_1695126607269.jpg', 'Važiuoja', 2, 3),
                    ('http://localhost:3001/images/serviceImg/serviceImg_1697005996306.png', 'Keturi ratai', 5, 4);`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create services into a services' table.");
        console.log(error);
        throw error;
    }
}

export const connection = await dbSetup();