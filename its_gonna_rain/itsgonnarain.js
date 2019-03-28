let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 8, rate = 1) {
  let sourceNode = audioContext.createBufferSource();
  // let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 35.3;
  sourceNode.loopEnd = 37;
  sourceNode.playbackRate.value = rate;
  // pannerNode.pan.value = pan;

  // sourceNode.connect(pannerNode);
  sourceNode.connect(audioContext.destination);

  sourceNode.start(0, 35.3);
}

fetch("06 - A Hard Rain's A-Gonna Fall.mp3")
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, 1, 1.002);
  })
  .catch(e => console.error(e));
