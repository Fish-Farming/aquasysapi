module.exports = {
  "$schema":"http://json-schema.org/draft-04/schema#",
  "id":"/user",
  "title":"User Authorization",
  "description": "Explain",
  "type":"object",
  "properties": {
    "aid": {
      "description":"User ID (normally e-mail)",
      "type":"string"
    },
    "code":{
      "description":"Passcode",
      "type":"string"
    }
  },
  "required":["aid","code"]
}