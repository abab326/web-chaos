import type { Directive, DirectiveBinding } from 'vue'

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

/**
 * 清理水印资源
 */
function cleanupWatermark(el: HTMLElement): void {
  const oldWatermarkRef = (el as any).__watermarkRef__
  const oldObserver = (el as any).__watermarkObserver__

  // 移除旧的水印容器
  if (oldWatermarkRef?.container) {
    oldWatermarkRef.container.remove()
  }

  // 断开旧的观察者
  if (oldObserver) {
    oldObserver.disconnect()
  }

  // 清理元素上的引用
  delete (el as any).__watermarkRef__
  delete (el as any).__watermarkObserver__
}

/**
 * 创建水印并挂载到元素
 */
function createWatermark(
  el: HTMLElement,
  binding: DirectiveBinding<string | string[] | WatermarkOptions>
): void {
  // 先清理现有的水印
  cleanupWatermark(el)

  // 默认配置
  const defaultOptions: WatermarkOptions = {
    text: 'Watermark',
    fontSize: 28,
    color: 'rgba(0, 0, 0, 0.1)',
    opacity: 0.1,
    angle: -15,
    zIndex: 9999,
  }

  // 解析绑定配置
  let options: WatermarkOptions
  if (typeof binding.value === 'string' || Array.isArray(binding.value)) {
    options = { ...defaultOptions, text: binding.value }
  } else {
    options = { ...defaultOptions, ...binding.value }
  }
  const { url, width, height } = createWatermarkImage(
    options.text,
    options.fontSize!,
    options.color!,
    options.angle!
  )
  // 创建水印容器
  const watermarkContainer = document.createElement('div')
  watermarkContainer.style.position = 'absolute'
  watermarkContainer.style.top = '0'
  watermarkContainer.style.left = '0'
  watermarkContainer.style.width = '100%'
  watermarkContainer.style.height = '100%'
  watermarkContainer.style.overflow = 'hidden'
  watermarkContainer.style.pointerEvents = 'none'
  watermarkContainer.style.zIndex = `${options.zIndex}`
  watermarkContainer.style.backgroundImage = `url(${url})`
  watermarkContainer.style.backgroundRepeat = 'repeat'
  watermarkContainer.style.backgroundSize = `${width}px ${height}px`
  watermarkContainer.style.opacity = `${options.opacity}`

  // 确保目标元素为相对定位
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }

  // 挂载水印容器到目标元素
  el.appendChild(watermarkContainer)

  // 保存引用信息
  const watermarkRef = { container: watermarkContainer, options }
  ;(el as any).__watermarkRef__ = watermarkRef

  // 创建并启动观察者（防止水印被移除）
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // 检查水印容器是否被移除
        const isRemoved = !Array.from(el.children).includes(watermarkContainer)
        if (isRemoved) {
          // 重新挂载水印容器
          el.appendChild(watermarkContainer)
        }
      }
    })
  })

  observer.observe(el, { childList: true })
  ;(el as any).__watermarkObserver__ = observer
}
/**
 * 创建水印图片
 *
 */
function createWatermarkImage(
  text: string | string[] = 'Watermark',
  fontSize: number,
  color: string,
  angle: number
): { url: string; width: number; height: number } {
  // 处理文本为数组格式
  const textArray = Array.isArray(text) ? text : [text]
  // 创建画布并绘制水印文本
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return { url: '', width: 0, height: 0 }
  }
  // 计算文本尺寸和画布大小
  const lineHeight = fontSize! * 1.5
  const textFont = `${fontSize}px/${lineHeight}px sans-serif`
  // 设置文本样式
  ctx.font = textFont
  ctx.fillStyle = color!
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // 计算文本高度（使用实际字体高度）
  const { actualBoundingBoxAscent: textAscent, actualBoundingBoxDescent: textDescent } =
    ctx.measureText(textArray[0]!)
  const textHeight = textAscent + textDescent
  // 计算文本最大宽度（使用实际字体宽度）
  const maxTextWidth = Math.max(...textArray.map((text) => ctx.measureText(text).width))
  const maxTextHeight = textHeight * textArray.length
  console.log('maxTextWidth', maxTextWidth)
  console.log('maxTextHeight', maxTextHeight)

  // 计算旋转角度的弧度
  const angleRad = (angle! * Math.PI) / 180
  const sinAngle = Math.abs(Math.sin(angleRad))
  const cosAngle = Math.abs(Math.cos(angleRad))
  // 计算旋转后的文本块宽度和高度
  const rotatedWidth = maxTextWidth * cosAngle + maxTextHeight * sinAngle
  const rotatedHeight = maxTextWidth * sinAngle + maxTextHeight * cosAngle

  canvas.width = rotatedWidth
  canvas.height = rotatedHeight
  // 计算文本起始位置
  const startY = maxTextWidth * sinAngle
  ctx.font = textFont
  ctx.translate(0, startY)
  ctx.rotate(angleRad)

  textArray.forEach((text, index) => {
    ctx.fillText(text, 0, (index + 1) * textHeight)
  })
  return { url: canvas.toDataURL(), width: rotatedWidth, height: rotatedHeight }
}

export const watermark: Directive<HTMLElement, string | string[] | WatermarkOptions> = {
  mounted(el, binding) {
    createWatermark(el, binding)
  },

  updated(el, binding) {
    createWatermark(el, binding)
  },

  unmounted(el) {
    cleanupWatermark(el)
  },
}
