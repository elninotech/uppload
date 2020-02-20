import { IUpploadFile } from "./interfaces";

/**
 * Convert a blob to a native File
 * @param blob - Blob to convert to file
 * @param fileName - Name of the file
 * @param lastModified - Date modified
 */
const safeBlobToFile = (blob: Blob, fileName?: string, lastModified?: Date) => {
  try {
    return new File([blob], fileName || "file_name", {
      lastModified: (lastModified || new Date()).getTime(),
      type: blob.type
    });
  } catch (error) {
    return blob;
  }
};

export const blobToUpploadFile = (blob: Blob) => {
  const result: IUpploadFile = {
    blob
  };
  return result;
};

export const safeUpploadFileToFile = (file: IUpploadFile) => {
  const blob = file.blob;
  return safeBlobToFile(blob, file.name, file.lastModified);
};
