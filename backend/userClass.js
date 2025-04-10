//server.js file
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
// Password hashing library
const bcrypt = require('bcryptjs');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

class User {
    constructor(id, username, password, email, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;

    }

    static getIdByUsername(db, username, callback) {
        const sql = "SELECT id FROM user WHERE username = ?";
        db.query(sql, [username], callback);
    }
    static getUsernameById(db, id, callback) {
        const sql = "SELECT username FROM user WHERE id = ?";
        db.query(sql, [id], callback);
    }
    static getPassword(db, id, callback) {
        const sql = "SELECT password FROM user WHERE id = ?";
        db.query(sql, [id], callback);
    }
    static getEmail(db, id, callback) {
        const sql = "SELECT email FROM user WHERE id = ?";
        db.query(sql, [id], callback);
    }
    static getRole(db, id, callback) {
        const sql = "SELECT role FROM user WHERE id = ?";
        db.query(sql, [id], callback);
    }
    static printUser(db, id, callback) {
        const sql = "SELECT * FROM user WHERE id = ?";
        db.query(sql, [id], callback);
    }
    static findByUsername(db, username, callback) {
        const sql = "SELECT * FROM user WHERE username = ?";
        db.query(sql, [username], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null); // No user found

            const { id, username, password, email, role } = results[0];
            const user = new User(id, username, password, email, role);
            callback(null, user);
        });
    }
}

module.exports = User;