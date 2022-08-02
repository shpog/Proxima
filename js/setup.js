// setup rec and synth to be more universal
let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent
let rec = new SpeechRecognition()
let synth = window.speechSynthesis

// basically speech synthesis and sleep wrapper
// put here only to clean up code
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

function sleep(milliseconds) {
  const date = Date.now()
  let currentDate
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

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



function load(){
	resetHelloScreen()
	con.onclick = e => {
		start()
	}
}


function resetHelloScreen(){
	sub.innerHTML = `<h1>Hi, I'm Proxima<h1>`
	setTimeout(e=>{
		sub.innerHTML = `<h1>Hi, I'm Proxima<h1> <h2>Click on the screen to start</h2>`
	},1000)
}

setTimeout(load,1000)