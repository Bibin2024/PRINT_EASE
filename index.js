let fileName;
let fileInput;
var pageCount;
document.getElementById("file-upload").addEventListener('change', function (event) {
  fileInput = document.getElementById('file-upload');
  const labelUpload = document.getElementById('label-upload');
  if (fileInput.files.length > 0) {
    labelUpload.textContent = fileInput.files[0].name;
  } else {
    labelUpload.textContent = '';
  }
  fileName = fileInput.files[0].name;
  document.querySelector(".button_wrapper").style.display="block";
});

var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';
script.onload = function () {
  document.getElementById("file-upload").addEventListener('change', function (event) {
    const fileInput = document.getElementById('file-upload');

    // Check if a file is selected
    if (fileInput.files.length === 0) {
      console.log('No file selected.');
      return;
    }

    const file = fileInput.files[0];

    // Read the file
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileData = new Uint8Array(e.target.result);

      // Load the PDF document
      pdfjsLib.getDocument(fileData).promise.then(function (pdf) {
        // Get the number of pages
        pageCount = pdf.numPages;
        //console.log('Number of pages:', pageCount);
      }).catch(function (error) {
        console.error('Error loading PDF:', error);
      });
    };
    reader.readAsArrayBuffer(file);
  });
}
document.head.appendChild(script);


function profile(){
  window.location.assign("profile.html")
}

const plus=document.querySelector(".plus"),
minus=document.querySelector(".minus"),
num=document.querySelector(".num");
let a =1;
plus.addEventListener("click", ()=>{
  a++;
  a=(a<10)?"0"+a:a;
  num.innerText=a;
  console.log(a);
});
minus.addEventListener("click", ()=>{
  if(a>1){
    a--;
    a=(a<10)?"0"+a:a;
    num.innerText=a;
  }
});


let mediaRecorder;
let chunks = [];
let stream;
let audioPlayer = document.getElementById("audio-player");
let audioUrl = 'null'

document.getElementById("start").addEventListener('click', function (event) {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (streamData) {
      stream = streamData;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener('dataavailable', function (event) {
        chunks.push(event.data);
      });
      mediaRecorder.start();
      console.log('Recording started');
      document.getElementById("stop").style.display="block";
      document.getElementById("start").style.display="none";
      document.getElementById("text").textContent="Recording : ";
    })
    .catch(function (error) {
      console.error('Error accessing microphone : ', error);
    });
});

document.getElementById("stop").addEventListener('click', function (event) {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    mediaRecorder.addEventListener('stop', function () {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      audioUrl = URL.createObjectURL(audioBlob);
      console.log(audioPlayer)
      audioPlayer.src = audioUrl;
      //audioPlayer.play(); // Uncomment this line to play the recorded audio automatically
      console.log('Recording stopped');
      document.getElementById("start").style.display="block";
      console.log('Audio URL:', audioUrl);
      document.getElementById("audio-player").style.display = "block";
      document.getElementById("stop").style.display="none";
      document.getElementById("text").textContent="To Change recording : ";
      // Do something with the recorded audio data (e.g., upload to Firebase)
    });
  }
});

function pay(){
  var data=document.getElementsByName("btn");
  var i;
  for(i=0;i<=data.length;i++){
      if(data[i].checked){
          if(data[i].value=="Offline"){
              window.location.assign("offline.html")
          }
          else{
              window.location.assign("online.html")
          }
      }
  }
}
