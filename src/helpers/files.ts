/**
 * Convert a blob to a native File
 * @param blob - Blob to convert to file
 * @param fileName - Name of the file
 * @param lastModified - Date modified
 */
export const safeBlobToFile = (
  blob: Blob,
  fileName?: string,
  lastModified?: Date
) => {
  try {
    return new File([blob], fileName || "file_name", {
      lastModified: (lastModified || new Date()).getTime(),
      type: blob.type
    });
  } catch (error) {
    return blob;
  }
};
