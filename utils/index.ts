/**
 * Convert a color string in hex format to rgba format
 * @param hex color string in hex
 * @param alpha
 * @returns
 */
export function hexToRgb(hex: string, alpha: number = 0.7): string {
  const match = hex.match(/\w\w/g);
  if (!match) throw new Error("Invalid hex color format");
  const [r, g, b] = match.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type MatchSentenceReturn = {
  translate: string;
  english: string;
};

/**
 * 使用正则表达式匹配英文和中文部分
 * @param sentence
 * @returns {MatchSentenceReturn}
 */
export function matchSentence(sentence: string): MatchSentenceReturn {
  try {
    const regex = /^([^（]+)（([^）]+)）/;
    const match = sentence.match(regex);
    if (!match) return { english: sentence, translate: "" };
    return { english: match?.[1] || "", translate: match?.[2] || "" };
  } catch (error) {
    console.log(error);
    return { english: "", translate: "" };
  }
}
