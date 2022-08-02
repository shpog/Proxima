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
		sub.innerHTML=`<h1>I can respond to your commands</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas, ligula efficitur gravida pulvinar, erat nulla auctor massa, ut dignissim quam tellus eget dolor. Etiam aliquet commodo tellus id porta. Quisque bibendum consequat porttitor. Donec pretium nunc dolor, et placerat dolor fringilla id. Duis aliquam felis erat, sit amet sollicitudin diam sollicitudin id. Aenean a lobortis nisi. Fusce elementum cursus quam vitae pellentesque. Quisque nisi lorem, tincidunt et lectus in, gravida elementum est. Sed et lorem vitae justo mollis suscipit. In vitae ante id lorem tristique pharetra. Pellentesque volutpat lectus eget lorem mattis congue. Quisque vitae gravida metus.</p>`
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