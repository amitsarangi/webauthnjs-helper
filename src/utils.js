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

const strToBase64 = str => {
  return Buffer.from(`${str}`).toString("base64");
};

const base64ToStr = b64str => {
  return new Buffer(b64str, "base64").toString();
};

const isString = str => typeof str === "string";
const isNumber = str => typeof str === "number";
const isArrayBuffer = obj => obj instanceof ArrayBuffer;

module.exports = {
  bufferToBase64,
  base64ToBuffer,
  strToBase64,
  base64ToStr,
  isString,
  isNumber,
  isArrayBuffer
};
