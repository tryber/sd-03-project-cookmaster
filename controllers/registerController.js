const { register } = require('../models')

const registerForm = (_req, res) => (
  res.render('users/login', {
    message: null,
  })
);
  
const setRegister = async (req, res) => {
  const { email, password, confirm, name, lastName } = req.body;

  const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const namesTest = /^[a-zA-Z]*$/;

  let arrMessage = []

  if (!email.match(emailTest)) {
    arrMessage = [ ...arrMessage , 'O email deve ter o formato email@mail.com'];
    // return res.render('users/login', {
    //   message: 'O email deve ter o formato email@mail.com',
    //   redirect: null,
    // });
  };

  if (password.length < 6) {
    arrMessage = [ ...arrMessage , 'A senha deve ter pelo menos 6 caracteres'];
    // return res.render('users/login', {
    //   message: 'A senha deve ter pelo menos 6 caracteres',
    //   redirect: null,
    // });
  };
  
  if (password !== confirm) {
    arrMessage = [ ...arrMessage , 'As senhas tem que ser iguais'];
    //   return res.render('users/login', {
    //       message: 'As senhas tem que ser iguais',
    //       redirect: null,
    //     });      
  };

  if (name.length < 3 || !name.match(namesTest)) {
    arrMessage = [ ...arrMessage , 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras'];
    // return res.render('users/login', {
    //   message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    //   redirect: null,
    // });
  }

  if (lastName.length < 3 || !lastName.match(namesTest)) {
    arrMessage = [ ...arrMessage , 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras"'];
    // return res.render('users/login', {
    //   message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    //   redirect: null,
    // });
  }

  if(arrMessage.length > 0) 
    return res.render('users/login', {
      message: arrMessage,
      redirect: null,
    });
  
  await register.addUser(email, password, name, lastName)

  return res.render('users/login' , { message: ['Cadastro efetuado com sucesso!']});
};

module.exports = {
  registerForm,
  setRegister,
};