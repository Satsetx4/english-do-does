import { afterEach, describe, expect, it, vi } from 'vitest';
import { sound } from './sound';

const originalSpeechSynthesis = Object.getOwnPropertyDescriptor(window, 'speechSynthesis');
const originalUtterance = Object.getOwnPropertyDescriptor(globalThis, 'SpeechSynthesisUtterance');

afterEach(() => {
  sound.enabled = true;
  if (originalSpeechSynthesis) {
    Object.defineProperty(window, 'speechSynthesis', originalSpeechSynthesis);
  } else {
    Reflect.deleteProperty(window, 'speechSynthesis');
  }
  if (originalUtterance) {
    Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', originalUtterance);
  } else {
    Reflect.deleteProperty(globalThis, 'SpeechSynthesisUtterance');
  }
  vi.restoreAllMocks();
});

describe('sound mute behavior', () => {
  it('does not speak while muted and cancels speech when muted', () => {
    const cancel = vi.fn();
    const speak = vi.fn();
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { cancel, speak },
    });
    Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
      configurable: true,
      value: class {
        lang = '';
        rate = 1;
        pitch = 1;
        constructor(public text: string) {}
      },
    });

    sound.speak('She does her homework.');
    expect(speak).toHaveBeenCalledOnce();

    sound.enabled = false;
    expect(cancel).toHaveBeenCalledTimes(2);
    sound.speak('She does her homework.');
    expect(speak).toHaveBeenCalledOnce();

    sound.enabled = true;
    sound.speak('She does her homework.');
    expect(speak).toHaveBeenCalledTimes(2);
  });

  it('falls back quietly when speech synthesis is unavailable', () => {
    Reflect.deleteProperty(window, 'speechSynthesis');
    expect(() => sound.speak('Do you like tea?')).not.toThrow();
  });
});
