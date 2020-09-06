const { changeUser, userModel } = require('../models');

const registerUserForm = async(req, res) => {
  const { id } = req.user;
  const userInfor = await userModel.findById(id);
  res.render('users/transition', {
    userInfor,
    user: req.user,
    message: null,
  });
};

function checkEmail(arrMessage, email) {
  const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (!email.match(emailTest)) {
    arrMessage = [ ...arrMessage , 'O email deve ter o formato email@mail.com'];
  };
  return arrMessage;
}

function checkPassword(arrMessage, password) {
  if (password.length < 6) {
    arrMessage = [ ...arrMessage , 'A senha deve ter pelo menos 6 caracteres'];
  };
  return arrMessage;
}

function checkConfirm(arrMessage, password, confirm) {
  if (password !== confirm) {
    arrMessage = [ ...arrMessage , 'As senhas tem que ser iguais'];
  };
  return arrMessage;
}

function checkName(arrMessage, name, namesTest) {
  if (name.length < 3 || !name.match(namesTest)) {
    arrMessage = [ ...arrMessage , 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras'];
  }
  return arrMessage;
}

function checkLastName(arrMessage, lastName, namesTest) {
  if (lastName.length < 3 || !lastName.match(namesTest)) {
    arrMessage = [ ...arrMessage , 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras"'];
  }
  return arrMessage;
}
  
const setUserChange = async (req, res, next) => {
  const { id } = req.user;
  const userInfor = await userModel.findById(id);
  const { email, password, confirm, name, lastName } = req.body;

  const namesTest = /^[a-zA-Z]*$/;

  let arrMessage = [];
  arrMessage = checkEmail(arrMessage, email);
  arrMessage = checkPassword(arrMessage, password); 
  arrMessage = checkConfirm(arrMessage, password, confirm);
  arrMessage = checkName(arrMessage, name, namesTest);
  arrMessage = checkLastName(arrMessage, lastName, namesTest);
  if(arrMessage.length > 0) 
    return res.render('users/transition', {
      userInfor,
      message: arrMessage,
      redirect: null,
    }
  );
  await changeUser.alterUser(id, email, password, name, lastName)
  return res.redirect('/');
};

module.exports = {
  registerUserForm,
  setUserChange,
};
