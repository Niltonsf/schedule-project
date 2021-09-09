const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if (req.session.user) return res.redirect('/');
    return res.render('login');
};

exports.login = async(req, res) => {
    try {
        const login = new Login(req.body);
        await login.loginUser();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'User login success');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('back');
        });

    } catch (e) {
        console.log(e)
        return res.render('Error 404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};