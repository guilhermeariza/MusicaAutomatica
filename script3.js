const button = document.querySelector('button');
const text = document.querySelector('.text');

const recognition = createRecognition();
let understanding = false;
let texto = '';

recognition.onstart = () => {
  understanding = true;
  console.log('Reconhecimento iniciado');
};

recognition.onend = () => {
  understanding = false;
  console.log('Reconhecimento encerrado. Reiniciando...');
  recognition.start(); // Reinicia o reconhecimento quando ele é encerrado
};

button.addEventListener('click', e => {
  if (!recognition) return;

  if (understanding) {
    console.log('Deu tudo certo: ' + texto);
    recognition.stop();
  } else {
    recognition.start();
  }

  button.innerHTML = understanding ? 'Aperte para falar' : 'Parar de escutar';
  button.classList.toggle('bg-purple-200');
  button.classList.toggle('text-red-500');
});

function createRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;
  recognition.interimResults = true;

  recognition.lang = 'pt_BR';

  recognition.onresult = e => {
    text.innerHTML = e.results[0][0].transcript;
    texto = e.results[0][0].transcript;
  };

  recognition.onerror = e => console.log('Erro no reconhecimento:', e);

  return recognition;
}
