/**
 * Make an HTTP request with the Fetch API and cache results
 */
export function cachedFetch<T>(
  input: RequestInfo,
  type: "arrayBuffer" | "blob" | "formData" | "json" | "text" = "json"
): Promise<T> {
  return new Promise((resolve, reject) => {
    const key = `uppload-cache-${JSON.stringify(input)}`;
    const cachedResult = localStorage.getItem(key);
    if (cachedResult) return resolve(JSON.parse(cachedResult));
    window
      .fetch(input)
      .then(response => {
        if (!response.ok) throw new Error("response_not_ok");
        switch (type) {
          case "arrayBuffer":
            return response.arrayBuffer();
          case "blob":
            return response.blob();
          case "formData":
            return response.formData();
          case "text":
            return response.text();
          default:
            return response.json();
        }
      })
      .then(result => {
        localStorage.setItem(key, JSON.stringify(result));
        resolve(result);
      })
      .catch(error => reject(error));
  });
}
