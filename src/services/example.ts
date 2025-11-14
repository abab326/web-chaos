import { apiService } from './index'

// 下载文件示例
export const downloadFileExample = async () => {
  try {
    // 下载用户头像
    const blob = await apiService.download('/api/files/avatar', { userId: 1 })
    console.log('文件下载成功，Blob对象:', blob)
    // Blob对象可以用于其他用途，如显示图片等
  } catch (error) {
    console.error('文件下载失败:', error)
  }
}

// 上传文件示例
export const uploadFileExample = async (file: File) => {
  try {
    // 创建FormData对象
    const formData = new FormData()
    formData.append('file', file)
    formData.append('description', '用户头像')

    // 上传文件
    const result = await apiService.upload('/api/files/upload', formData)
    console.log('文件上传成功:', result)
    return result
  } catch (error) {
    console.error('文件上传失败:', error)
  }
}

// 批量上传文件示例
export const uploadMultipleFilesExample = async (files: FileList) => {
  try {
    // 创建FormData对象
    const formData = new FormData()

    // 添加多个文件
    Array.from(files).forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    formData.append('batchId', 'batch-123')

    // 上传文件
    const result = await apiService.upload('/api/files/batch-upload', formData)
    console.log('文件批量上传成功:', result)
    return result
  } catch (error) {
    console.error('文件批量上传失败:', error)
  }
}
