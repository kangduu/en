export type UtteranceOptions = Pick<
  SpeechSynthesisUtterance,
  "rate" | "pitch" | "volume"
>;

/**
 * Play a speech synthesis utterance
 * @param text The text to be spoken
 * @param options The options for the utterance
 */
export default function utterancePlay(
  text: string,
  options?: UtteranceOptions
) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  // utterance.voice = options?.voice || null;
  utterance.rate = options?.rate || 1;
  utterance.pitch = options?.pitch || 1;
  utterance.volume = 1;
  if (speechSynthesis.pending || speechSynthesis.speaking)
    speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

export function utteranceStop() {
  speechSynthesis.cancel();
}
