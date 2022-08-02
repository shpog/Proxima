function think(que){
	// fancy display setup
	let con = document.querySelector('#content')
	let sub = document.querySelector('#subcontent')
	
	if(que == 'quit' || que == 'exit'){
		wait = false
		longer = false
		sub.innerHTML=startText
		say("Tap the screen if you'll need me again. I'll wait.")
	}
	else if(que == 'what can you do'){
		longer = true
		sub.innerHTML='<h1>I can respond to your commands</h1>'
		say("I can respond to your commands",e=>{
			rec.start()
		})
	}
	else if (que.startsWith('say')){
		longer = false
		say(que.slice(3).trim(),e=>{
			rec.start()
		})
	}
	else{
		console.log(que)
		rec.start()
	}
	
}