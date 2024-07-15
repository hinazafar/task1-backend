const bcrypt = require('bcrypt');

const str1 = 'password'
const str2 = 'password12'

const hashedpass = bcrypt.hash(str1,10)

try{
bcrypt.compare(str2,hashedpass.toString()))
  console.log("Equal")
else
console.log("flase")
}
catch{}