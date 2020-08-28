function validadeEmail(email, senha, confSenha) {
  if (!email.includes('@') || !email.includes('.')) {
    return { message: 'O email deve ter o formato email@mail.com' };
  }

  if (!(senha.length >= 6)) {
    return { message: 'A senha deve ter pelo menos 6 caracteres' };
  }

  if (senha !== confSenha) {
    return { message: 'As senhas tem que ser iguais' };
  }
  return {};
}

function validadeData({
  email, senha, conf_senha: confSenha, name, last_name: lastName,
}) {
  const { message } = validadeEmail(email, senha, confSenha);
  if (message) return { message };
  if (name.length < 3 || name.match(/\d/gm)) {
    return { message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras' };
  }

  if (lastName.length < 3 || lastName.match(/\d/gm)) {
    return { message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras' };
  }

  return true;
}

module.exports = { validadeData };
