const { base64ToBuffer } = require("./utils");

const verifyAssertionOptions = options => {
  const verificationResult = {
    error: false
  };

  if (!options.rp || !options.rp.id) {
    verificationResult.error = true;
    verificationResult.message = `CredentialCreationOptions/AssertionOptions missing options.rp or options.rp.id`;
  }

  return verificationResult;
};

/**
 * Decodes the CredentialCreationOptions/AssertionOptions from base64 encoded string to array buffer.
 * Typically this is used to decode the CredentialCreationOptions/AssertionOptions we get as JSON from server.
 * @param  {Object} options the assertion data received from backend
 * @return {Object} The parsed options which can be passed to navigator.credentials.create
 */
const decodeAssertionOptions = options => {
  const verificationResult = verifyAssertionOptions(options);

  if (verificationResult.error === true) {
    throw verificationResult;
  }
  const decodedOpts = { ...options };
  decodedOpts.challenge = base64ToBuffer(options.challenge);
  decodedOpts.user = { ...options.user, id: base64ToBuffer(options.user.id) };
  return decodedOpts;
};

const encodeAssertionOptions = options => {
  const verificationResult = verifyAssertionOptions(options);

  if (verificationResult.error === true) {
    throw verificationResult;
  }
  const encodedOpts = { ...options };
  encodedOpts.challenge = base64ToBuffer(options.challenge);
  encodedOpts.user = { ...options.user, id: base64ToBuffer(options.user.id) };
  return encodedOpts;
};

module.exports = {
  encodeAssertionOptions,
  decodeAssertionOptions
};
