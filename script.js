console.log('Its working')

let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		console.log('Option clicked:', mode)
		setTheme(mode)
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}
    
    localStorage.setItem('theme', mode)
}

const typingSubtitle = document.getElementById('typing-subtitle')
const phrases = [
	'Software Developer',
	'Problem Solver',
	'Lifelong Learner',
	'Builder & Creator'
]

if (typingSubtitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	let phraseIndex = 0

	setInterval(function(){
		typingSubtitle.classList.add('is-changing')

		setTimeout(function(){
			phraseIndex = (phraseIndex + 1) % phrases.length
			typingSubtitle.textContent = phrases[phraseIndex]
			typingSubtitle.classList.remove('is-changing')
		}, 350)
	}, 2800)
}
