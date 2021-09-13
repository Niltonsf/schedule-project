import validator from "validator";

export default class FormValidator {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email-field"]');
        const passwordInput = el.querySelector('input[name="password-field"]');
        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            alert('Email invalid!');
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            alert('Password needs to be between 3 and 50 chars!');
            error = true;
        }

        if (!error) el.submit();

    }
}