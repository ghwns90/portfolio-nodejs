const bcrypt = require('bcrypt');
const plainPassword = '1234';
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, function(err, hash){
    console.log('내 암호화된 비밀번호', hash);
});


'$2b$10$TZWrKsiqbwCPoVzo82e6LeOsE/7npgdxXHsW0EVsZ/w5BDU.bMVOa'