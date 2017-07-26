import { Howl } from 'howler';
import { getVoiceURLForNumber } from 'app/utils/voice';

const VOICE_CACHE = {};
const EMPTY_FUNC = () => null;

export function playVoice(number, option = {}) {
  const onLoad = option.onLoad || EMPTY_FUNC;
  const onEnd = option.onEnd || EMPTY_FUNC;
  const voiceURL = getVoiceURLForNumber(number);
  let sound = VOICE_CACHE[number];

  if (sound) {
    onLoad();
    sound.play();
  } else {
    sound = new Howl({
      src: [voiceURL],
    });
    VOICE_CACHE[number] = sound;

    sound.once('load', () => {
      onLoad();
      sound.play();
    });
  }

  sound.on('end', onEnd);
}
