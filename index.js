const { onFileValidation, onMakeFile, showAllContacts } = require("./contacts");
const yargs = require("yargs");

yargs
  .command({
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
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Menampilkan semua list contacts",
  handler() {
    showAllContacts();
  },
});

yargs.parse();
