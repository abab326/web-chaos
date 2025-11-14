import type { Directive } from 'vue'

/**
 * 水印指令
 * @directive v-watermark
 * @param text 水印文本 (支持数组形式多行显示)
 * @param options 水印配置
 */
interface WatermarkOptions {
  text?: string | string[]
  fontSize?: number
  color?: string
  opacity?: number
  angle?: number
  zIndex?: number
}

export type WatermarkDirective = Directive<HTMLElement, string | string[] | WatermarkOptions>

declare module 'vue' {
  export interface GlobalDirectives {
    // 这里需要声明你注册的指令和其类型
    watermark: WatermarkDirective
  }
}
