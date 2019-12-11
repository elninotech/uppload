export default {
  uploading: "Uploading...",
  uploaded: "Uploaded",
  fetching: "Getting your image from $1$...",
  poweredBy: "Powered by $1$",
  needHelp: "Need help?",
  loadingHelp: "Loading help...",

  units: {
    px: "px",
    "%": "%",
    deg: "°"
  },

  errors: {
    response_not_ok: "We got an error in fetching this file",
    unable_to_search: "We got an error in searching",
    invalid_service_url: "This is not $A$ $1$ URL",
    invalid_url: "This URL seems to be invalid",
    upload_aborted: "Your upload was cancelled",
    upload_error: "We got an error in uploading this file",
    file_type_not_allowed: "This file type is not allowed",
    file_too_large: "Your file should be smaller than $1$"
  },

  services: {
    default: {
      heading: "Select an image"
    },
    local: {
      title: "Choose file",
      button: "Select a file",
      or: "or",
      drop: "Drop files here"
    },
    camera: {
      title: "Camera",
      button: "Click photo",
      switch: "Switch camera",
      waiting: "Waiting for permission...",
      unableToRead:
        "We're not able to read your camera's video. This may be because you didn't grant the required permission, or because your device doesn't support camera access."
    },
    microlink: {
      button: "Import from $1$",
      label: "$1$ $2$ URL",
      placeholder: "Enter $A$ $1$ $2$ URL",
      type: "post"
    },
    url: {
      title: "Direct URL",
      label: "Image URL",
      placeholder: "Enter an image URL"
    },
    instagram: {
      title: "Instagram"
    },
    facebook: {
      title: "Facebook"
    },
    flickr: {
      title: "Flickr",
      type: "photo"
    },
    ninegag: {
      title: "9GAG",
      type: "photo"
    },
    deviantart: {
      title: "DeviantArt"
    },
    artstation: {
      title: "ArtStation"
    },
    twitter: {
      title: "Twitter",
      type: "image tweet"
    },
    pinterest: {
      title: "Pinterest",
      type: "pin"
    },
    flipboard: {
      title: "Flipboard",
      type: "article"
    },
    fotki: {
      title: "Fotki",
      type: "photo"
    },
    linkedin: {
      title: "LinkedIn"
    },
    reddit: {
      title: "Reddit"
    },
    tumblr: {
      title: "Tumblr"
    },
    weheartit: {
      title: "We Heart It"
    },
    screenshot: {
      title: "Screenshot",
      button: "Take screenshot",
      label: "Webpage URL",
      placeholder: "Enter a webpage URL",
      loading: "Taking a screenshot..."
    },
    search: {
      button: "Search on $1$",
      label: "Find an image",
      placeholder: "Search for something",
      imagesPoweredBy: "Images powered by $1$"
    },
    giphy: {
      title: "GIPHY"
    },
    unsplash: {
      title: "Unsplash"
    },
    pixabay: {
      title: "Pixabay"
    },
    pexels: {
      title: "Pexels"
    }
  },

  effects: {
    preview: {
      title: "Preview"
    },
    filters: {
      title: "Filters"
    },
    crop: {
      title: "Crop",
      aspectRatios: {
        free: "Free",
        square: "Square"
      }
    },
    rotate: {
      title: "Rotate"
    },
    flip: {
      title: "Flip",
      buttons: {
        horizontal: "Horizontal",
        vertical: "Vertical"
      }
    },
    sharpen: {
      title: "Sharpen"
    },
    blur: {
      title: "Blur"
    },
    brightness: {
      title: "Brightness"
    },
    contrast: {
      title: "Contrast"
    },
    grayscale: {
      title: "Grayscale"
    },
    "hue-rotate": {
      title: "Hue rotate"
    },
    invert: {
      title: "Invert"
    },
    saturate: {
      title: "Saturate"
    },
    sepia: {
      title: "Sepia"
    }
  },

  /**
   * Helpers can transform a string before returning it
   * You can define a language-specific helper here
   */
  helper: (text: string) => {
    // Replace all instances of $A$ with "a" or "an"
    const AAN = "$A$";
    while (text.includes(AAN)) {
      const index = text.indexOf(AAN);
      if (text.length > index + 3) {
        if (["a", "e", "i", "o", "u"].includes(text[index + 4].toLowerCase())) {
          text = text.replace(AAN, "an");
        } else {
          text = text.replace(AAN, "a");
        }
      }
    }
    return text;
  }
};
