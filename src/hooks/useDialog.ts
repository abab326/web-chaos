import { ref, type ShallowRef } from 'vue';
import type { FormInstance } from 'element-plus';

interface DialogOptions {
  formRef?: Readonly<ShallowRef<FormInstance>>;
}
/**
 * 弹窗相关
 * @description 弹窗相关的方法
 *
 */
export const useDialog = <T = boolean>(options: DialogOptions) => {
  const isDialogVisible = ref(false);
  let mResolve: (value: T) => void;
  let mReject: (reason?: any) => void;

  const { formRef } = options;

  /**
   * 打开弹窗, 返回 promise, 确认弹窗后 resolve, 取消弹窗后 reject
   */
  const openDialog = () => {
    return new Promise<T>((resolve, reject) => {
      isDialogVisible.value = false;
      mResolve = resolve;
      mReject = reject;
    });
  };

  const clearFrom = () => {
    formRef?.value?.clearValidate();
    formRef?.value?.resetFields();
  };
  /**
   * 关闭弹窗
   */
  const closeDialog = () => {
    isDialogVisible.value = false;
    clearFrom();
    mReject();
  };
  /**
   * 确认弹窗
   */
  const confirmDialog = (value: T) => {
    clearFrom();
    mResolve(value);
  };
  return {
    isDialogVisible,
    openDialog,
    closeDialog,
    confirmDialog,
  };
};
