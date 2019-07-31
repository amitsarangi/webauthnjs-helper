const { base64ToBuffer, bufferToBase64, str2ab } = require("./utils");

const verifyAttestationOptions = options => {
  // TODO: Verification
  const verificationResult = {
    error: false
  };

  if (!options.rp) {
    verificationResult.error = true;
    verificationResult.message = `CredentialCreationOptions/AttestationOptions missing options.rp or options.rp.id`;
  }

  return verificationResult;
};

const verifyAttestationResponse = attestationResponse => {
  if (attestationResponse) {
    // TODO: Verification
    return true;
  }
  return false;
};

/**
 * Encodes the CredentialCreationOptions/AttestationOptions from ArrayBuffer to base64 encoded string.
 * Typically this is used to encode the CredentialCreationOptions/AttestationOptions, before sending to client as JSON.
 * @param  {Object} options The generated attestation options
 * @return {Object} The JSON encoded options which can be sent to client
 */
const encodeAttestationOptions = options => {
  const verificationResult = verifyAttestationOptions(options);

  if (verificationResult.error === true) {
    throw verificationResult;
  }
  const encodedOpts = { ...options };
  encodedOpts.challenge =
    options.challenge instanceof String
      ? options.challenge
      : bufferToBase64(options.challenge);
  encodedOpts.user = {
    ...options.user,
    id: bufferToBase64(str2ab(options.user.id))
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

/**
 * Encodes the PublicKeyCredential values from ArrayBuffer to base64 encoded string JSON Object.
 * Typically this is used to encode the response from navigator.credentials.create to send to server.
 * @param  {PublicKeyCredential} attestationResponse The response from navigator.credentials.create
 * @return {Object} The JSON encoded options which can be passed to server
 */
const encodeAttestationResponse = attestationResponse => {
  if (!verifyAttestationResponse(encodeAttestationResponse)) {
    throw new Error(
      `webauthnjs-helper: attestationResponse must be instance of PublicKeyCredential`
    );
  }

  return {
    id: attestationResponse.id,
    type: attestationResponse.type,
    rawId: bufferToBase64(attestationResponse.rawId),
    response: {
      attestationObject: bufferToBase64(
        attestationResponse.response.attestationObject
      ),
      clientDataJSON: bufferToBase64(
        attestationResponse.response.clientDataJSON
      )
    }
  };
};

/**
 * Decodes the PublicKeyCredential Object, whose values are encoded to base64 string, to ArrayBuffer values.
 * Typically this is used to encode the response from navigator.credentials.create to send to server.
 * @param  {Object} attestationResponse The response from navigator.credentials.create which is sent from the client as JSON
 * @return {Object} The JSON encoded options which can be passed to server
 */

const decodeAttestationResponse = attestationResponse => {
  if (!verifyAttestationResponse(encodeAttestationResponse)) {
    throw new Error(
      `webauthnjs-helper: attestationResponse must be instance of PublicKeyCredential`
    );
  }

  return {
    ...attestationResponse,
    rawId: base64ToBuffer(attestationResponse.rawId),
    response: {
      attestationObject: base64ToBuffer(
        attestationResponse.response.attestationObject
      ),
      clientDataJSON: base64ToBuffer(
        attestationResponse.response.clientDataJSON
      )
    }
  };
};

module.exports = {
  encodeAttestationOptions,
  decodeAttestationOptions,
  encodeAttestationResponse,
  decodeAttestationResponse
};
