import dayjs from "dayjs";

/**
 * 日期转为周几
 * @param day 某一天
 * @param language 语言
 * @returns week
 */
export function dayOfWeek(day: string, language?: string): string {
  if (typeof day !== "string") return "";
  if (language) return dayjs(day).locale(language).format("dddd");
  return dayjs(day).format("dddd");
}
