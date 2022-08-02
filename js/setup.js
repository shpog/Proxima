// setup rec to be more universal
let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent
let rec = new SpeechRecognition()

// basically speech synthesis wrapper
// put here only to clean up code
let synth = window.speechSynthesis
function say(phrase,fun){
	let msg = new SpeechSynthesisUtterance()
	msg.text = phrase
	msg.rate = 1
	msg.pitch = 1
	msg.lang = 'en-GB'
	msg.onend = e => {
		if(fun){fun(e)}
	}
	synth.speak(msg)
}

let startText = '<h1>Tap the screen to make me listen</h1>'

window.onload = e => {
	let con = document.querySelector('#content')
	let sub = document.querySelector('#subcontent')
	
	setInterval(e=>{
		if(sub.offsetHeight < window.innerHeight){
			sub.style.margin = (window.innerHeight - sub.offsetHeight)/2 + 'px auto'
		}
		else{
			sub.style.margin = '35px auto'
		}
	},250)

	sub.innerHTML = startText
	con.onclick = e => {
		start()
	}
}


function sleep(milliseconds) {
  const date = Date.now()
  let currentDate
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}