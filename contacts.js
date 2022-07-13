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
  if (!checkEmail) {
    console.log("Format email tidak benar");
    return rl.close();
  }

  // cek validasi nomor hp
  const checkPhoneNum = validator.isMobilePhone(phone, "id-ID");
  if (phone === "") {
    console.log("Nomor hp wajib diisi");
    return rl.close();
  } else if (!checkPhoneNum) {
    console.log("Nomor hp harus sesuai (+62)");
    return rl.close();
  }

  data.push(contact);

  fs.writeFile("data/contacts.json", JSON.stringify(data), err => {
    if (err) throw err;
    console.log("File has been created/saved");
  });

  console.log(`Terima kasih sudah mengisikan data`);

  rl.close();
};

const showAllContacts = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const data = JSON.parse(file);
  console.log(data);
  rl.close();
};

module.exports = { onFileValidation, onMakeFile, showAllContacts };
