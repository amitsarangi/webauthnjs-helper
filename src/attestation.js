const { base64ToBuffer, bufferToBase64, ab2str } = require("./utils");

const verifyAttestationOptions = options => {
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
 * Encodes the CredentialCreationOptions/AttestationOptions from array buffer to base64 encoded string.
 * Typically this is used to encode the CredentialCreationOptions/AttestationOptions, before sending from server.
 * @param  {Object} options The generated attestation options
 * @return {Object} The JSON encoded options which can be sent to client
 */
const encodeAttestationOptions = options => {
  const verificationResult = verifyAttestationOptions(options);

  if (verificationResult.error === true) {
    throw verificationResult;
  }
  const encodedOpts = { ...options };
  encodedOpts.challenge = bufferToBase64(options.challenge);
  encodedOpts.user = {
    ...options.user,
    id: bufferToBase64(ab2str(options.user.id))
  };
  return encodedOpts;
};

/**
 * Decodes the CredentialCreationOptions/AttestationOptions from base64 encoded string to array buffer.
 * Typically this is used to decode the CredentialCreationOptions/AttestationOptions we get as JSON from server.
 * @param  {Object} options The attestation options received from backend
 * @return {Object} The parsed options which can be passed to navigator.credentials.create
 */
const decodeAttestationOptions = options => {
  const verificationResult = verifyAttestationOptions(options);

  if (verificationResult.error === true) {
    throw verificationResult;
  }
  const decodedOpts = { ...options };
  decodedOpts.challenge = base64ToBuffer(options.challenge);
  decodedOpts.user = {
    ...options.user,
    id: base64ToBuffer(options.user.id)
  };

  if (Array.isArray(options.excludeCredentials)) {
    decodedOpts.excludeCredentials = options.excludeCredentials.map(cred => ({
      ...cred,
      id: base64ToBuffer(cred.id)
    }));
  }

  return decodedOpts;
};

module.exports = {
  encodeAttestationOptions,
  decodeAttestationOptions
};
