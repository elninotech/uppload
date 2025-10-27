import { xhrUploader, fetchUploader, Uppload } from "../../src";
import { fetch, xhr } from "../mocks";

describe("xhr uploader", () => {
  beforeEach(() => xhr.setup());
  afterEach(() => xhr.teardown());

  it("returns a function", () =>
    expect(
      typeof xhrUploader({
        endpoint: "https://example.com",
      })
    ).toBe("function"));

  it("sends xmlhttprequest", () => {
    xhr.post("https://example.com", (_req, res) => {
      return res.body(
        JSON.stringify({
          url: "https://example.com/file.jpg",
        })
      );
    });

    const uppload = new Uppload({
      uploader: xhrUploader({
        endpoint: "https://example.com",
      }),
    });
    uppload.on("upload", (url: string) => {
      console.log("ANAND GOT", url);
      expect(url).toBe("https://example.com/file.jpg");
    });
    uppload.upload(new Blob());
  });

  it("uses xhr response key", () => {
    xhr.post("https://example.com", (_req, res) =>
      res.body(
        JSON.stringify({
          newKey: "https://example.com/file.jpg",
        })
      )
    );
    const uppload = new Uppload({
      uploader: xhrUploader({
        endpoint: "https://example.com",
        fileKeyName: "newKey",
      }),
    });
    uppload.on("upload", (url: string) => {
      expect(url).toBe("https://example.com/file.jpg");
    });
    uppload.upload(new Blob());
  });

  it("uses xhr response function", () => {
    xhr.post("https://example.com", (_req, res) =>
      res.body(
        JSON.stringify({
          newKey: "https://example.com/file.jpg",
        })
      )
    );
    const uppload = new Uppload({
      uploader: xhrUploader({
        endpoint: "https://example.com",
        responseFunction: response => JSON.parse(response).newKey,
      }),
    });
    uppload.on("upload", (url: string) => {
      expect(url).toBe("https://example.com/file.jpg");
    });
    uppload.upload(new Blob());
  });

  it("uses xhr settings function", () => {
    xhr.post("https://example.com", (_req, res) =>
      res.body(
        JSON.stringify({
          newKey: "https://example.com/file.jpg",
        })
      )
    );
    const uppload = new Uppload({
      uploader: xhrUploader({
        endpoint: "https://example.com",
        settingsFunction: request => request,
      }),
    });
    uppload.on("upload", (url: string) => {
      expect(url).toBe("https://example.com/file.jpg");
    });
    uppload.upload(new Blob());
  });
});

describe("fetch uploader", () => {
  it("returns a function", () =>
    expect(
      typeof fetchUploader({
        endpoint: "https://example.com",
      })
    ).toBe("function"));

  it("sends fetch request", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        url: "https://example.com/file.jpg",
      })
    );
    const uppload = new Uppload({
      uploader: fetchUploader({
        endpoint: "https://example.com",
      }),
    });
    uppload.on("upload", (url: string) => {
      expect(url).toBe("https://example.com/file.jpg");
    });
    uppload.upload(new Blob());
  });

  it("uses fetch response key", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        newKey: "https://example.com/file.jpg",
      })
    );
    const uppload = new Uppload({
      uploader: fetchUploader({
        endpoint: "https://example.com",
        fileKeyName: "newKey",
      }),
    });
    uppload.on("upload", (url: string) => {
      expect(url).toBe("https://example.com/file.jpg");
    });
    uppload.upload(new Blob());
  });

  it("uses fetch response function", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        newKey: "https://example.com/file.jpg",
      })
    );
    const uppload = new Uppload({
      uploader: fetchUploader({
        endpoint: "https://example.com",
        responseFunction: response => JSON.parse(response).newKey,
      }),
    });
    uppload.on("upload", (url: string) => {
      expect(url).toBe("https://example.com/file.jpg");
    });
    uppload.upload(new Blob());
  });

  it("uses fetch settings function", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        newKey: "https://example.com/file.jpg",
      })
    );
    const uppload = new Uppload({
      uploader: fetchUploader({
        endpoint: "https://example.com",
        settingsFunction: file => ({
          method: "PUT",
          body: file,
        }),
      }),
    });
    uppload.on("upload", (url: string) => {
      expect(url).toBe("https://example.com/file.jpg");
    });
    uppload.upload(new Blob());
  });
});
