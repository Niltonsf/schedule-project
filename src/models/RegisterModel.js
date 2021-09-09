const mongoose = require('mongoose');
const validator = require('validator');
const bcrypjs = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async registerUser() {
        this.valida();
        if (this.errors.length > 0) return;

        await this.userExists();

        if (this.errors.length > 0) return;

        const salt = bcrypjs.genSaltSync();
        this.body.password = bcrypjs.hashSync(this.body.password, salt);


        this.user = await RegisterModel.create(this.body);

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

    async userExists() {
        const user = await RegisterModel.findOne({ email: this.body.email });

        if (user) this.errors.push('User already exists');
    }
}

module.exports = Register;
module.exports.RegisterModel = RegisterModel;