const {
  base64ToBuffer,
  bufferToBase64,
  encodeCredentialsArray,
  decodeCredentialsArray
} = require("./utils");

const verifyAssertionOptions = options => {
  // TODO: Verification
  const verificationResult = {
    error: false
  };

  if (!options.challenge) {
    verificationResult.error = true;
    verificationResult.message = `AssertionOptions missing options.challenge`;
  }

  return verificationResult;
};

const verifyAssertionResponse = assertionResponse => {
  // TODO: Verification
  const verificationResult = {
    error: false
  };

  if (!assertionResponse) {
    // TODO: Verification
    verificationResult.error = true;
    verificationResult.message = `Parameter can not be undefined`;
  }
  return verificationResult;
};

/**
 * Encodes the CredentialRequestOptions/AssertionOptions values from ArrayBuffer to base64 encoded string.
 * Typically this is used to encode the CredentialRequestOptions/AssertionOptions, before sending to client.
 * @param  {Object} options The generated attestation options
 * @return {Object} The JSON encoded options which can be sent to client
 */
const encodeAssertionOptions = assertionOptions => {
  const verificationResult = verifyAssertionOptions(assertionOptions);

  if (verificationResult.error === true) {
    throw verificationResult;
  }
  const encodedOpts = { ...assertionOptions };

  encodedOpts.challenge = bufferToBase64(encodedOpts.challenge);

  encodedOpts.allowCredentials = encodeCredentialsArray(
    encodedOpts.allowCredentials
  );

  return encodedOpts;
};

/**
 * Decodes the CredentialRequestOptions/AssertionOptions values from base64 encoded string to ArrayBuffer.
 * Typically this is used to decode the CredentialRequestOptions/AssertionOptions that we got from server before passing it to navigator.credentials.get.
 * @param  {Object} options The JSON encoded options attestation options
 * @return {Object} The parsed options which can be passed to navigator.credentials.get
 */
const decodeAssertionOptions = assertionOptions => {
  const verificationResult = verifyAssertionOptions(assertionOptions);
  if (verificationResult.error === true) {
    throw verificationResult;
  }

  const decodedOpts = {
    ...assertionOptions,
    challenge: base64ToBuffer(assertionOptions.challenge),
    allowCredentials: decodeCredentialsArray(assertionOptions.allowCredentials)
  };
  return decodedOpts;
};

/**
 * Encodes the PublicKeyCredential values from ArrayBuffer to base64 encoded string JSON Object.
 * Typically this is used to encode the response from navigator.credentials.get to send to server.
 * @param  {PublicKeyCredential} assertionResponse The response from navigator.credentials.get
 * @return {Object} The JSON encoded options which can be passed to server
 */
const encodeAssertionResponse = assertionResponse => {
  const verificationResult = verifyAssertionResponse(assertionResponse);
  if (verificationResult.error === true) {
    throw verificationResult;
  }

  return {
    id: assertionResponse.id,
    type: assertionResponse.type,
    rawId: bufferToBase64(assertionResponse.rawId),
    response: {
      authenticatorData: bufferToBase64(
        assertionResponse.response.authenticatorData
      ),
      clientDataJSON: bufferToBase64(assertionResponse.response.clientDataJSON),
      signature: bufferToBase64(assertionResponse.response.signature),
      userHandle: assertionResponse.response.userHandle
        ? bufferToBase64(assertionResponse.response.userHandle)
        : ""
    }
  };
};

/**
 * Decodes the PublicKeyCredential Object, whose values are encoded to base64 string, to ArrayBuffer values.
 * Typically this is used to encode the response from navigator.credentials.get to send to server.
 * @param  {Object} assertionResponse The response from navigator.credentials.create which is sent from the client as JSON
 * @return {Object} The JSON encoded options which can be passed to server
 */
const decodeAssertionResponse = assertionResponse => {
  const verificationResult = verifyAssertionResponse(assertionResponse);
  if (verificationResult.error === true) {
    throw verificationResult;
  }

  const clientAssertionResponse = {
    ...assertionResponse,
    rawId: base64ToBuffer(assertionResponse.rawId),
    response: {
      authenticatorData: base64ToBuffer(
        assertionResponse.response.authenticatorData
      ),
      clientDataJSON: base64ToBuffer(assertionResponse.response.clientDataJSON),
      signature: base64ToBuffer(assertionResponse.response.signature),
      userHandle: base64ToBuffer(assertionResponse.response.userHandle)
    }
  };

  return clientAssertionResponse;
};

module.exports = {
  encodeAssertionOptions,
  decodeAssertionOptions,
  encodeAssertionResponse,
  decodeAssertionResponse
};
