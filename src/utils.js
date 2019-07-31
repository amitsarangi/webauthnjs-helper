const base64url = require("base64url");

/**
 * Encodes an ArrayBuffer object to base64url string. So that it can be sent across network through JSON.
 * @param  {ArrayBuffer | Uint8Array} buffer The array buffer to be decoded
 * @return {String} The base64 encoded string
 */
const bufferToBase64 = base64url.encode;

/**
 * Decodes a base64 url string to an ArrayBuffer object.
 * @param  {String} b64encodedString the base64 encoded string
 * @return {ArrayBuffer} The decoded ArrayBuffer object
 */
const base64ToBuffer = b64encodedString =>
  new Uint8Array(base64url.toBuffer(b64encodedString)).buffer;

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

/**
 * Encodes credentials array. changes credential.id from ArrayBuffer to base64url string.
 * @param  {Array} credentials
 * @return {Array}
 */
const encodeCredentialsArray = (credentials = []) =>
  credentials.map(cred => ({
    ...cred,
    id: typeof cred.id === "string" ? cred.id : bufferToBase64(cred.id)
  }));

/**
 * Decodes credentials array. changes credential.id from base64url string to ArrayBuffer.
 * @param  {Array} credentials
 * @return {Array}
 */
const decodeCredentialsArray = (credentials = []) =>
  credentials.map(cred => ({
    ...cred,
    id: typeof cred.id === "string" ? base64ToBuffer(cred.id) : cred.id
  }));

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
  isArrayBuffer,
  encodeCredentialsArray,
  decodeCredentialsArray
};
