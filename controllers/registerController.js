const { register } = require('../models')

const registerForm = (_req, res) => (
  res.render('users/login', {
    message: null,
  })
);

const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const namesTest = /^[a-zA-Z]*$/;

const verifyEmail = (email, arrMessage) => {
  if (!email.match(emailTest)) {
    return arrMessage = [ ...arrMessage , 'O email deve ter o formato email@mail.com'];
  };
  return arrMessage;
};

const verifyPassword = (password, arrMessage) => {
  if (password.length < 6) {
    return arrMessage = [ ...arrMessage , 'A senha deve ter pelo menos 6 caracteres'];
  };
  return arrMessage;
};

const verifyConfirm = (password, confirm, arrMessage) => {
  if (password !== confirm) {
    return arrMessage = [ ...arrMessage , 'As senhas tem que ser iguais']; 
  };
  return arrMessage;
};

const verifyName = (name, arrMessage) => {
  if (name.length < 3 || !name.match(namesTest)) {
   return arrMessage = [ ...arrMessage, 
    'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras'];
  }
  return arrMessage;
};

const verifyLastName = (lastName, arrMessage) => {
  if (lastName.length < 3 || !lastName.match(namesTest)) {
    return arrMessage = [ ...arrMessage , 
      'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras"'];
  }
  return arrMessage;
}
const setRegister = async (req, res) => {
  const { email, password, confirm, name, lastName } = req.body;
  let arrMessage = []

  arrMessage = verifyEmail(email, arrMessage);
  arrMessage = verifyPassword(password, arrMessage);
  arrMessage = verifyConfirm(password, confirm, arrMessage);
  arrMessage = verifyName(name, arrMessage);
  arrMessage = verifyLastName(lastName, arrMessage);

  if(arrMessage.length > 0)
    return res.render('users/login', { message: arrMessage, redirect: null, });
  
  await register.addUser(email, password, name, lastName)

  return res.render('users/login' , { message: ['Cadastro efetuado com sucesso!']});
};

module.exports = {
  registerForm,
  setRegister,
};