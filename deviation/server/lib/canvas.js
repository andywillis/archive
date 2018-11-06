var us = require('underscore')

var getCanvas = function(entry, data){
	var dec = '',
				tup = 1

	// Get dec code data
	for (var c = 0, l = data.length; c < l; c++){
		if (tup === 1) {dec += '['}
		dec += data.charCodeAt(c)
		if (tup === 3) {dec += ']'; tup = 1}
		else {tup ++}
		if (c < l) {dec += ','}
	}
	if (tup > 1) {
		for (var t = tup, l = 4; t < l; t ++){
			dec += '0'
			if (t < 3) {dec += ','}
		}
		dec+='],[0,0,0]'
	}
	
	var decLen = eval('[' + dec + ']').length,
				spotsPerRow = 31,
				cHeight = Math.ceil(decLen/spotsPerRow),
				spotHeight = 1,
				spotWidth = 1

	canvas = '<canvas class="canvas" id="c' + entry + '" data-rgb="' + dec + '" width="' + spotsPerRow*spotWidth + '" height="' + cHeight*spotHeight + '" style="border:1px solid rgba(0,0,0,1);"></canvas>'
	return canvas
}

var createSpotmap = function(data, callback) {
	
	var rgba = data
		,	Canvas = require('canvas')
		,	processListSpotmap = require('./core').processListSpotmap
		,	rgbaLen = rgba.length
		,	spot = {
				size: 8
			,	border: 'rgba(120,120,120,1)'
			,	borderWidth: 0.1
			}
		,	o = []
		,	xpos = 0
		,	ypos = 0
		,	additionalParameters = [spot,xpos,ypos]

		o[0] = new Canvas(spot.size*60,(spot.size*rgbaLen)/60)
		o[1] = o[0].getContext('2d')

		var processSpotmapData = function(entry, iteration, o, additionalParameters, callback) {
			
			var spot = additionalParameters[0]
				,	xpos = additionalParameters[1]
				,	ypos = additionalParameters[2]

			if (iteration % 60 === 0 && iteration !== 0) {
				ypos = ypos + spot.size
				xpos = 0
			}

			o[1].beginPath();
			o[1].rect(xpos,ypos,spot.size,spot.size)
			o[1].fillStyle = 'rgba(' + entry + ', 1)'
			o[1].fill()
			o[1].lineWidth = spot.borderWidth
			o[1].strokeStyle = spot.border
			o[1].stroke()
			xpos = xpos + spot.size

			additionalParameters[1] = xpos
			additionalParameters[2] = ypos

			callback(o, iteration, additionalParameters)

		}

		processListSpotmap(rgba, processSpotmapData, o, additionalParameters, function(o) {
			callback(o[0])
		})

}

var getSwatchData = function(data, num) {

//	var num = 12
	var MMCQ = require('./quantize').MMCQ
	var cmap = MMCQ.quantize(data, num);
	var newPalette = cmap.palette();
	var swatch = us.uniq(data.map(function(p) {
	 		return cmap.map(p)
		}))
	return swatch

}

var createSwatchImage = function(data, callback) {

	var rgba = data
		,	Canvas = require('canvas')
		,	processListSpotmap = require('./core').processListSpotmap
		,	rgbaLen = rgba.length
		,	spot = {
				size: 20
			,	border: 'rgba(120,120,120,1)'
			,	borderWidth: 0.1
			}
		,	o = []
		,	xpos = 0
		,	ypos = 0
		,	additionalParameters = [spot,xpos,ypos]

		o[0] = new Canvas(spot.size*rgba.length, spot.size)
		o[1] = o[0].getContext('2d')

		var processSwatchData = function(entry, iteration, o, additionalParameters, callback) {
			
			var spot = additionalParameters[0]
				,	xpos = additionalParameters[1]
				,	ypos = additionalParameters[2]

			o[1].beginPath();
			o[1].rect(xpos,ypos,spot.size,spot.size)
			o[1].fillStyle = 'rgba(' + entry + ', 1)'
			o[1].fill()
			o[1].lineWidth = spot.borderWidth
			o[1].strokeStyle = spot.border
			o[1].stroke()
			xpos = xpos + spot.size

			additionalParameters[1] = xpos
			additionalParameters[2] = ypos

			callback(o, iteration, additionalParameters)

		}

		processListSpotmap(rgba, processSwatchData, o, additionalParameters, function(o) {
			callback(o[0])
		})

}

exports.createSpotmap = createSpotmap
exports.getCanvas = getCanvas
exports.createSwatchImage = createSwatchImage
exports.getSwatchData = getSwatchData
