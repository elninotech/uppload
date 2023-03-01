/**
 * Make an HTTP request with the Fetch API and cache results
 * @param input API endpoint
 * @param settings HTTP Fetch configuration
 */
export function cachedFetch<T>(
  input: RequestInfo,
  settings?: RequestInit
): Promise<T> {
  const storage = sessionStorage;
  return new Promise((resolve, reject) => {
    const key = `uppload_cache_${JSON.stringify(input)}`;
    const maxTTL = new Date();
    maxTTL.setDate(maxTTL.getDate() + 1);
    const cachedResult = storage.getItem(key);
    if (cachedResult) {
      const cachedResultData = JSON.parse(cachedResult);
      if (
        cachedResultData.ttl &&
        new Date(cachedResultData.ttl).getTime() > new Date().getTime()
      )
        return resolve(cachedResultData.result);
    }
    window
      .fetch(input, settings)
      .then(response => {
        if (!response.ok) throw new Error("errors.response_not_ok");
        return response.json();
      })
      .then(result => {
        storage.setItem(
          key,
          JSON.stringify({
            ttl: maxTTL,
            updatedAt: new Date(),
            result,
          })
        );
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
      .fetch(`https://wsrv.nl/?url=${encodeURIComponent(url)}`)
      .then(response => {
        if (!response.ok) throw new Error("errors.response_not_ok");
        return response.blob();
      })
      .then(blob => resolve(blob))
      .catch(error => reject(error));
  });
};
