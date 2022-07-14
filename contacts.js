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

const onReadFile = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  data = JSON.parse(file);
  return data;
};

const onMakeFile = (name, phone, email) => {
  const contact = { name, phone, email };
  const data = onReadFile();

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
  const result = onReadFile();
  result.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name}, No HP : ${contact.phone}`);
  });
  rl.close();
};

// TODO => validasi walaupun penulisan huruf tidak uppercase/lwrcs
const showDetailsContact = name => {
  const result = onReadFile();
  const foundContact = result.find(
    dta => dta.name.toLowerCase() === name.toLowerCase()
  );
  if (!foundContact) {
    console.log(`${name} tidak ditemukan`);
  }

  console.log(`Nama kontak : ${foundContact.name}`);
  console.log(`no HP kontak ${name} : ${foundContact.phone}`);
  if (foundContact.email) {
    console.log(`Email kontak ${name} : ${foundContact.email}`);
  }
  rl.close();
};

module.exports = {
  onFileValidation,
  onMakeFile,
  showAllContacts,
  showDetailsContact,
};
