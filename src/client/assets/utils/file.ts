export const validFileTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/webp']

export const maxFileSize = 1024 * 1024 * 3 // 3Mb

export const clipboardToFile = (data: DataTransferItem[]) =>
  data.filter(d => d.kind === 'file').map(data => data.getAsFile()) as File[]

export const checkFileType = (file: File) => validFileTypes.includes(file.type)

export const checkFileSize = (file: File) => file.size <= maxFileSize