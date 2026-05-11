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

    console.log(contactInfo); // Daqui, dá pra chamar um serviço de mensageria, ou guardar em um banco dedados...

    this.showSuccessMessage(name)
    this.$form.reset();
  }

  showSuccessMessage = (fullName) => {
    const firstName = fullName.split(' ')[0];

    const text = `Obrigado, por entrar em contato <span>${firstName}<span>. A sua mensagem foi enviada com sucesso!`
    this.$successMessage.innerHTML = text
  }
}

const app = new App();

app.run()
