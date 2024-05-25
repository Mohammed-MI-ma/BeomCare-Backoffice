import axios from "axios";

export const loadFonts = async (fonts) => {
  await Promise.all(
    Object.keys(fonts).map(async (key) => {
      const font = new FontFace(key, `url(${fonts[key]})`);
      await font.load();
      document.fonts.add(font);
    })
  );
};
export const loadImages = async (images) => {
  await Promise.all(
    Object.values(images).map(async (image) => {
      if (typeof image === "string") {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image;
        });
      } else if (typeof image === "object" && image.uri) {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image.uri;
        });
      }
    })
  );
};
