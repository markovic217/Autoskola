const config = require("./config");
const mysql = require("mysql");
const con = mysql.createConnection(config);

exports.getKandidati = () => {
  return new Promise((resolve, reject) => {
    let sql = `select * from Kandidat order by prezime asc`;
    con.query(sql, function (err, results) {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

exports.getKandidatiLike =(query)=>{
  return new Promise((resolve, reject) => {
    let sql = `select * from Kandidat ${query} order by prezime asc`;
    con.query(sql, function (err, results) {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

exports.postKandidat = (id, ime, prezime) => {
  return new Promise((resolve, reject) => {
    let sql = `insert into Kandidat values ('${id}','${ime}','${prezime}')`;
    con.query(sql, function (err, results) {
      if (err) reject(err);
      else resolve("Unet kupac");
    });
  });
};

exports.deleteKandidati = () => {
  return new Promise((resolve, reject) => {
    let sql = `delete from Kandidat`;
    con.query(sql, function (err, results) {
      if (err) reject(err);
      else resolve("Svi kandidati su obrisani");
    });
  });
};

exports.deleteKandidat = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `delete from Kandidat where id='${id}'`;
    con.query(sql, function (err, results) {
      if (err) reject(err);
      else resolve("Kandidat sa id:" + id + " je obrisan");
    });
  });
};

exports.getCasovi = () => {
  return new Promise((resolve, reject) => {
    let sql = `select * from Cas order by kod asc`;
    con.query(sql, function (err, results) {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

exports.getPolaze = () => {
  return new Promise((resolve, reject) => {
    let sql = `select * from Polaze order by idKandidat`;
    con.query(sql, function (err, results) {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

exports.postPolaze = (id,kod) => {
  return new Promise((resolve, reject) => {
    let sql = `insert into Polaze values ('${id}','${kod}')`;
    con.query(sql, function (err, results) {
      if (err) reject(err);
      else resolve("Zavrsen cas");
    });
  });
};