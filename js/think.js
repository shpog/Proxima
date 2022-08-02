function think(q){

	// if(q.startsWith('say, ')){
	// 	sub.innerHTML = `<h1>${q.slice(5)}</h1>`
	// 	say(q.slice(5),e => {})
	// }
	// else if(q.startsWith('say ')){
	// 	sub.innerHTML = `<h1>${q.slice(4)}</h1>`
	// 	say(q.slice(4),e => {})
	// }

	// else if(q == 'what can you do'){
	// 	sub.innerHTML = `<h1>You would like to know...</h1>`
	// 	say('You would like to know...',e => {})
	// }
	
	sub.innerHTML = `<h1>${q}</h1>`
	say(q,e => {})
	
}