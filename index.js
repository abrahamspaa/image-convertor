const { join } = require('path'),
  { readdir } = require('fs'),
  sharp = require('sharp');

const getImagePath = join(__dirname, 'input'),
  outImagePath = join(__dirname, 'output');

const resize = async (imageSource, imageDestination) => {
	return await new Promise ((resolve, reject) => sharp(imageSource)
			.resize(300)
      .toFile(imageDestination)
			.then(() => resolve('converted..!'))
			.catch(error => reject (error)))
}

readdir(getImagePath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  files.forEach(async file => {
    try {
      let image = await resize(`${getImagePath}/${file}`, `${outImagePath}/${file}`);
      console.log(`${outImagePath}/${file}`, image);
    } catch (error) {
      console.log(error);
    }

  });
});
