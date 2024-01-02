const bcrypt = require("bcryptjs");
function hashpassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

function comparepasswords(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}
module.exports = {
  hashpassword,
  comparepasswords
};
