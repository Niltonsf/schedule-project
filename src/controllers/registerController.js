const Register = require('../models/RegisterModel');

exports.index = (req, res) => {
    res.render('register');
};

exports.register = async(req, res) => {
    try {
        const register = new Register(req.body);
        await register.registerUser();

        if (register.errors.length > 0) {
            req.flash('errors', register.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'User created successfully');
        req.session.save(() => {
            return res.redirect('back');
        });

    } catch (e) {
        console.log(e)
        return res.render('Error 404');
    }
};