import {
  login,
  clickButton,
  verifyContainsUrl,
  registerUser,
  clearFieldsUser,
  getValueInput,
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
  updateUser,
} from '../actions/actionBase';

import { name, internet } from 'faker';

describe('9 - Crie uma página de editar usuário.', () => {
  const randomName = name.firstName();
  const randomEmail = internet.email();
  const randomLast = name.lastName();

  before(() => {
    createAndInsertsDataBase();
  });

  after(() => {
    dropAndTruncateDataBase();
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', randomName, randomLast);
    cy.visit('http://localhost:3000/');
  });

  it('Verificar se o botão "Editar Usuário" redireciona para tela de editar usuário', () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    verifyContainsUrl('/me/edit');
  });

  it('Validar que é possível se alterar o email', () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    updateUser('emailalterado@gmail.com', '12345678', '12345678', randomName, randomLast);
    clickButton('[data-testid="minha-conta"]');
    getValueInput('[data-testid="email"]', 'emailalterado@gmail.com');
  });

  it('Validar que é possível se alterar o nome', () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    updateUser(randomEmail, '12345678', '12345678', 'ALTERADO', randomLast);
    clickButton('[data-testid="minha-conta"]');
    getValueInput('[data-testid="nome"]', 'ALTERADO');
  });

  it('Validar que é possível se alterar o sobrenome', () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    updateUser(randomEmail, '12345678', '12345678', randomName, 'ALTERADO');
    clickButton('[data-testid="minha-conta"]');
    getValueInput('[data-testid="sobrenome"]', 'ALTERADO');
  });

  it('Validar que é possível se alterar a senha', () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    updateUser(randomEmail, '123456789', '123456789', randomName, randomLast);
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    updateUser(randomEmail, '12345678', '12345678', randomName, randomLast);
  });
});
