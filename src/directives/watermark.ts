import type { Directive, DirectiveBinding } from 'vue';
/**
 * 水印指令
 * @directive v-watermark
 * @param text 水印文本 (支持数组形式多行显示)
 * @param options 水印配置
 */
interface WatermarkOptions {
  text?: string | string[];
  fontSize?: number;
  color?: string;
  opacity?: number;
  angle?: number;
  zIndex?: number;
}

export type WatermarkDirective = Directive<HTMLElement, string | string[] | WatermarkOptions>;

export const watermark: WatermarkDirective = {
  mounted(el, binding) {
    createWatermark(el, binding);
  },

  updated(el, binding) {
    createWatermark(el, binding);
  },

  unmounted(el) {
    cleanupWatermark(el);
  },
};

/**
 * 清理水印资源
 */
function cleanupWatermark(el: HTMLElement): void {
  const oldWatermarkRef = (el as any).__watermarkRef__;
  const oldObserver = (el as any).__watermarkObserver__;

  // 移除旧的水印容器
  if (oldWatermarkRef?.container) {
    oldWatermarkRef.container.remove();
  }

  // 断开旧的观察者
  if (oldObserver) {
    oldObserver.disconnect();
  }

  // 清理元素上的引用
  delete (el as any).__watermarkRef__;
  delete (el as any).__watermarkObserver__;
}

/**
 * 创建水印并挂载到元素
 */
function createWatermark(
  el: HTMLElement,
  binding: DirectiveBinding<string | string[] | WatermarkOptions>,
): void {
  // 先清理现有的水印
  cleanupWatermark(el);

  // 默认配置
  const defaultOptions: WatermarkOptions = {
    text: 'Watermark',
    fontSize: 28,
    color: 'rgba(0, 0, 0, 0.1)',
    opacity: 0.1,
    angle: -15,
    zIndex: 9999,
  };

  // 解析绑定配置
  let options: WatermarkOptions;
  if (typeof binding.value === 'string' || Array.isArray(binding.value)) {
    options = { ...defaultOptions, text: binding.value };
  } else {
    options = { ...defaultOptions, ...binding.value };
  }
  const { url, width, height } = createWatermarkImage(
    options.text,
    options.fontSize!,
    options.color!,
    options.angle!,
  );
  // 创建水印容器
  const watermarkContainer = document.createElement('div');
  watermarkContainer.style.position = 'absolute';
  watermarkContainer.style.top = '0';
  watermarkContainer.style.left = '0';
  watermarkContainer.style.width = '100%';
  watermarkContainer.style.height = '100%';
  watermarkContainer.style.overflow = 'hidden';
  watermarkContainer.style.pointerEvents = 'none';
  watermarkContainer.style.zIndex = `${options.zIndex}`;
  watermarkContainer.style.backgroundImage = `url(${url})`;
  watermarkContainer.style.backgroundRepeat = 'repeat';
  watermarkContainer.style.backgroundSize = `${width}px ${height}px`;
  watermarkContainer.style.opacity = `${options.opacity}`;

  // 确保目标元素为相对定位
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative';
  }

  // 挂载水印容器到目标元素
  el.appendChild(watermarkContainer);

  // 保存引用信息
  const watermarkRef = { container: watermarkContainer, options };
  (el as any).__watermarkRef__ = watermarkRef;

  // 创建并启动观察者（防止水印被移除）
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // 检查水印容器是否被移除
        const isRemoved = !Array.from(el.children).includes(watermarkContainer);
        if (isRemoved) {
          // 重新挂载水印容器
          el.appendChild(watermarkContainer);
        }
      }
    });
  });

  observer.observe(el, { childList: true });
  (el as any).__watermarkObserver__ = observer;
}
/**
 * 创建水印图片
 *
 */
function createWatermarkImage(
  text: string | string[] = 'Watermark',
  fontSize: number,
  color: string,
  angle: number,
): { url: string; width: number; height: number } {
  // 处理文本为数组格式
  const textArray = Array.isArray(text) ? text : [text];
  // 创建画布并绘制水印文本
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { url: '', width: 0, height: 0 };
  }

  const textFont = `${fontSize}px px sans-serif`;
  // 设置文本样式
  ctx.font = textFont;
  ctx.fillStyle = color!;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lineHeight = 1.4;
  // 计算每行宽度和高度
  let maxWidth = 0;
  let totalHeight = 0;

  const lineHeights = [];

  for (const line of textArray) {
    const m = ctx.measureText(line);
    const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;

    lineHeights.push(h);
    totalHeight += h * lineHeight;

    if (m.width > maxWidth) {
      maxWidth = m.width;
    }
  }

  // 计算旋转角度的弧度
  const angleRad = (angle! * Math.PI) / 180;

  // 旋转后占用的外接矩形尺寸
  const rotatedWidth =
    Math.abs(maxWidth * Math.cos(angleRad)) + Math.abs(totalHeight * Math.sin(angleRad));

  const rotatedHeight =
    Math.abs(maxWidth * Math.sin(angleRad)) + Math.abs(totalHeight * Math.cos(angleRad));

  const padding = 20;

  canvas.width = rotatedWidth + padding * 2;
  canvas.height = rotatedHeight + padding * 2;

  ctx.font = textFont;
  ctx.fillStyle = color!;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 移动到中心
  ctx.translate(canvas.width / 2, canvas.height / 2);
  // 旋转坐标系
  ctx.rotate(angleRad);
  // 多行文本绘制（竖直方向上依次绘制）
  let y = -totalHeight / 2;

  for (let i = 0; i < textArray.length; i++) {
    ctx.fillText(textArray[i]!, 0, y + lineHeights[i]! / 2);
    y += lineHeights[i]! * lineHeight;
  }
  return { url: canvas.toDataURL(), width: rotatedWidth, height: rotatedHeight };
}
