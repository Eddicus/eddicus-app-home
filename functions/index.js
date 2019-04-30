const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const getTemplate = require("./helper").getTemplate;

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sibonginkhosi10@gmail.com",
    pass: "hbuwiyeoprbrrwyj"
  }
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendSignUpMessage = functions.firestore
  .document("signups/{id}")
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();
    let company = newValue.company | "";
    var mailOptions = {
      from: "sibonginkhosi10@gmail.com",
      to: "goodwill@eddicus.com",
      subject: "New SignUp!",
      html: getTemplate(newValue.name, newValue.email, company)
    };

    smtpTransport.sendMail(mailOptions, err => {
      if (err) {
        console.log("error", err);
      } else {
        console.log("Message sent!");
      }
    });

    // perform desired operations ...
  });
