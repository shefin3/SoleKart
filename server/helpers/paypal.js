const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "Aetl6PNF6q1KJPDNcrvTpcojOPkcqbE-gtgchkV3Gk6m66DDhrfNyaN-L4SGMdewA9B7Tewj2VO5RDKv",
  client_secret: "EL2IKJ5KN77dHE1-yzr1AWh5Fa2-4MB0yIJVciLWsoBe1aJgwrP403WLMOdSz-dRA-F3QIbNyQyQQxqi",
});

module.exports = paypal;