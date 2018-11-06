/* 
 * ase.js Copyright 2012 Andy Willis
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * ASE format information from http://www.selapa.net/swatches/colors/fileformats.php#adobe_ase
 */

var createASEFile = function(title, array, size, callback) {

	var fs = require('fs')
		,	core = require('./core')
		,	arr = []
		, swatchTitle = title // 'Terminator'
		,	swatch = array // [[130,30,112],	[255,255,255], [0,0,0],	[244,130,12]]
		,	numberOfBlocks = swatch.length + 1 // + start block and end block

	arr.push({val: 'ASEF', type: 'char', size: 4})
	arr.push({val: 1, type: '16', size: 2})
	arr.push({val: 0, type: '16', size: 2})
	arr.push({val: numberOfBlocks, type: '32', size: 4})
	arr.push({val: 'c0', type: 'hex', size: 1})
	arr.push({val: '01', type: 'hex', size: 1})
	arr.push({val: swatchTitle.length*2+2, type: '32', size: 4})
	arr.push({val: swatchTitle.length, type: '16', size: 2})
	arr.push({val: swatchTitle, type: 'doub', size: swatchTitle.length*2})

	for (sw in swatch) {

		var s = swatch[sw]
			,	webColor = '##{cStr} '
			,	cStr = ''

		for (c in s){ var col = s[c].toString(16) ;(col.length === 1) ? cStr += '0' + col : cStr += col }
		webColor = webColor.replace('#{cStr}', cStr).toUpperCase()

		var sStr =  webColor // '#222aaa ' // s.toString()
			,	sStrL = 8
			,	blLen = 36 // sStrL*2 + 2

		arr.push({val: 1, type: '16', size: 2})
		arr.push({val: blLen, type: '32', size: 4})
		arr.push({val: sStrL, type: '16', size: 2})
		arr.push({val: sStr, type: 'doub', size: sStrL*2})
		arr.push({val: 'RGB ', type: 'char', size: 4})
		arr.push({val: s[0]/255, type: 'p32', size: 4})
		arr.push({val: s[1]/255, type: 'p32', size: 4})
		arr.push({val: s[2]/255, type: 'p32', size: 4})
		arr.push({val: 2, type: '16', size: 2})
	}

	var bLen = 0
	for (el in arr) {	bLen += arr[el].size }
	var b = new Buffer(bLen)
		,	offset = 0

	for (var obj = 0, len = arr.length; obj < len; obj ++) {

		var v = arr[obj].val

		switch(arr[obj].type) {

			case 'char':
				b.write(v, offset)
			break;

			case 'doub':
				for (var el = 0, l = v.length; el < l; el++) {
					b.write('', offset + el*2)
					b.write(v[el], offset + el*2 + 1)
				}
			break;

			case 'hex':
				b.write(v, offset, 'hex')
			break;

			case '16':
				b.writeUInt16BE(v, offset)
			break;

			case '32':
				b.writeUInt32BE(v, offset)
	  	break;

			case 'p32':
				b.writeFloatBE(v, offset)
			break;

		}

		offset += arr[obj].size

	}

	var filename = swatchTitle + size + '.ase'
		,	path = app.ROOT + '/server/temp/'
		,	location = [path,filename]

	fs.writeFile(location[0]+location[1], b)

	callback(location)
}

exports.createASEFile = createASEFile