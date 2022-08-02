let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent

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

let recognition = new SpeechRecognition()
recognition.continuous = true
// recognition.lang = 'en-GB'
recognition.interimResults = true

function start(){
	recognition.start()
}

let thinkflag = false
let questions = []

recognition.onstart = e => {
	document.body.style.background = 'gray'
}

recognition.onresult = e => {
	let data = e.results[e.results.length-1]
	if(data.isFinal){
		document.body.style.background = 'springgreen'
	}
	else{
		document.body.style.background = 'yellow'
	}

	document.querySelector('#transcript').innerHTML = data[0].transcript
	console.log(data)
	
}

recognition.onend = e =>{
	document.body.style.background = 'red'
	setTimeout(e=>{
		recognition.start()
	},1000)
	
}


const isMobile = navigator.userAgentData.mobile
document.querySelector('#mobile').innerHTML = (isMobile)?'Mobile device':'Desktop'






// recognition.onnomatch = e => {
	
// }

// recognition.onerror = e => {
	
// }
