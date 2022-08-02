// main function after loading bert model
function main(bert){
	// setup
	display('Click the screen to make me listen','')
	let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
	let SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent

	let synth = window.speechSynthesis
	
	let recognition = new SpeechRecognition()
	recognition.continuous = true		// even if set 'true' it still won't fully work on android
	recognition.lang = 'en-GB'
	// recognition.interimResults = true

	// enable listening
	let listening = false
	document.body.onclick = e => {
		if(!listening){
			recognition.start()
		}
		else{
			recognition.abort()
		}
		listening=!listening
	}

	// set current action on screen
	function display(ph1,ph2){
		document.querySelector('#phr2').innerHTML = ph2
		document.querySelector('#phr1').innerHTML = ph1
	}

	// use text-to-speech and do sth at the end of speaking
	function say(phrase,fun){
		var msg = new SpeechSynthesisUtterance()
		msg.text = phrase
		msg.rate = 1
		msg.pitch = 1
		msg.lang = 'en-GB'
		msg.onend = e => {
			fun(e)
		}
		synth.speak(msg)
	}

	// list of all commands; tbh only commands[0] is used
	let commands = []


	// added only for user's knowledge
	recognition.onstart = e => {
		listening = true
		display('Listening','')
	}

	let resultsflag = false

	recognition.onresult = e => {
		// most probable result
		let data = e.results[e.results.length-1]
		
		// add command at the beginning and stop recognition
		// next actions in 'end' event
		commands.unshift(data[0].transcript)
		recognition.stop()
		resultsflag = true
	}

	recognition.onnomatch = e => {
		// when proxima doesn't understand the user or when user doesn't speak
		// add 'false' to commands to notify user was silent/drunk
		display('Click the screen to make me listen','')
		commands.unshift(false)
		
	}
	
	recognition.onerror = e => {
		// o b v i o u s
		// display('Unknown error occured','')
	}

	recognition.onend = e => {
		listening = false
		// if user's speech was undersandable
		let question = commands[0]
		if(question && resultsflag){
			// fancy look
			display('Thinking',question)
			say('Thinking',e => {
				// do some stuff
				// depends on the command
				// basically command analysis
				let passage = `Nikola Tesla (/ˈtɛslə/;[2] Serbo-Croatian: [nǐkola têsla]; Serbian Cyrillic: Никола Тесла;[a] 10
      July 1856 – 7 January 1943) was a Serbian-American[4][5][6] inventor, electrical engineer, mechanical engineer,
      and futurist who is best known for his contributions to the design of the modern alternating current (AC)
      electricity supply system.[7] <br>

      Born and raised in the Austrian Empire, Tesla studied engineering and physics in the 1870s without receiving a
      degree, and gained practical experience in the early 1880s working in telephony and at Continental Edison in the
      new electric power industry. He emigrated in 1884 to the United States, where he would become a naturalized
      citizen. He worked for a short time at the Edison Machine Works in New York City before he struck out on his own.
      With the help of partners to finance and market his ideas, Tesla set up laboratories and companies in New York to
      develop a range of electrical and mechanical devices. His alternating current (AC) induction motor and related
      polyphase AC patents, licensed by Westinghouse Electric in 1888, earned him a considerable amount of money and
      became the cornerstone of the polyphase system which that company would eventually market.<br>

      Attempting to develop inventions he could patent and market, Tesla conducted a range of experiments with
      mechanical oscillators/generators, electrical discharge tubes, and early X-ray imaging. He also built a
      wireless-controlled boat, one of the first ever exhibited. Tesla became well known as an inventor and would
      demonstrate his achievements to celebrities and wealthy patrons at his lab, and was noted for his showmanship at
      public lectures. Throughout the 1890s, Tesla pursued his ideas for wireless lighting and worldwide wireless
      electric power distribution in his high-voltage, high-frequency power experiments in New York and Colorado
      Springs. In 1893, he made pronouncements on the possibility of wireless communication with his devices. Tesla
      tried to put these ideas to practical use in his unfinished Wardenclyffe Tower project, an intercontinental
      wireless communication and power transmitter, but ran out of funding before he could complete it.[8]<br>

      After Wardenclyffe, Tesla experimented with a series of inventions in the 1910s and 1920s with varying degrees of
      success. Having spent most of his money, Tesla lived in a series of New York hotels, leaving behind unpaid bills.
      He died in New York City in January 1943.[9] Tesla's work fell into relative obscurity following his death, until
      1960, when the General Conference on Weights and Measures named the SI unit of magnetic flux density the tesla in
      his honor.[10] There has been a resurgence in popular interest in Tesla since the 1990s.[11]`
				bert.findAnswers(question,passage).then(data=>{
					display(data[0].text,question)
					say(data[0].text,e=>{
						setTimeout(e=>{
							recognition.start()
							resultsflag = false
						},1000)
					})
					
					// start recognition from the beginning after 1 second
					
				})

				
				
			})
		}
			
		// if proxima is speaking to the drunk dude
		else{
			setTimeout(e=>{
				recognition.start()
			},1000)
		}
		
	}
}

//bert.findAnswers(question,passage).then(data=>{})
