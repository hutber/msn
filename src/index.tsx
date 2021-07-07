import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ul id="log"></ul>
  </React.StrictMode>,
  document.getElementById('root')
)

var log = document.getElementById('log');
document.addEventListener('drop', drop);
document.addEventListener('dragover', drag);
document.addEventListener('dragenter', dragin, false);
document.addEventListener('dragleave', dragout, false);
document.addEventListener('dragend', dragout, false);
document.addEventListener('drop', dragout, false);

function drop(e) {
	e.preventDefault();
  
  var file = e.dataTransfer.files[0];
  var reader = new FileReader();
  reader.addEventListener('load', fileIn);
  console.log(file);
  reader.readAsText(file);
}

function drag(e) {
	e.preventDefault();
}

function dragin(e) {
	log.style.backgroundColor = '#c00';
}

function dragout(e) {
	log.style.backgroundColor = '';
}

function fileIn(e) {
	var xml = e.target.result;
  var parser = new DOMParser();
  var doc = parser.parseFromString(xml, 'text/xml');
  var messages = doc.getElementsByTagName('Message');
  
  var names = [];
  var colors = [
  	'#333',
    '#036',
    '#060',
    '#c00'
  ];
  
  log.style.display = 'none';
  log.innerHTML = '';
  
  for (var i = 0; i < messages.length; i++) {
  	var m = messages[i];

    var from = m.children[0].children[0].getAttribute('FriendlyName');
    var date = m.getAttribute('Date');
    var time = m.getAttribute('Time');
    var text = m.children[2].textContent;
    
    var e = document.createElement('li');
    var t = document.createElement('h3');
    var dateText = document.createElement('h3');
    var timeText = document.createElement('h4');
    var s = document.createElement('span');
    t.textContent = from;
    s.textContent = text;
    dateText.textContent = date + ' - ' + time;
    e.appendChild(dateText);
    e.appendChild(t);
    e.appendChild(s);

		if (names.indexOf(from) == -1) names.push(from);
		e.style.backgroundColor = colors[names.indexOf(from)];
    
    log.appendChild(e);
  }
  
  log.style.display = 'block';
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
