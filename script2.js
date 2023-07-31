const button = document.querySelector('button')
const text = document.querySelector('.text')

const recognition = transcribeRecognition(createRecognition())

let listening = false
let understanding = false
var texto = ''


// button.addEventListener('click', e => {
//     if(!recognition) return;

//     listening ? recognition.stop() : recognition.start()

//     button.innerHTML = listening ? 'Aperte para falar' : 'Parar de escutar'

//     button.classList.toggle('bg-purple-200')
//     button.classList.toggle('text-red-500')

// })



// if(recognition.indexOf('Guilherme')){
//     if(!recognition) return;

//     understanding ? recognition.stop() : recognition.start()

//     button.innerHTML = listening ? 'Aperte para falar' : 'Parar de escutar'

//     button.classList.toggle('bg-purple-200')
//     button.classList.toggle('text-red-500')

// }

button.addEventListener('click', e => {
    if(!recognition) return;

    if (understanding == true) {
        console.log("Deu tudo certo " + texto)

        recognition.stop()

    }else{
        recognition.start()

    }

    button.innerHTML = understanding ? 'Aperte para falar' : 'Parar de escutar'

    button.classList.toggle('bg-purple-200')
    button.classList.toggle('text-red-500')
    

})

function createPhrase(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const Phrase = SpeechRecognition !== undefined ? new SpeechRecognition() : null

    return Phrase

}


function createRecognition(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null
    recognition.continuous = true
    recognition.interimResults = true
    recognition.maxSpeechTimeout = 60000
    

    return recognition

}

function transcribeRecognition(recognition){

    recognition.lang = "pt_BR"


    recognition.onstart = () => understanding = true
    recognition.onend = () => understanding = false
    recognition.onerror = e => console.log('error', e)

    recognition.onresult = e => {
        text.innerHTML = e.results[0][0].transcript;
        texto = e.results[0][0].transcript

        
      };

    return recognition

}


