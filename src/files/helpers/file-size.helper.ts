export const FILE_SIZE = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  // Límites comúnmente usados
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_PDF_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_DOCUMENT_SIZE: 20 * 1024 * 1024, // 20MB
};

export const isValidFileSize = (fileSize: number, maxSize: number): boolean =>
  fileSize <= maxSize;

export const getMaxSizeByExtension = (fileExtension: string): number => {
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
  const documentExtensions = [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
  ];

  if (imageExtensions.includes(fileExtension)) return FILE_SIZE.MAX_IMAGE_SIZE;
  if (fileExtension === 'pdf') return FILE_SIZE.MAX_PDF_SIZE;
  if (documentExtensions.includes(fileExtension))
    return FILE_SIZE.MAX_DOCUMENT_SIZE;

  return FILE_SIZE.MAX_DOCUMENT_SIZE;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < FILE_SIZE.KB) return `${bytes} B`;
  if (bytes < FILE_SIZE.MB) return `${(bytes / FILE_SIZE.KB).toFixed(2)} KB`;
  if (bytes < FILE_SIZE.GB) return `${(bytes / FILE_SIZE.MB).toFixed(2)} MB`;
  return `${(bytes / FILE_SIZE.GB).toFixed(2)} GB`;
};
