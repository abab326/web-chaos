import type { AxiosResponse } from 'axios';

export const saveFileBlob = (response: AxiosResponse<Blob>, defaultFileName?: string) => {
  // 创建下载链接并触发下载
  // 从响应头获取文件名
  const contentDisposition = response.headers?.['content-disposition'];
  let filename = defaultFileName || 'download';
  if (contentDisposition) {
    const matches = /filename=([^;]+)/gi.exec(contentDisposition);
    if (matches && matches.length > 1) {
      filename = decodeURIComponent(matches[1]!.replace(/"/g, ''));
    }
  }

  // 创建Blob对象
  const blob = new Blob([response.data]);

  // 创建下载链接并触发下载
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
