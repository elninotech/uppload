export default {
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
  },

  uploading: "Uploading...",
  fetching: "Getting your image from $1$...",
  imagesPoweredBy: "Images powered by $1$",
  poweredBy: "Powered by $1$",
  needHelp: "Need help?",

  units: {
    px: "px",
    "%": "%",
    deg: "°"
  },

  errors: {
    response_not_ok: "We got an error in fetching this file",
    unable_to_search: "We got an error in searching",
    invalid_service_url: "This is not a $1$ URL",
    invalid_url: "This URL is seems to be invalid",
    upload_aborted: "Upload cancelled"
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
    giphy: {
      title: "GIPHY",
      button: "Search on GIPHY",
      label: "Find a GIF",
      placeholder: "Search for something"
    },
    unsplash: {
      title: "Unsplash",
      button: "Search on Unsplash",
      label: "Find an image",
      placeholder: "Search for something"
    },
    pixabay: {
      title: "Pixabay",
      button: "Search on Pixabay",
      label: "Find an image",
      placeholder: "Search for something"
    },
    pexels: {
      title: "Pexels",
      button: "Search on Pexels",
      label: "Find an image",
      placeholder: "Search for something"
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
      title: "Flip"
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
  }
};
