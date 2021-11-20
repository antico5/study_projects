const BigNumber = require("big-number");

const a = new BigNumber("11", 10);
const b = new BigNumber("17", 10);

const g = new BigNumber("13", 10);

const n = new BigNumber("4123215623", 10);

const alice_public = new BigNumber("13", 10).power(a).mod(n);
console.log("alice", alice_public.toString());
const bob_public = new BigNumber("13", 10).power(b).mod(n);
console.log("bob", bob_public.toString());

const alice_from_bob = alice_public.power(b).mod(n).toString();
const bob_from_alice = bob_public.power(a).mod(n).toString();

// console.log({ alice, bob });
console.log({ alice_from_bob, bob_from_alice });
