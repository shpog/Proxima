// user must activate recognition with some action eg. clicking the screen
// TODO

// global flags
let wait = false
let longer = false

function start(){

	// fancy display setup
	let con = document.querySelector('#content')
	let sub = document.querySelector('#subcontent')

	sub.innerHTML='<h1>How can I help you?</h1><h2>Are you new?<br>Try "What can you do?"</h2>'
	
	// rec setup
	rec.continuous = true
	rec.interimResults = false
	rec.lang = 'en-GB'
	
	// flags
	let listening = false
	let first = true

	
	
	// temporary data
	let que

	// start listening
	wait = true
	say("How can I help you?",e=>{
		rec.start()
	})
	

	rec.onstart = e => {
		// set flag to true to notify you are listening
		listening = true
		if(!longer){
			if(first){
				sub.innerHTML='<h1>How can I help you?</h1><h2>Are you new?<br>Try "What can you do?"</h2>'
			}
			else{
				sub.innerHTML='<h1>Say "Hey" and<br>ask me sth</h1><h2>Are you new?<br>Try "What can you do?"</h2>'
			}
		}
		
		sleep(1000)
	}
	
	rec.onresult = e => {
		
		// get phrase in the most universal form
		let q = e.results[e.results.length-1][0].transcript.toLowerCase().trim()
		q=(q.slice(-1) == '.' || q.slice(-1) == '?' || q.slice(-1) == '!')?q.slice(0,-1):q

		// respond only if user talks to you not to some random dude
		if(first){
			que = q
			listening = false
			rec.stop()
		}
		else if(q.startsWith('hey, ')){

			// question analysis in rec.onend
			// set flag to false to notify you are analysing the data
			// stop listening to think a little
			que = q.slice(5).trim()
			listening = false
			rec.stop()
		}
		else if(q.startsWith('hey')){

			// question analysis in rec.onend
			// set flag to false to notify you are analysing the data
			// stop listening to think a little
			que = q.slice(3).trim()
			listening = false
			rec.stop()
		}
		else if(q == 'hey'){
			first = false
			listening = false
			rec.stop()
		}
		
		else{

			// set this only to know user was silent
			q = ''
		}
	}
	
	rec.onend = e => {

		// work only if user said something starting with hey
		if(!listening && que != ''){
			think(que)
			first = false
		}

			// if not listen again =)
		else{
			if(wait){
				rec.start()
				first = !first
			}
			else{
				sub.innerHTML=startText
			}
		}
	}
	
}