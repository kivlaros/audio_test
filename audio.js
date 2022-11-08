var Analyse = function () {
  var an= this,
  AudioContext = w.AudioContext || w.webkitAudioContext;

  //Создание источника
  audio = new Audio();
  audio.src = "test1.ogg";
  controls = true;
  //Создаем аудио-контекст
  context = new AudioContext();
  node = context.createScriptProcessor(2048, 1, 1);
  //Создаем анализатор
  analyser = context.createAnalyser();
  analyser.smoothingTimeConstant = 0.3;
  analyser.fftSize = 512;
  bands = new Uint8Array(analyser.frequencyBinCount);
  //Подписываемся на событие
  audio.addEventListener('canplay', function () {
             //отправляем на обработку в  AudioContext 
            source = context.createMediaElementSource(audio);
            //связываем источник и анализатором
            source.connect(analyser);
            //связываем анализатор с интерфейсом, из которого он будет получать данные
            analyser.connect(node);
            //Связываем все с выходом
            node.connect(context.destination);
            source.connect(context.destination);
            //подписываемся на событие изменения входных данных
            node.onaudioprocess = function () {
                analyser.getByteFrequencyData(bands);
                if (!audio.paused) {
                    if (typeof update === "function") {
                        return update(bands);
                    } else {
                        return 0;
                    }
                }
            };
    });

    return this;
};