/**
 * Make an HTTP request with the Fetch API and cache results
 * @param input API endpoint
 * @param settings HTTP Fetch configuration
 */
export function cachedFetch<T>(
  input: RequestInfo,
  settings?: RequestInit
): Promise<T> {
  return new Promise((resolve, reject) => {
    const key = `uppload-cache-${JSON.stringify(input)}`;
    const cachedResult = localStorage.getItem(key);
    if (cachedResult) return resolve(JSON.parse(cachedResult));
    window
      .fetch(input, settings)
      .then(response => {
        if (!response.ok) throw new Error("response_not_ok");
        return response.json();
      })
      .then(result => {
        localStorage.setItem(key, JSON.stringify(result));
        resolve(result);
      })
      .catch(error => reject(error));
  });
}

/**
 * Get a file Blob from an image URL
 * @param url - URL of an image
 */
export const imageUrlToBlob = (url: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    window
      .fetch(`https://images.weserv.nl/?url=${encodeURIComponent(url)}`)
      .then(response => {
        if (!response.ok) throw new Error("response_not_ok");
        return response.blob();
      })
      .then(blob => resolve(blob))
      .catch(error => reject(error));
  });
};
