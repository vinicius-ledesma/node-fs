const fs = require("fs");

function qtdCidades(uf) {
  const cidades = JSON.parse(fs.readFileSync(`./dist/${uf}.json`, "utf-8"));
  return cidades.reduce((cont) => ++cont, 0);
}

function estQtdList() {
  return fs
    .readdirSync("./dist/")
    .map((estado) => {
      const sigla = estado.substr(0, 2);
      return {
        sigla,
        qtd: qtdCidades(sigla),
      };
    })
    .sort((a, b) => b.qtd - a.qtd);
}

function printTop5() {
  console.log("Top 5:");
  console.log(estQtdList().slice(0, 5));
}

function printBottom5() {
  const estList = estQtdList();
  console.log("Bottom 5:");
  console.log(estList.slice(estList.length - 5));
}

function printBiggerCity() {
  console.log("Maior nome de cidade de cada estado:");
  console.log(
    fs.readdirSync("./dist/").map((estado) => {
      const sigla = estado.substr(0, 2);
      const cidades = JSON.parse(
        fs.readFileSync(`./dist/${sigla}.json`, "utf-8")
      );
      const maior = maiorCidade(cidades).Nome;
      return `${maior} - ${sigla}`;
    })
  );
}

function maiorCidade(cidades) {
  return cidades.reduce((a, b) =>
    a.Nome.length > b.Nome.length
      ? a
      : a.Nome.length < b.Nome.length
      ? b
      : a.Nome.localeCompare(b.Nome) <= 0
      ? a
      : b
  );
}

function menorCidade(cidades) {
  return cidades.reduce((a, b) =>
    a.Nome.length < b.Nome.length
      ? a
      : a.Nome.length > b.Nome.length
      ? b
      : a.Nome.localeCompare(b.Nome) <= 0
      ? a
      : b
  );
}

function printSmallerCity() {
  console.log("Menor nome de cidade de cada estado:");
  console.log(
    fs.readdirSync("./dist/").map((estado) => {
      const sigla = estado.substr(0, 2);
      const cidades = JSON.parse(
        fs.readFileSync(`./dist/${sigla}.json`, "utf-8")
      );
      const menor = menorCidade(cidades).Nome;
      return `${menor} - ${sigla}`;
    })
  );
}

function printBigestCity() {
  const estados = JSON.parse(fs.readFileSync("./assets/Estados.json", "utf-8"));
  const cidades = JSON.parse(fs.readFileSync("./assets/Cidades.json", "utf-8"));
  const maior = maiorCidade(cidades);
  console.log(
    `Maior nome de cidade do Brasil: ${maior.Nome} - ${
      estados.find((estado) => estado.ID === maior.Estado).Sigla
    }`
  );
}

function printSmallestCity() {
  const estados = JSON.parse(fs.readFileSync("./assets/Estados.json", "utf-8"));
  const cidades = JSON.parse(fs.readFileSync("./assets/Cidades.json", "utf-8"));
  const menor = menorCidade(cidades);
  console.log(
    `Menor nome de cidade do Brasil: ${menor.Nome} - ${
      estados.find((estado) => estado.ID === menor.Estado).Sigla
    }`
  );
}

function createFiles() {
  const cidades = JSON.parse(fs.readFileSync("./assets/Cidades.json", "utf-8"));
  const estados = JSON.parse(fs.readFileSync("./assets/Estados.json", "utf-8"));

  estados.map((estado) => {
    const filCidades = cidades.filter((cidade) => cidade.Estado === estado.ID);
    fs.writeFileSync(
      `./dist/${estado.Sigla}.json`,
      JSON.stringify(filCidades),
      {},
      () => {}
    );
  });
  return;
}

createFiles();
printTop5();
printBottom5();
printBiggerCity();
printSmallerCity();
printBigestCity();
printSmallestCity();
