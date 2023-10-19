const dns = require("dns");
//         const email = 'arjunphp@gmail.com';
// 	const domain = email.split('@')[1];
//         dns.resolve(domain, 'MX', function(err, addresses) {
// if (err) {
//    console.log('No MX record exists, so email is invalid.');
// } else if (addresses && addresses.length > 0) {
//    console.log('This MX records exists So I will accept this email as valid.');
//  }
function checkEmailIsValid(e) {
  const domain = e.split("@")[1];
  return new Promise((resolve, reject) => {
    dns.resolve(domain, "MX", (e, address) => {
    //   console.log(e, address);
      if (e) return reject(e);
      else if (!e && address && address.length > 0) {
        return resolve("OK");
      } else {
        return reject("ERROR");
      }
    });
  });
}

module.exports = checkEmailIsValid;
