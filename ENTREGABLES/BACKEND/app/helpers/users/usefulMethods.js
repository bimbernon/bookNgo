"use strict";

const path = require("path");
const sharp = require("sharp");
const { ensureDir } = require("fs-extra");
const fs = require("fs");

async function uploadImage({ imageData, destination, width, height, codFoto }) {
  const uploadDirectory = path.join("", destination);
  console.log("ruta directorio " + uploadDirectory);
  await ensureDir(uploadDirectory);

  const image = sharp(imageData);

  image.resize(width, height);
  console.log(codFoto);
  const imageName = codFoto + ".jpg";

  await image.toFile(path.join(uploadDirectory, imageName));

  return imageName;
}

module.exports = { uploadImage };
