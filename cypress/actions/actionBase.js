export function verifyContainsText(text) {
  cy.contains(text).should('be.visible');
}

export function verifyNotContainsText(text) {
  cy.contains(text).should('not.exist');
}

export function clickLinkOrText(text) {
  cy.contains(text).first().click();
}

export function clickLastElement(element) {
  cy.get(element).last().click();
}

export function clickButton(element) {
  cy.get(element).click();
}

export function verifyElementVisible(element) {
  cy.get(element).should('to.be.visible');
}

export function verifyElementNotVisible(element) {
  cy.get(element).should('not.be.visible');
}

export function verifyContainsUrl(url) {
  cy.url().should('includes', url);
}

export function getValueInput(element, text) {
  cy.get(element).should('have.value', text);
}

export function insertText(element, text) {
  cy.get(element).type(text);
}

export function accessHomeAndLogin() {
  cy.visit('http://localhost:3000/');
  login(Cypress.env('login'), Cypress.env('password'));
}

export function login(email, password) {
  cy.get('[data-testid="login"]').click();
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="entrar"]').click();
}

export function clearFieldsUser() {
  cy.get('[data-testid="email"]').clear();
  cy.get('[data-testid="senha"]').clear();
  cy.get('[data-testid="nome"]').clear();
  cy.get('[data-testid="sobrenome"]').clear();
}

export function registerUser(email, password, confirmPassword, name, lastName) {
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="confirmar-senha"]').type(confirmPassword);
  cy.get('[data-testid="nome"]').type(name);
  cy.get('[data-testid="sobrenome"]').type(lastName);
  cy.get('[data-testid="cadastrar"]').click();
}

export function updateUser(email, password, confirmPassword, name, lastName) {
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="confirmar-senha"]').type(confirmPassword);
  cy.get('[data-testid="nome"]').type(name);
  cy.get('[data-testid="sobrenome"]').type(lastName);
  cy.get('[data-testid="salvar"]').click();
}

export function createRecipe() {
  clickButton('[data-testid="nova-receita"]');
  insertText('[data-testid="nome-receita"]', 'Receita para excluir');
  insertText('[data-testid="ingredientes"]', 'Trigo');
  clickButton('[data-testid="adicionar-ingrediente"]');
  insertText('[data-testid="modo-de-preparo"]', '20 minutos no forno');
  clickButton('[data-testid="postar-receita"]');
}

export function createDataBase() {
  return 'CREATE DATABASE IF NOT EXISTS cookmaster;';
}

export function createTableUsers() {
  const createTableUsers = `CREATE TABLE IF NOT EXISTS
                              cookmaster.users(
                                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                                email VARCHAR(100) NOT NULL,
                                password VARCHAR(100) NOT NULL,
                                first_name VARCHAR(100) NOT NULL,
                                last_name VARCHAR(100) NOT NULL);`;
  return createTableUsers;
}

export function createTableRecipes() {
  const createTableRecipes = `CREATE TABLE IF NOT EXISTS
                                cookmaster.recipes(
                                  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                                  user_id INT NOT NULL, user VARCHAR(100) NOT NULL,
                                  name VARCHAR(100) NOT NULL,
                                  ingredients VARCHAR(300) NOT NULL,
                                  instructions VARCHAR(300) NOT NULL,
                                  FOREIGN KEY (user_id) REFERENCES users(id));`;
  return createTableRecipes;
}

export function insertUsers() {
  const insertUsers = `INSERT INTO cookmaster.users (email, password, first_name, last_name)
                        VALUES
                          ('bruno.batista@gmail.com', '12345678', 'bruno', 'batista'),
                          ('vanessa.morato@gmail.com', '12345678', 'vanessa', 'morato'),
                          ('carolina.silva@gmail.com', '12345678', 'carolina', 'silva');`;
  return insertUsers;
}

export function insertRecipes() {
  const insertRecipes = `INSERT INTO cookmaster.recipes (user_id, user, name, ingredients, instructions)
                          VALUES
                            (1, 'bruno batista', 'Receita de Bolo', 'Farinha,ovo,leite', '30 minutos no forno'),
                            (1, 'bruno batista', 'Receita de Cookie', 'Farinha,ovo,leite', '20 minutos no forno'),
                            (1, 'bruno batista', 'Receita de cafe', 'pó de cafe,agua', '10 minutos no fogo'),
                            (1, 'bruno batista', 'Receita de miojo', 'miojo,agua', '3 minutos no fogo'),
                            (1, 'bruno batista', 'Receita de mexidão', 'ovo,preseunto,queijo', 'mistura e frita na frigideira');`;
  return insertRecipes;
}

export function createAndInsertsDataBase() {
  cy.task('queryDb', 'DROP DATABASE IF EXISTS cookmaster;');
  cy.task('queryDb', createDataBase());
  cy.task('queryDb', 'USE cookmaster;');
  cy.task('queryDb', createTableUsers());
  cy.task('queryDb', createTableRecipes());
  cy.task('queryDb', insertUsers());
  cy.task('queryDb', insertRecipes());
}

export function dropAndTruncateDataBase() {
  cy.task('queryDb', 'DELETE FROM cookmaster.recipes;');
  cy.task('queryDb', 'SET FOREIGN_KEY_CHECKS = 0;');
  cy.task('queryDb', 'DELETE FROM cookmaster.users;');
  cy.task('queryDb', 'ALTER TABLE cookmaster.users AUTO_INCREMENT = 1;');
}
