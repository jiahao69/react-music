export const getFiles = (fileName: string, suffix: string, folder: string) =>
  new URL(`../assets/${folder}/${fileName}.${suffix}`, import.meta.url).href

export const getImg = (fileName: string) => getFiles(fileName, "png", `images`)
