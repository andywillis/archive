$(document).ready(function() {

	var page = $('body').attr('id')
	var edit = (window.location.href.indexOf('/view/') > -1) ? true : false


function encode(string) { return encodeURIComponent(string) }
function decode(string) { return decodeURIComponent(string.replace(/\+/g,  " ")); }

//loadScript('/client/js/soundmanager2/script/soundmanager2-nodebug.js', function() {
//})
	
	$('header nav ul li').filter(function(index){
		return $('a', this).html().toLowerCase().indexOf(page) !== -1
	}).addClass('selected')

	$('input#station').keypress(function(e) {
		if (e.which === 13) {
			window.location.href = '/radio?station=' + $(this).val()
		}
	});

	key('d', function(){
		if (page === 'blog' && edit === true) {
			$.fancybox({
				padding		: 0,
				autoScale		: false,
				transitionIn	: 'none',
				transitionOut	: 'none',
				content: $('#deleteForm').html()
			})			
		}
	})

	key('e', function() {
		if (page === 'blog' && edit === true) {
			$.fancybox({
				padding		: 0,
				autoScale		: false,
				transitionIn	: 'none',
				transitionOut	: 'none',
				content: $('#editForm').html()
			})
		}
	})

	key('p', function() {
		if (page === 'blog') {
			$.fancybox({
				padding		: 0,
				autoScale		: false,
				transitionIn	: 'none',
				transitionOut	: 'none',
				content: $('#postForm').html()
			})
		}
		if (page === 'spotmaps') {
			$.fancybox({
				padding		: 0,
				autoScale		: false,
				transitionIn	: 'none',
				transitionOut	: 'none',
				content: $('#spotmapForm').html()
			})
		}
	})

	$('#deleteItem #submit').live('click', function(){
		var deleteItem = $('#fancybox-content #deleteItem')
		form = {}
		form.id = deleteItem[0].id.value
		form.password = deleteItem[0].password.value

		$.ajax({
	    type: "POST",
	    dataType: "jsonp",
	    jsonpCallback: "statusCallback",
	    url: "/deleteItem",
	    data: form,
	    cache: false,
	    success: function(data) {
				var message = JSON.parse(data)
				if (message.status === 'error') {
		    	$.fancybox({width:180, height: 30, autoDimensions: false, padding:20, autoScale:true, transitionIn:'none', transitionOut:'none', showCloseButton: false, content: message.data,
						onComplete: function() {
							setTimeout(function(){
								content = $('#deleteForm').html()
								$.fancybox({padding:0, autoScale:false, transitionIn:'none', transitionOut:'none', content: content})
							}, 1500)
			      } 
					})
				} else {
		    	$.fancybox.close()
		    	$.fancybox({width:200, padding:20, autoScale:true, transitionIn:'none', transitionOut:'none', showCloseButton: false, content: message.data,
						onComplete: function() {
							setTimeout(function(){$.fancybox.close(); window.location.href = '/blog'}, 1500)
			      } 
					})
		    	return false;
	    	}
	    },
			error: function(jqXHR, textStatus, errorThrown) {
				alert('error ' + textStatus + " " + errorThrown);
			}
	  });
	});
	

	$('#addPost #submit').live('click', function(){
		var addPost = $('#fancybox-content #addPost')
			,	date = $('#fancybox-content #addPost #date').html()

		form = {}
		form.date = date
		form.title = addPost[0].title.value
		form.post = addPost[0].post.value
		form.category = addPost[0].category.value
		form.tags = addPost[0].tags.value
		form.password = addPost[0].password.value
		$.ajax({
	    type: "POST",
	    dataType: "jsonp",
	    jsonpCallback: "statusCallback",
	    url: "/addPost",
	    data: form,
	    cache: false,
	    success: function(data) {
				var message = JSON.parse(data)
				if (message.status === 'error') {
		    	$.fancybox({width:180, height: 30, autoDimensions: false, padding:20, autoScale:true, transitionIn:'none', transitionOut:'none', showCloseButton: false, content: message.data,
						onComplete: function() {
							setTimeout(function(){
								content = $('#postForm').html()
								content = content.replace('id="title"', 'id="title" value="' + form.title + '"')
									.replace('<textarea name="post" id="post"></textarea>', '<textarea name="post" id="post">' + form.post + '</textarea>')
									.replace('id="tags"', 'id="tags" value="' + form.tags + '"')
									.replace('selected="selected"', '')
									.replace('value="' + form.category + '"', 'value="' + form.category + '" selected="selected"')
								$.fancybox({padding:0, autoScale:false, transitionIn:'none', transitionOut:'none', content: content})
							}, 1500)
			      } 
					})
				} else {
		    	$.fancybox.close()
		    	$.fancybox({width:200, padding:20, autoScale:true, transitionIn:'none', transitionOut:'none', showCloseButton: false, content: message.data,
						onComplete: function() {
							setTimeout(function(){$.fancybox.close(); window.location.href = '/blog'}, 1500)
			      } 
					})
		    	return false;
	    	}
	    },
			error: function(jqXHR, textStatus, errorThrown) {
				alert('error ' + textStatus + " " + errorThrown);
			}
	  });
	});

	$('#editPost #submit').live('click', function(){
		var editPost = $('#fancybox-content #editPost')
			,	date = $('#fancybox-content #editPost #date').html()

		form = {}
		form.id = editPost[0].id.value
		form.date = date
		form.title = editPost[0].title.value
		form.post = editPost[0].post.value
		form.category = editPost[0].category.value
		form.tags = editPost[0].tags.value
		form.password = editPost[0].password.value
		$.ajax({
	    type: "POST",
	    dataType: "jsonp",
	    jsonpCallback: "statusCallback",
	    url: "/editPost",
	    data: form,
	    cache: false,
	    success: function(data) {
				var message = JSON.parse(data)
				if (message.status === 'error') {
		    	$.fancybox({width:180, height: 30, autoDimensions: false, padding:20, autoScale:true, transitionIn:'none', transitionOut:'none', showCloseButton: false, content: message.data,
						onComplete: function() {
							setTimeout(function(){
								content = $('#editForm').html()
								content = content.replace('id="title"', 'id="title" value="' + form.title + '"')
									.replace('<textarea name="post" id="post"></textarea>', '<textarea name="post" id="post">' + form.post + '</textarea>')
									.replace('id="tags"', 'id="tags" value="' + form.tags + '"')
									.replace('selected="selected"', '')
									.replace('value="' + form.category + '"', 'value="' + form.category + '" selected="selected"')
								$.fancybox({padding:0, autoScale:false, transitionIn:'none', transitionOut:'none', content: content})
							}, 1500)
			      } 
					})
				} else {
		    	$.fancybox.close()
		    	$.fancybox({width:200, padding:20, autoScale:true, transitionIn:'none', transitionOut:'none', showCloseButton: false, content: message.data,
						onComplete: function() {
							setTimeout(function(){$.fancybox.close(); window.location.href = '/blog'}, 1500)
			      } 
					})
		    	return false;
	    	}
	    },
			error: function(jqXHR, textStatus, errorThrown) {
				alert('error ' + textStatus + " " + errorThrown);
			}
	  });
	});

	$('#addSpotmap #submit').live('click', function(){
		var addSpotmap = $('#fancybox-content #addSpotmap')
			,	date = $('#fancybox-content #addSpotmap #date').html()

		form = {}
		form.date = date
		form.title = addSpotmap[0].title.value
		form.rgba = addSpotmap[0].rgba.value
		form.director = addSpotmap[0].director.value
		form.writer = addSpotmap[0].writer.value
		form.year = parseInt(addSpotmap[0].year.value)
		form.category = addSpotmap[0].category.value
		form.tags = addSpotmap[0].tags.value
		form.password = addSpotmap[0].password.value
		console.log(form);

		$.ajax({
	    type: "POST",
	    dataType: "jsonp",
	    jsonpCallback: "statusCallback",
	    url: "/addSpotmap",
	    data: form,
	    cache: false,
	    success: function(data) {
				var message = JSON.parse(data)
				if (message.status === 'error') {
		    	$.fancybox({width:180, height: 30, autoDimensions: false, padding:20, autoScale:true, transitionIn:'none', transitionOut:'none', showCloseButton: false, content: message.data,
						onComplete: function() {
							setTimeout(function(){
								content = $('#postSpotmap').html()
								content = content.replace('id="title"', 'id="title" value="' + form.title + '"')
									.replace('<textarea name="spotmap" id="spotmap"></textarea>', '<textarea name="spotmap" id="spotmap">' + form.rgba + '</textarea>')
									.replace('id="tags"', 'id="tags" value="' + form.tags + '"')
									.replace('selected="selected"', '')
									.replace('value="' + form.category + '"', 'value="' + form.category + '" selected="selected"')
									.replace('id="director"', 'id="director" value="' + form.director + '"')
									.replace('id="writer"', 'id="writer" value="' + form.writer + '"')
									.replace('id="year"', 'id="year" value="' + form.year + '"')
								$.fancybox({padding:0, autoScale:false, transitionIn:'none', transitionOut:'none', content: content})
							}, 1500)
			      } 
					})
				} else {
		    	$.fancybox.close()
		    	$.fancybox({width:200, padding:20, autoScale:true, transitionIn:'none', transitionOut:'none', showCloseButton: false, content: message.data,
						onComplete: function() {
							setTimeout(function(){$.fancybox.close(); window.location.href = '/spotmaps'}, 1500)
			      } 
					})
		    	return false;
	    	}
	    },
			error: function(jqXHR, textStatus, errorThrown) {
				alert('error ' + textStatus + " " + errorThrown);
			}
	  });

	});

	setTimeout(function() {
		if (page === 'radio') {
				loadScript('/client/js/soundmanager2/script/soundmanager2-nodebug.js', function() {
					soundManager.url = '/client/js/soundmanager2/swf/'; // directory where SM2 .SWFs live

					soundManager.onready(function(){
						var tracklist = JSON.parse($('div#playlist').html())
						$.each(tracklist, function(index, track){
							var id = track.id
								,	url = track.url
								,	d = track.duration

							soundManager.createSound({
			    			id: id,
			    			url: url,

			    			whileplaying: function(){
			    				var percent = (this.position/d)*100
			    					,	barWidth = percent * 605 / 100
	
//			    				$('.timer').empty().append(this.position + ' of ' + this.duration + ' | ' + percent + '% | ' + barWidth + 'px');
		    					$('img.progressImage').css({'height': '30px', 'width': barWidth + 'px'})
			    			},
								onfinish: function() {
									$('rect').attr('class', 'radioSquare')
									var loc = soundManager.soundIDs.indexOf(id)
									console.log(loc);
									if (loc+1 < soundManager.soundIDs.length) {
										var next = soundManager.soundIDs[loc + 1]
										console.log(next);
										soundManager.play(next)
										$('rect#' + next).attr('class', 'radioSquare active');
										var trackInfo = $('rect#'+ next).attr('data-trackInfo')
										displayTrackInfo(trackInfo)
									}
								}
			  			})
						})

						function displayTrackInfo(trackInfo) {
							trackInfo = JSON.parse(trackInfo
			          .replace(/&amp;/g, '&')
			          .replace(/&quot;/g, '"')
			          .replace(/&apos;/g, "'")
			          .replace(/&lt;/g, '<')
			          .replace(/&gt;/g, '>')
			         )

							var br = '<br/>'
							$('#trackInfo')
								.empty()
								.append('<div id="trackDetails">')
								.append('<span class="timer"></span>')
								.append(br)
								.append('<a class="trackTitle" target="_blank" href="' + trackInfo.permalink_url + '"><img class="soundcloudIcon" src="/client/images/soundcloud.jpg" />' + trackInfo.title + '</a>')
								.append('<div id="progressBar" style="background-size: 604px 30px; background-image:url(' + trackInfo.waveform_url + ')"><img class="progressImage" src="/client/images/progress2.png" /></div>')
								.append('</div>')
						}

						var first = soundManager.soundIDs[0]
						soundManager.play(first)
						$('rect#' + first).attr('class', 'radioSquare active');
						var trackInfo = $('rect#'+ first).attr('data-trackInfo')
						displayTrackInfo(trackInfo)


						$('rect.radioSquare').live('click', function(){
							var id = $(this).attr('id')
							soundManager.stopAll()
							$('rect').attr('class', 'radioSquare');
							soundManager.play(id)
							$('rect#' + id).attr('class', 'radioSquare active');
							var trackInfo = $('rect#'+ id).attr('data-trackInfo')
							displayTrackInfo(trackInfo)
						})
					});
				
					soundManager.beginDelayedInit();

				})
		}
	}, 1000)

	function loadScript(sURL, onLoad) {
	  function loadScriptHandler() {
	    var rs = this.readyState;
	    if (rs == 'loaded' || rs == 'complete') {
	      this.onreadystatechange = null;
	      this.onload = null;
	      if (onLoad) {
	        onLoad();
	      }
	    }
	  }
	  function scriptOnload() {
	    this.onreadystatechange = null;
	    this.onload = null;
	    window.setTimeout(onLoad,20);
	  }

	  var oS = document.createElement('script');
	  oS.type = 'text/javascript';
	  if (onLoad) {
	    oS.onreadystatechange = loadScriptHandler;
	    oS.onload = scriptOnload;
	  }
	  oS.src = sURL;
	  document.getElementsByTagName('head')[0].appendChild(oS);
	}

});