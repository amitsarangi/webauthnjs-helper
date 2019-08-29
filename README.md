# webauthnjs-helper

[![npm version](https://badge.fury.io/js/webauthnjs-helper.svg)](https://badge.fury.io/js/webauthnjs-helper)

During webauthn registration/authentication ceremony, browsers and serverside libraries (such as [fido2-lib](https://github.com/apowers313/fido2-lib)) deal with `ArrayBuffer` data, which can not be sent over the network. This library helps encode and decode the data which can be sent over network as JSON.

The following functionalities are provided

- Encodes AttestationOptions, AssertionOptions as JSON objects so that they can be sent through network from server. 

- Decodes the received AttestationOptions, AssertionOptions so that it can be passed to `navigator.credentials.create` or `navigator.credentials.get` respectively 

- Encodes AttestationResponse, AssertionResponse that we get from `navigator.credentials.create` or `navigator.credentials.get` as JSON objects so that they can be sent as JSON to the server for registration/verification.

- Decodes the received AttestationResponse, AssertionResponse so that it can be passed to the libraries for verification.

- TODO: Verifies that the schema of the objects are correct, which helps in debugging. Otherwise it is hard to debug the errors which are throw by Browser without much information.

## Installing

Using npm:

```bash
$ npm install webauthnjs-helper
```

Using yarn:

```bash
$ yarn add webauthnjs-helper
```

## Getting Started

In ES6 (For the browser):

```js
import {
  decodeAttestationOptions,
  encodeAttestationResponse,
  decodeAssertionOptions,
  encodeAssertionResponse
} from "webauthnjs-helper";
```

In Node-js:

```js
const {
  encodeAssertionOptions,
  encodeAttestationOptions,
  decodeAttestationResponse,
  decodeAssertionResponse
} = require("webauthnjs-helper");
```

## Example

I have created an webapp based on express & react, which mocks a real world use. [Check out the code](https://github.com/amitsarangi/webauthn-demo-react-express)

## Documentation

### AttestationOptions / CredentialCreationOptions

```js
/**
 * Encodes the CredentialCreationOptions/AttestationOptions from ArrayBuffer to base64 encoded string.
 * Typically this is used to encode the CredentialCreationOptions/AttestationOptions, before sending to client as JSON.
 * @param  {Object} options The generated attestation options
 * @return {Object} The JSON encoded options which can be sent to client
 */

encodeAttestationOptions(options)


/**
 * Decodes the CredentialCreationOptions/AttestationOptions from base64 encoded string to array buffer.
 * Typically this is used to decode the CredentialCreationOptions/AttestationOptions we get as JSON from server.
 * @param  {Object} options The attestation options received from backend
 * @return {Object} The parsed options which can be passed to navigator.credentials.create
 */
decodeAttestationOptions (options)

```

### AttestationResponse / PublicKeyCredential
```js
/**
 * Encodes the PublicKeyCredential values from ArrayBuffer to base64 encoded string JSON Object.
 * Typically this is used to encode the response from navigator.credentials.create to send to server.
 * @param  {PublicKeyCredential} attestationResponse The response from navigator.credentials.create
 * @return {Object} The JSON encoded options which can be passed to server
 */
encodeAttestationResponse(attestationResponse)


/**
 * Decodes the PublicKeyCredential Object, whose values are encoded to base64 string, to ArrayBuffer values.
 * Typically this is used to encode the response from navigator.credentials.create to send to server.
 * @param  {Object} attestationResponse The response from navigator.credentials.create which is sent from the client as JSON
 * @return {Object} The JSON encoded options which can be passed to server
 */

decodeAttestationResponse(attestationResponse)
```

### AssertionOptions / CredentialRequestOptions

```js
/**
 * Encodes the CredentialRequestOptions/AssertionOptions values from ArrayBuffer to base64 encoded string.
 * Typically this is used to encode the CredentialRequestOptions/AssertionOptions, before sending to client.
 * @param  {Object} options The generated attestation options
 * @return {Object} The JSON encoded options which can be sent to client
 */
encodeAssertionOptions(assertionOptions)

/**
 * Decodes the CredentialRequestOptions/AssertionOptions values from base64 encoded string to ArrayBuffer.
 * Typically this is used to decode the CredentialRequestOptions/AssertionOptions that we got from server before passing it to navigator.credentials.get.
 * @param  {Object} options The JSON encoded options attestation options
 * @return {Object} The parsed options which can be passed to navigator.credentials.get
 */
decodeAssertionOptions(assertionOptions)
```

### AssertionResponse / PublicKeyCredential

```js
/**
 * Encodes the PublicKeyCredential values from ArrayBuffer to base64 encoded string JSON Object.
 * Typically this is used to encode the response from navigator.credentials.get to send to server.
 * @param  {PublicKeyCredential} assertionResponse The response from navigator.credentials.get
 * @return {Object} The JSON encoded options which can be passed to server
 */
encodeAssertionResponse(assertionResponse)


/**
 * Decodes the PublicKeyCredential Object, whose values are encoded to base64 string, to ArrayBuffer values.
 * Typically this is used to encode the response from navigator.credentials.get to send to server.
 * @param  {Object} assertionResponse The response from navigator.credentials.create which is sent from the client as JSON
 * @return {Object} The JSON encoded options which can be passed to server
 */
decodeAssertionResponse(assertionResponse)
```

## TODO
- Tests
- Verification of the schema
## License

MIT
