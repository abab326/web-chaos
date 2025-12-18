import { defineComponent, type PropType } from 'vue';

import { renderFormItem } from './render';
import type { FormItem } from './type';

// 定义 handleChange 函数的类型
type HandleChangeFunction = (item: FormItem, value: any) => void;

export default defineComponent({
  name: 'BaseFormItem',
  props: {
    item: {
      type: Object as () => FormItem,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    handleChange: {
      type: Function as PropType<HandleChangeFunction>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { item, formData, handleChange } = props;
    return () => {
      // 渲染表单项
      return renderFormItem(item, formData, handleChange, slots);
    };
  },
});
