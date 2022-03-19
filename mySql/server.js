const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  cors: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route

const query = require("./query");

app.get("/kandidat/:query", (req, res) => {
  query
    .getKandidatiLike(req.params.query)
    .then((results) => {
      res.send(JSON.stringify(results));
      res.status(200);
      console.log("Prikazani su zeljeni kandidati");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/kandidat", (req, res) => {
  query
    .getKandidatiLike()
    .then((results) => {
      res.send(JSON.stringify(results));
      res.status(200);
      console.log("Prikazani su kandidati");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/cas", (req, res) => {
  query
    .getCasovi()
    .then((results) => {
      res.send(JSON.stringify(results));
      res.status(200);
      console.log("Prikazani su svi kodovi");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/polaze", (req, res) => {
  query
    .getPolaze()
    .then((results) => {
      res.send(JSON.stringify(results));
      res.status(200);
      console.log("Prikazani su polozeni casovi");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/kandidat", (req, res) => {
  query
    .postKandidat(req.body.id, req.body.ime, req.body.prezime)
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
    });
  res.end();
});

app.post("/polaze", (req, res) => {
  query
    .postPolaze(req.body.id, req.body.kod)
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
    });
  res.end();
});

app.delete("/kandidat/delete", (req, res) => {
  query
    .deleteKandidati()
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/kandidat/delete/:id", (req, res) => {
  query
    .deleteKandidat(req.params.id)
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*app.get("/delete", (req, res) => {
  query
    .getKupci()
    .then((results) => {
      res.send(JSON.stringify(results));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/delete/:id", (req, res) => {
  query
    .getKupciById(req.params.id)
    .then((results) => {
      res.send(JSON.stringify(results));
    })
    .catch((err) => {
      console.log(err);
    });
});
*/
