const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const fs = require('fs');

const blocksDir = path.resolve(__dirname, '../../block-gutenberg');
const blocks = fs.readdirSync(blocksDir).filter(dir => {
  return fs.statSync(path.join(blocksDir, dir)).isDirectory() && fs.existsSync(path.join(blocksDir, dir, 'block.json'));
});

// Create a separate configuration object for each block
module.exports = blocks.map(block => {
  const blockDir = path.join(blocksDir, block);
  const entry = {
    index: path.join(blockDir, 'index.js')
  };

  // Include view.js as a separate entry if it exists (frontend interactivity)
  const viewFile = path.join(blockDir, 'view.js');
  if (fs.existsSync(viewFile)) {
    entry.view = viewFile;
  }

  return {
    ...defaultConfig,
    entry,
    output: {
      ...defaultConfig.output,
      path: path.join(blockDir, 'build'),
      filename: '[name].js'
    }
  };
});
