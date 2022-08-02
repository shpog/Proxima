function start(){
	let q = ''
	
	rec.continuous = !true
	rec.interimResults = false
	// rec.lang = 'en-GB'

	sub.innerHTML = '<h1>How can I help you?</h1><h2></h2>'
	say("How can I help you?",e=>{
		rec.start()
	})

	rec.onstart = e => {
		document.querySelector('h2').innerHTML = `Listening`
		sleep(1000)
	}

	rec.onresult = e => {
		q = e.results[e.results.length-1][0].transcript.toLowerCase().trim()
		q=(q.slice(-1) == '.' || q.slice(-1) == '?' || q.slice(-1) == '!')?q.slice(0,-1):q
		rec.stop()
	}

	rec.onend = e => {
		if(q != ''){
			think(q)
		}
		else{
			resetHelloScreen()
		}
	}
}