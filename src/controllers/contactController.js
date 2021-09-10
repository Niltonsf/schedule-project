const Contato = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('createContact', {
        contato: {}
    });
};

exports.register = async(req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.createContact();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contact succesfully created');
        req.session.save(() => {
            return res.redirect(`/contact/index/${contato.contact._id}`);
        });
        return;
    } catch (e) {
        console.log(e);
        return res.render('Erro');
    }
};

exports.editIndex = async(req, res) => {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.searchId(req.params.id);

    if (!contato) return res.render('404');

    res.render('createContact', { contato });
};

exports.edit = async(req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contact edited with success');
        req.session.save(() => {
            return res.redirect(`/contact/index/${contato.contact._id}`);
        });
        return;

    } catch (e) {
        console.log(e);
        res.render('404')
    }

};

exports.delete = async(req, res) => {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.deleteContact(req.params.id);

    if (!contato) return res.render('404');

    req.flash('success', 'Contact deleted');
    req.session.save(() => {
        return res.redirect('back');
    });
};