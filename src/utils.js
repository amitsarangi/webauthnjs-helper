const base64ToArrayBuffer = require("base64-arraybuffer");

/**
 * Encodes an ArrayBuffer object to base64 string. So that it can be sent across network through JSON.
 * @param  {ArrayBuffer | Uint8Array} buffer The array buffer to be decoded
 * @return {String} The base64 encoded string
 */
const bufferToBase64 = base64ToArrayBuffer.encode;

/**
 * Decodes a base64 string to an ArrayBuffer object.
 * @param  {String} b64encodedString the base64 encoded string
 * @return {ArrayBuffer} The decoded ArrayBuffer object
 */
const base64ToBuffer = base64ToArrayBuffer.decode;

/**
 * ArrayBuffer to string.
 * @param  {ArrayBuffer} buf the ArrayBuffer
 * @return {String}
 */

const ab2str = buf => {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

/**
 * String to ArrayBuffer
 * @param  {String} str
 * @return {ArrayBuffer}
 */
const str2ab = str => {
  let stringToEncode = str;
  if (typeof str !== "string") {
    stringToEncode = String(stringToEncode);
  }
  const buf = new ArrayBuffer(stringToEncode.length); // 1 bytes for each char
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = stringToEncode.length; i < strLen; i += 1) {
    bufView[i] = stringToEncode.charCodeAt(i);
  }
  return bufView.buffer;
};

const isString = str => typeof str === "string";
const isNumber = str => typeof str === "number";
const isArrayBuffer = obj => obj instanceof ArrayBuffer;

module.exports = {
  bufferToBase64,
  base64ToBuffer,
  ab2str,
  str2ab,
  isString,
  isNumber,
  isArrayBuffer
};
