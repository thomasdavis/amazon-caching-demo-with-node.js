var analyze = require('Sentimental').analyze,
    positivity = require('Sentimental').positivity,
    negativity = require('Sentimental').negativity;

console.log(analyze("Hey you worthless scumbag")); //Score: -6, Comparative:-1.5
positivity("This is so cool"); //Score: 1, Comparative:.25
negativity("Hey you worthless scumbag"); //Score: 6, Comparative:1.5
