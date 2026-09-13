const fs = require('fs');
const path = require('path');

const b64 = fs.readFileSync(path.join(__dirname, '..', 'assets', 'profile.png.b64'), 'utf8').trim();
const out = path.join(__dirname, '..', 'assets', 'profile.png');
fs.writeFileSync(out, Buffer.from(b64, 'base64'));
console.log('Decoded profile image to', out);
