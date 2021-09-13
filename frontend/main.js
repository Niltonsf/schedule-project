import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';

import FormValidator from './modules/Login';

const login = new FormValidator('.form-login');
const cadastro = new FormValidator('.form-cadastro');

login.init();
cadastro.init();