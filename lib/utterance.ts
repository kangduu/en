export default function utterance(
  text: string,
  option?: {
    lang?: SpeechSynthesisVoice | null;
    rate?: number; // 语速
    pitch?: number; // 音调
  }
): () => void {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.voice = option?.lang || null;
  utterance.rate = option?.rate || 1;
  utterance.pitch = option?.pitch || 1;

  utterance.onend = () => {
    console.log(1);
  };
  speechSynthesis.speak(utterance);
  return speechSynthesis.cancel;
}
