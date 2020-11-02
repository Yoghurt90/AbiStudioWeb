function fileNameToSectionName(fileName) {
    if (fileName == null || fileName === "" || typeof fileName !== "string") {
      return null;
    }
  
    // remove 1-
    fileName = fileName.replace(/\d+-/, "");
    // remove space
    fileName = fileName.trim();
    // uppercase first letter
    fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    // remove .xx (language key)
    fileName = fileName.replace(/\.[a-z]+$/i, "");
  
    return fileName;
}

module.exports = fileNameToSectionName;