const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: ''
    },
    phone: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async createContact() {
        this.valida();

        if (this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body);
    }

    valida() {
        this.cleanUp();
        // Email valid
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid Email');
        if (!this.body.fullName) this.errors.push('Full Name is required');
        if (!this.body.phone) this.errors.push('Phone is required');
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = '';
            }
        }

        this.body = {
            fullName: this.body['fullName'],
            email: this.body['email'],
            phone: this.body['phone'],
        };
    }

    async edit(id) {
        if (typeof id !== 'string') return;
        this.valida();
        if (this.errors.length > 0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async searchId(id) {
        if (typeof id !== 'string') return;
        const contato = await ContactModel.findById(id);
        return contato;
    };

    static async searchContacts() {
        const contato = await ContactModel.find().sort({ createdOn: -1 });
        return contato;
    };

    static async deleteContact(id) {
        if (typeof id !== 'string') return;
        const contato = await ContactModel.findOneAndDelete({ _id: id });
        return contato;
    };
}

module.exports = Contact;