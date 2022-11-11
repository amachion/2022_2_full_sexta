const protocolo = "http://";
const baseURL = "localhost:3000";
const filmesEndPOint = "/filmes";

async function obterFilmes() {
  //console.log("teste")
  const URLcompleta = `${protocolo}${baseURL}${filmesEndPOint}`;
  const filmes = (await axios.get(URLcompleta)).data;
  console.log(filmes);
  let tabela = document.querySelector(".filmes");
  let corpoTabela = tabela.getElementsByTagName("tbody")[0];
  for (let filme of filmes) {
    let linha = corpoTabela.insertRow(0);
    let colunaTitulo = linha.insertCell(0);
    let colunaSinopse = linha.insertCell(1);
    colunaTitulo.innerHTML = filme.titulo;
    colunaSinopse.innerHTML = filme.sinopse;
  }
}
async function cadastrarFilme() {
  const URLcompleta = `${protocolo}${baseURL}${filmesEndPOint}`;
  //buscar informações no html
  let tituloInput = document.querySelector("#tituloInput");
  let sinopseInput = document.querySelector("#sinopseInput");
  //pegar as informações de cada elemento
  let titulo = tituloInput.value;
  let sinopse = sinopseInput.value;
  if (titulo && sinopse) {
    //enviar um filme: {titulo e sinopse}
    const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data;

    let tabela = document.querySelector(".filmes");
    let corpoTabela = tabela.getElementsByTagName("tbody")[0];
    corpoTabela.innerHTML = "";
    for (let filme of filmes) {
      let linha = corpoTabela.insertRow(0);
      let cellTitulo = linha.insertCell(0);
      let cellSinopse = linha.insertCell(1);
      cellTitulo.innerHTML = filme.titulo;
      cellSinopse.innerHTML = filme.sinopse;
    }
  }
  else {
    let alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout( () => {
        alert.classList.add('d-none')
        alert.classList.remove('show')
    }, 2000)
  }
}
