let audio = new Audio('audio/Hilight_Tribe.mp3')
const playButton = document.getElementById('play')
const visual = document.getElementById('visual')
const columns = document.querySelectorAll('.column')
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let analyser = null;

//audio.play();
audioSource = audioCtx.createMediaElementSource(audio);
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 128;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

setInterval(()=>{
  analyser.getByteFrequencyData(dataArray);
  //console.log(reateСhannel(dataArray)[0])
  let radius = (reateСhannel(dataArray)[5]/225)*50
  let radius1 = (reateСhannel(dataArray)[6]/225)*50
  let radius2 = (reateСhannel(dataArray)[3]/225)*50
  let radius3 = (reateСhannel(dataArray)[1]/225)*50
  //console.log(Math.round(radius*4))
  visual.style.borderRadius = `${10+radius1}% ${10+radius1}% ${10+radius1}% ${10+radius1}%`
  visual.style.width = `${150-radius}px`
  visual.style.height = `${150-radius}px`
  visual.style.backgroundColor = `rgb(${Math.round(radius*4)}, 100, ${140-Math.round(radius1)}`
  columns.forEach((e,i)=>{
    //console.log(reateСhannel(dataArray)[i])
    e.style.height = `${reateСhannel(dataArray)[i+1]}px`
    
  })
},20)
let togle = false;
playButton.addEventListener('click',()=>{
  console.log('kkk')
  togle?audio.pause():audio.play();
  togle = !togle
})

function reateСhannel(arr){
  let part = arr.length/8
  let j = 0
  let resArr = []
  for(let i=0;i<8;i++){
    let sliceArr = arr.slice(j,j+part).reduce((a, b) => (a + b))/(part+1)*(1+(i/10))
    resArr.push(Math.round(sliceArr))
    j+=part
  }
  return resArr
}