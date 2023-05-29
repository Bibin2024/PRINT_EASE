function displayFileName() {
  const fileInput = document.getElementById('file-upload');
  const fileName = document.getElementById('file-name');
  const labelUpload = document.getElementById('label-upload');
  if (fileInput.files.length > 0) {
    labelUpload.textContent = fileInput.files[0].name;
  } else {
    fileName.textContent = '';
  }
}

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
// collect DOMs
const display = document.querySelector('.display')
const controllerWrapper = document.querySelector('.controllers')

const State = ['Initial', 'Record', 'Download']
let stateIndex = 0
let mediaRecorder, chunks = [], audioURL = ''

// mediaRecorder setup for audio
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    console.log('mediaDevices supported..')

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
        }

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'})
            chunks = []
            audioURL = window.URL.createObjectURL(blob)
            document.querySelector('audio').src = audioURL

        }
    }).catch(error => {
        console.log('Following error has occured : ',error)
    })
}else{
    stateIndex = ''
    application(stateIndex)
}

const clearDisplay = () => {
    display.textContent = ''
}

const clearControls = () => {
    controllerWrapper.textContent = ''
}

const record = () => {
    stateIndex = 1
    mediaRecorder.start()
    application(stateIndex)
}

const stopRecording = () => {
    stateIndex = 2
    mediaRecorder.stop()
    application(stateIndex)
}

const downloadAudio = () => {
    const downloadLink = document.createElement('a')
    downloadLink.href = audioURL
    downloadLink.setAttribute('download', 'audio')
    downloadLink.click()
}

const addButton = (id, funString, text) => {
  const btn = document.createElement('button');
  btn.id = id;
  btn.setAttribute('onclick', funString);
  btn.textContent = text;
  btn.classList.add('addButton');

  controllerWrapper.append(btn);
};

const addMessage = (text) => {
    const msg = document.createElement('p')
    msg.textContent = text
    display.append(msg)
}

const addAudio = () => {
    const audio = document.createElement('audio')
    audio.controls = true
    audio.src = audioURL
    display.append(audio)
}

const application = (index) => {
    switch (State[index]) {
        case 'Initial':
            clearDisplay()
            clearControls()

            addButton('record', 'record()', 'Start Recording')
            break;

        case 'Record':
            clearDisplay()
            clearControls()

            addMessage('Recording...')
            addButton('stop', 'stopRecording()', 'Stop Recording')
            break

        case 'Download':
            clearControls()
            clearDisplay()

            addAudio()
            addButton('record', 'record()', 'Record Again')
            break

        default:
            clearControls()
            clearDisplay()

            addMessage('Your browser does not support mediaDevices')
            break;
    }

}
application(stateIndex)