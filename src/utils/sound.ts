export const flipSound = new Audio("/sounds/flip.mp3");
export const modalSound = new Audio("/sounds/modal.mp3");

export const playSound = (sound: HTMLAudioElement, volume = 1) => {
  sound.currentTime = 0;
  sound.volume = volume;
  sound.play();
};

export const fadeOutAudio = (
  sound: HTMLAudioElement, 
  duration = 300, 
  interval = 50
) => {
  const step = sound.volume / (duration / interval);
  const fadeOut = setInterval(() => {
    if (sound.volume > step) {
      sound.volume -= step;
    } else {
      sound.volume = 0;
      clearInterval(fadeOut);
    }
  }, interval);
};