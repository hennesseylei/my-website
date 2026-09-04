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

const networkCanvas = document.getElementById('network-background')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (networkCanvas && !reducedMotion) {
	const networkContext = networkCanvas.getContext('2d')
	let points = []

	function resizeNetwork() {
		const pixelRatio = window.devicePixelRatio || 1
		networkCanvas.width = window.innerWidth * pixelRatio
		networkCanvas.height = window.innerHeight * pixelRatio
		networkContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

		const pointCount = Math.min(44, Math.max(22, Math.floor(window.innerWidth / 28)))
		points = Array.from({ length: pointCount }, function(){
			return {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				velocityX: (Math.random() - 0.5) * 0.12,
				velocityY: (Math.random() - 0.5) * 0.12
			}
		})
	}

	function drawNetwork() {
		const lineColor = getComputedStyle(document.body).getPropertyValue('--mainText').trim() || '#000000'
		networkContext.clearRect(0, 0, window.innerWidth, window.innerHeight)

		points.forEach(function(point){
			point.x += point.velocityX
			point.y += point.velocityY
			if (point.x < 0 || point.x > window.innerWidth) point.velocityX *= -1
			if (point.y < 0 || point.y > window.innerHeight) point.velocityY *= -1
		})

		for (let firstIndex = 0; firstIndex < points.length; firstIndex++) {
			for (let secondIndex = firstIndex + 1; secondIndex < points.length; secondIndex++) {
				const firstPoint = points[firstIndex]
				const secondPoint = points[secondIndex]
				const distance = Math.hypot(firstPoint.x - secondPoint.x, firstPoint.y - secondPoint.y)
				if (distance < 145) {
					networkContext.strokeStyle = lineColor
					networkContext.globalAlpha = (1 - distance / 145) * 0.3
					networkContext.beginPath()
					networkContext.moveTo(firstPoint.x, firstPoint.y)
					networkContext.lineTo(secondPoint.x, secondPoint.y)
					networkContext.stroke()
				}
			}
		}

		networkContext.globalAlpha = 0.5
		networkContext.fillStyle = lineColor
		points.forEach(function(point){
			networkContext.beginPath()
			networkContext.arc(point.x, point.y, 1.4, 0, Math.PI * 2)
			networkContext.fill()
		})
		networkContext.globalAlpha = 1
		requestAnimationFrame(drawNetwork)
	}

	window.addEventListener('resize', resizeNetwork)
	resizeNetwork()
	drawNetwork()
}
