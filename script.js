let inpt = document.querySelector('#input')
let resp = document.querySelector('#response')
let butt = document.querySelector('#input button')
let txtfld = document.querySelector('#input input')

let synth = window.speechSynthesis
let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent



var recognition = new SpeechRecognition()
recognition.continuous = false
recognition.lang = 'en-GB'
recognition.interimResults = true
recognition.maxAlternatives = 1

function say(phrase){
	document.querySelector('h1.phrase').innerHTML = phrase
	var msg = new SpeechSynthesisUtterance()
	msg.text = document.querySelector('h1.phrase').innerText
	msg.rate = 1
	msg.pitch = 1
	msg.lang = 'en-GB'
	
	synth.speak(msg)
}


setInterval(e=>{
	resp.style.height = (window.innerHeight-inpt.offsetHeight)+'px'
	document.querySelector('h1.phrase').onclick = e => {
		var msg = new SpeechSynthesisUtterance()
		msg.text = document.querySelector('h1.phrase').innerText
		msg.rate = 1
		msg.pitch = 1
		msg.lang = 'en-GB'
		synth.speak(msg)
	}
},10)

function listen(){
	
	
	recognition.start()
	
	recognition.onstart = e => {
		resp.innerHTML = `<h1 class="phrase"></h1>`
		butt.className = 'active'

		butt.style.borderRadius = '50%'
		butt.style.border = '1.5px solid white'
		setTimeout(e=>{
			txtfld.style.width='0px'
			txtfld.style.padding='0px'
			txtfld.style.border='none'
		},1)
	}
	
	recognition.onresult = e => {
		if(e.results[0].isFinal){
			butt.className = ''
			resp.innerHTML = `<h3 class="phrase">${e.results[0][0].transcript}</h3><h1 class="phrase">Thinking...</h1>`
			showtxt()
			action(e.results[0][0].transcript)
			
		}
		else{
			document.querySelector('h1.phrase').innerHTML = e.results[0][0].transcript
		}
		
	}

	recognition.onnomatch = e => {
		butt.className = ''
		showtxt()
		say("I'm sorry. I could't understand what you said. Could you repeat?")
		recognition.start()
	}

	recognition.onerror = e => {
		butt.className = ''
		showtxt()
		say("I'm sorry. I could't understand what you said. Could you repeat?")
		recognition.start()
	}

}


txtfld.onblur = e => {
	if(txtfld.value.trim() != ''){
		resp.innerHTML = `<h3 class="phrase">${txtfld.value.trim()}</h3><h1 class="phrase">Thinking...</h1>`
		showtxt()
		action(txtfld.value.trim())
	}
	else{
		txtfld.value = ''
	}
	
}
txtfld.onkeyup = e => {
	if(e.key == 'Enter'){
		txtfld.blur()
	}
}

function showtxt(){
	butt.style.borderRadius = '50%'
	butt.style.borderTopLeftRadius = '0%'
	butt.style.borderBottomLeftRadius = '0%'
	butt.style.borderLeft = 'none'
	setTimeout(e=>{
		txtfld.style.width='200px'
		txtfld.style.padding='25px'
		txtfld.style.border='1.5px solid white'
		txtfld.style.borderRight = 'none'
	},1)
}



function action(command){
	txtfld.value = ''
	command = command.toLowerCase()
	let ch = command[command.length-1]
	if(ch == '.' || ch == '?' || ch == '!')[
		command = command.slice(0,-1)
	]
	console.log(command)
	
	console.log(command.aplit(' '))
	
}



window.onload = e => {
	say("Hi! I'm Proxima. <br> How can I help you?")
	
	// if ('serviceWorker' in navigator) {
	// 		navigator.serviceWorker
	// 				.register('/sw.js');
	// }
}

