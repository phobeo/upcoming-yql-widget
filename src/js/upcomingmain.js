var out = document.getElementById('output');
var offset = 0;
var count = 5;
  function get() {
	out.innerHTML = '<img src="css/i/loading.gif" alt="loading"/><br/>loading...';
    var old = document.getElementById('triggerscript');
	if(old){
		old.parentNode.removeChild(old);
	}
	var where = document.getElementById('loc').value;
    var url='http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20upcoming.events(100)%20where%20woeid%20in%20(select%20woeid%20from%20geo.places%20where%20text%3D%22'+encodeURIComponent(where)+'%22)%20limit%20'+count+'%20offset%20'+offset+'%20%7C%20sort(field%3D%22start_date%22)&format=json&callback=displayResult';
    var s = document.createElement('script');
    s.setAttribute('id','triggerscript');
    s.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(s);
    
    return false;
  }
  function displayResult(o){
	var nav = document.getElementById('navigation');
    nav.innerHTML = '';
	if(offset > 0) {
		nav.innerHTML += '<a href="#" onclick="offset-=count;get();">&lt; prev</a>&nbsp;';
    } if(o.query.count > 0) {
    	nav.innerHTML += '<a href="#" onclick="offset+=count;get();">more &gt;</a>';
    }

    if(o.query.results!==null && o.query.count > 0){
	  
      var outlist = "<div class='results'>";
	  for(var i=0; i<o.query.results.event.length; i++) {
	  	outlist += getPrettyMarkup(o.query.results.event[i]);
	  }
	  outlist += "</div>"
	  out.innerHTML = outlist;
    } else{
      out.innerHTML = '<p><img src="css/i/error.png" alt="error"/></p><p>Sorry, seems there are no more events around that area. Want to try somewhere else?</p>';
    }
  }

  /* returns the markup for displaying the given event data */
  function getPrettyMarkup(evt) {
	var markup ='<div class="event">';
	markup += '<p class="event_name"><a href="'+evt.url+'">'+evt.name+'</a></p>';
    markup += '<p>'+evt.venue_name+', '+evt.venue_address+' ('+evt.venue_zip+')</p>';
	markup += '<p>'+evt.start_date_last_rendition+' '+evt.start_time+'</p>';
	markup += '<p class="event_desc">'+evt.description.substring(0,100).replace('/<br\/>/',' ')+'</p>'
	markup += '</div>';
	return markup; 
  }
  document.getElementById('location').onsubmit = function() { offset = 0; get() };