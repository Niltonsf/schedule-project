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