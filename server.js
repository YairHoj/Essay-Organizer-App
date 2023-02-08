const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.listen(5001, () => {
  console.log(`Server listening on 5001`);
});

let myJSON;

const fetch = require("node-fetch");
let data;
let nameApi = [];

(async () => {
  const response = await fetch(
    "https://parseapi.back4app.com/classes/Usuniversitieslist_University?limit=9999&order=name",
    {
      headers: {
        "X-Parse-Application-Id": "o48TgKQgLKhYgHkeAgimDNiqsKzrFF13l8Ap6iky", // This is your app's application id
        "X-Parse-REST-API-Key": "BsZvKgvxd24ErVId6Vr1fQgXa9B8sT1pnxBiXgh8", // This is your app's REST API key
      },
    }
  );
  data = await response.json(); // Here you have the data that you need
  // console.log(JSON.stringify(data.results, null, 2));
  myJSON = JSON.stringify(data.results);
  for (let i = 0; i < 3202; i++) {
    let obj = { id: i + 1, name: data.results[i].name };
    nameApi.push(obj);
    // nameApi.push(data.results[i].name);
  }
})();

// 3202 colleges

app.get("/api", (req, res) => {
  res.send(nameApi);
});
