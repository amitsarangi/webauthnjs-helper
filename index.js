const {
  encodeAttestationOptions,
  decodeAttestationOptions,
  encodeAttestationResponse,
  decodeAttestationResponse
} = require("./src/attestation");

const {
  encodeAssertionOptions,
  decodeAssertionOptions,
  encodeAssertionResponse,
  decodeAssertionResponse
} = require("./src/assertion");

module.exports = {
  encodeAttestationOptions,
  decodeAttestationOptions,
  encodeAttestationResponse,
  decodeAttestationResponse,
  encodeAssertionOptions,
  decodeAssertionOptions,
  encodeAssertionResponse,
  decodeAssertionResponse
};
