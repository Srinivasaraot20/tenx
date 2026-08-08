const sharp = require('sharp');
const fs = require('fs');

async function generateFavicons() {
  try {
    // Convert logo.webp to a 48x48 icon.png for Google Search
    await sharp('public/logo.webp')
      .resize(48, 48)
      .png()
      .toFile('src/app/icon.png');
      
    console.log('Successfully created src/app/icon.png');

    // Also create an apple-icon.png
    await sharp('public/logo.webp')
      .resize(180, 180)
      .png()
      .toFile('src/app/apple-icon.png');
      
    console.log('Successfully created src/app/apple-icon.png');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
