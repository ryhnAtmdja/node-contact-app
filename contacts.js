const fs = require("fs");
const readline = require("readline");
const validator = require("validator");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const onFileValidation = () => {
  const dirPath = "./data";
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, { recursive: true }, err => {
      if (err) throw err;
    });
  }

  const contactsFile = "data/contacts.json";
  if (!fs.existsSync(contactsFile)) {
    fs.writeFile("data/contacts.json", "[]", "utf-8", err => {
      if (err) throw err;
    });
  }
};

const onMakeFile = (name, phone, email) => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contact = { name, phone, email };
  const data = JSON.parse(file);
  console.log(data);

  // cek duplikasi nama
  const checkNameDuplikat = data.find(dta => dta.name === name);
  if (name === "") {
    console.log("nama wajib diisi");
    return rl.close();
  } else if (checkNameDuplikat) {
    console.log("Nama sudah diambil");
    return rl.close();
  }

  // cek validasi email
  const checkEmail = validator.isEmail(email);
  if (email === "") {
    console.log("email wajib diisi");
    return rl.close();
  } else if (!checkEmail) {
    console.log("Formal email tidak benar");
    return rl.close();
  }

  data.push(contact);

  fs.writeFile("data/contacts.json", JSON.stringify(data), err => {
    if (err) throw err;
    console.log("File has been created/saved");
  });

  console.log(`Terima kasih sudah mengisikan data`);
};

module.exports = { onFileValidation, onMakeFile };
