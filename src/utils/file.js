const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`File ${filePath} has been deleted`);
  });
};

exports.deleteFile = deleteFile;
