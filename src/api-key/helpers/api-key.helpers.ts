const apiKeyMask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

export const generateApiKey = () => {
  return apiKeyMask.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
