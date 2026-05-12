// Criado uma classe para inicializar o projeto.
class App {
  $form = null;
  $submitFormButton = null;
  $successMessage = null
  $currentYearSpan = null

  constructor(form = null, submitFormButton = null, successMessage = null, currentYearSpan = null) {
    this.$form = form
    this.$submitFormButton = submitFormButton
    this.$successMessage = successMessage
    this.$currentYearSpan = currentYearSpan
  }

  run() {
    this.registerListeners()
  }

  registerListeners() {
    this.$form = document.querySelector('#contact-form')
    this.$submitFormButton = document.querySelector('#submit-btn')
    this.$successMessage = document.querySelector('#success-message')
    this.$currentYearSpan = document.querySelector('#current-year')

    // HAck para adicionar a data no rodapé
    document.addEventListener('DOMContentLoaded', () => this.$currentYearSpan.innerHTML = new Date().getFullYear());

    this.$form.addEventListener('submit', this.onSubmit)
    this.$submitFormButton.addEventListener('click', this.submitForm)
  }

  // Acho importante frisar que usei as arrow functions pra manter o escopo do 'this' da classe. Nenhuma diferença prática, é mais conceitual.
  submitForm = () => {
    this.$form.requestSubmit();
  }

  onSubmit = (event) => {
    event.preventDefault();

    const $nameField = document.querySelector('#name');
    const $emailField = document.querySelector('#email');
    const $messageField = document.querySelector('#message');

    const name = $nameField.value

    const contactInfo = {
      name,
      email: $emailField.value,
      message: $messageField.value
    };

    if (!this.isValid(contactInfo)) {
      return;
    }

    console.log(contactInfo); // Daqui, dá pra chamar um serviço de mensageria, ou guardar em um banco dedados...

    this.showSuccessMessage(name)
    this.$form.reset();
  }

  isValid = (contactInfo) => {
    const { name, email, message } = contactInfo;

    // Verifico se estão vaios
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Por favor, preencha todos os campos.');
      return false;
    }

    // Seria mais seguro se eu usasse um regex
    if (!email.includes('@') || !email.includes('.')) {
      alert('Por favor, insira um e-mail válido.');
      return false;
    }

    return true;
  }

  showSuccessMessage = (fullName) => {
    const firstName = fullName.split(' ')[0];

    const text = `Obrigado, por entrar em contato <span>${firstName}<span>. A sua mensagem foi enviada com sucesso!`
    this.$successMessage.innerHTML = text
  }
}

const app = new App();

app.run()
