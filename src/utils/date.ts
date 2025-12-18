import dayjs from 'dayjs';
import type { ConfigType, QUnitType } from 'dayjs';
/**
 * 格式化时间
 * @param date 时间
 * @param format 格式化字符串
 * @returns 格式化后的时间字符串
 */
export function formatDate(date: ConfigType, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format);
}

/**
 * 计算时间差
 * @param date 时间
 * @param unit 时间单位
 * @returns 时间差
 */
export function calculateTimeDifference(date: ConfigType, unit: QUnitType = 'minute'): number {
  return dayjs().diff(dayjs(date), unit);
}
