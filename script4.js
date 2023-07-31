const button = document.querySelector('button');
const text = document.querySelector('.text');

const recognition = createRecognition();
let understanding = false;
let startRecording = false;
let nextUtterance = '';

recognition.onstart = () => {
  understanding = true;
  console.log('Reconhecimento iniciado');
};

recognition.onend = () => {
  understanding = false;
  console.log('Reconhecimento encerrado. Reiniciando...');
  console.log('frase completa:', nextUtterance); // Exibe a próxima frase no console

  recognition.start(); // Reinicia o reconhecimento quando ele é encerrado
  nextUtterance = '';
};

button.addEventListener('click', e => {
  if (!recognition) return;

  if (understanding) {
    console.log('Deu tudo certo: ' + nextUtterance);
    nextUtterance = ''; // Limpa a variável para a próxima gravação
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
    const transcript = e.results[0][0].transcript;
    text.innerHTML = transcript;

    if (transcript.includes('iniciar')) {
      startRecording = true;
    }
    if (transcript.includes('parar')) {
        startRecording = false;
    }

    if (startRecording) {
      nextUtterance = transcript;
      console.log('Próxima frase:', nextUtterance); // Exibe a próxima frase no console
    }

  };

  recognition.onerror = e => console.log('Erro no reconhecimento:', e);

  return recognition;
}
