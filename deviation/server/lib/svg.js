var getRadioSquares = function() {
	var array = [], size = 30, x = 0, w = size, h = size, y = 0

	while (array.length < 100) {
		var rgb = []
		for (var c = 0, l = 3; c < l; c++) {
			var randomnumber=Math.floor(Math.random()*256)
			rgb[c] = randomnumber
		}
		if (array.indexOf(rgb) === -1) {
			var square = '<rect id="#{}" x="#{x}" y="#{y}" width="#{w}" stroke="rgba(30,30,40,1)" fill="rgba(#{fill},0.4)" height="#{h}"/>'
				.replace('#{fill}', rgb.join(','))
				.replace('#{x}', x)
				.replace('#{y}', y)
				.replace('#{w}', w)
				.replace('#{h}', h)

			array.push(square)
			x += w
			if (x === w * 20) { y += h; x = 0 }
		}
	}
	var squares = array.join('')
	return squares
}

exports.getRadioSquares = getRadioSquares