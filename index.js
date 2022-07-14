const {
  onFileValidation,
  onMakeFile,
  showAllContacts,
  showDetailsContact,
  deleteContact,
} = require("./contacts");
const yargs = require("yargs");

// membuat contact
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

// menampilkan semua
yargs.command({
  command: "list",
  describe: "Menampilkan semua list contacts",
  handler() {
    showAllContacts();
  },
});

// menampilkan detail (cari contact berdasarkan nama)
yargs.command({
  command: "detail",
  describe: "Menampilkan detail dari salah satu contact",
  builder: {
    nama: {
      demandOption: true,
      type: "string",
      describe: "Cari berdsarkan nama",
    },
  },
  handler(argv) {
    showDetailsContact(argv.nama);
  },
});

// menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus contact berdasarkan nama",
  builder: {
    nama: {
      demandOption: true,
      type: "string",
      describe: "Hapus berdasarkan nama",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
