function displayFileName() {
    const fileInput = document.getElementById('file-upload');
    const fileName = document.getElementById('file-name');
    if (fileInput.files.length > 0) {
      fileName.textContent = fileInput.files[0].name;
    } else {
      fileName.textContent = '';
    }
}

var recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.onstart = function() {
  console.log('Recognition started');
};

recognition.onresult = function(event) {
  var transcript = event.results[0][0].transcript;
  var transcriptElement = document.getElementById('transcript');
  transcriptElement.textContent = transcript;
};

recognition.onerror = function(event) {
  console.error('Recognition error:', event.error);
};

function startRecognition() {
  recognition.start();
}
function stopRecognition() {
    recognition.stop();
  }
