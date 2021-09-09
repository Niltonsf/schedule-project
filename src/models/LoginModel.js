const mongoose = require('mongoose');
const validator = require('validator');
const bcrypjs = require('bcryptjs');
const RegisterModel = require('./RegisterModel').RegisterModel;

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async loginUser() {
        this.valida();
        if (this.errors.length > 0) return;
        this.user = await RegisterModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push("User doens't exists");
            return;
        }

        if (!bcrypjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push("Password doesn't match");
            this.user = null;
            return;
        }
    }

    valida() {
        this.cleanUp();
        // Email valid
        if (!validator.isEmail(this.body.email)) this.errors.push('Invalid Email');

        // Passoword valid
        if (this.body.password.length < 3 || this.body.password.length > 30) this.errors.push('Invalid Password (3 - 30 chars)');
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body['email-field'],
            password: this.body['password-field'],
        };
    }
}

module.exports = Login;