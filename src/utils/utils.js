import * as emojis from '../assets/emoji/index';

export const getEmoji = filename => {
  const file = emojis[filename.replace('.png', '')];

  if (!file) {
    console.log('gxs --> % getEmoji % filename:\n', filename);
    return null;
  }
  
  return file;
};
