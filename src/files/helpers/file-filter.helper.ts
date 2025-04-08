import { ValidationCallback } from '../../common/interfaces/';
import {
  ALLOWED_FILE_TYPES,
  extractFileExtension,
  isValidFileExtension,
} from './file-extension.helper';
import {
  isValidFileSize,
  getMaxSizeByExtension,
  formatFileSize,
} from './file-size.helper';

export const FileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: ValidationCallback,
  allowedTypes: string[] = ALLOWED_FILE_TYPES.ALL,
): void => {
  if (!file) return callback(new Error('File is not provided'), false);

  try {
    const fileExtension = extractFileExtension(file);
    if (!isValidFileExtension(fileExtension, allowedTypes)) {
      return callback(
        new Error(
          `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
        ),
        false,
      );
    }

    const maxSize = getMaxSizeByExtension(fileExtension);
    if (!isValidFileSize(file.size, maxSize)) {
      return callback(
        new Error(
          `File size exceeds maximum allowed (${formatFileSize(file.size)} > ${formatFileSize(maxSize)})`,
        ),
        false,
      );
    }

    callback(null, true);
  } catch (error) {
    callback(error as Error, false);
  }
};

export const createFileFilter =
  (allowedTypes: string[] = ALLOWED_FILE_TYPES.IMAGES) =>
  (
    req: Express.Request,
    file: Express.Multer.File,
    callback: ValidationCallback,
  ) =>
    FileFilter(req, file, callback, allowedTypes);

export const FileFilters = {
  IMAGES: createFileFilter(ALLOWED_FILE_TYPES.IMAGES),
  DOCUMENTS: createFileFilter(ALLOWED_FILE_TYPES.DOCUMENTS),
  PDFS: createFileFilter(['pdf']),
  ALL: createFileFilter(ALLOWED_FILE_TYPES.ALL),
};
