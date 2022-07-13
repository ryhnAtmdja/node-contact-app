const { onFileValidation, onMakeFile, tulisPertanyaan } = require("./contacts");
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Menambahkan contact baru",
  builder: {
    nama: {
      demandOption: true,
      type: "string",
      describe: "Nama lengkap",
    },
    noHP: {
      demandOption: true,
      type: "string",
      describe: "Nomor handphone",
    },
    email: {
      demandOption: false,
      type: "string",
      describe: "Email (Option)",
    },
  },
  handler(argv) {
    onFileValidation();
    onMakeFile(argv.nama, argv.noHP, argv.email);
  },
});

yargs.parse();

// const mainFunction = async () => {
//   onFileValidation();
//   const nama = await tulisPertanyaan("Masukkan namamu : ");
//   const noHP = await tulisPertanyaan("Masukkan nomer HP mu : ");
//   const email = await tulisPertanyaan("Masukkan emailmu : ");
//   onMakeFile(nama, noHP, email);
// };

// mainFunction();
