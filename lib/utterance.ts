export type UtteranceOptions = Pick<
  SpeechSynthesisUtterance,
  "lang" | "voice" | "rate" | "pitch" | "volume"
>;

export default function utterance(
  text: string,
  option?: UtteranceOptions
): SpeechSynthesisUtterance & {
  start: () => void;
  stop: () => void;
} {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = option?.lang || "en-US";
  utterance.voice = option?.voice || null;
  utterance.rate = option?.rate || 1;
  utterance.pitch = option?.pitch || 1;
  return {
    ...utterance,
    start: () => {
      speechSynthesis.speak(utterance);
    },
    stop: speechSynthesis.cancel,
  };
}
