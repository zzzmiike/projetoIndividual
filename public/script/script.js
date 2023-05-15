const privateKey = "4a11e7353de06c247a0b1fc44057121851474704";
const publicKey = "eaf3fa204749e1b8d92f1585d6b58007";

function createHash(timestamp) {
    const stringToHash = timestamp + privateKey + publicKey;
    const hash = CryptoJS.MD5(stringToHash).toString();
    return hash;
}

var idPersonagem = 0;

function acharPersonagem() {
    idPersonagem = 0;
    const timeStamp = new Date().getTime();
    const hash = createHash(timeStamp);
    var selectElement = document.getElementById('selectPersonagem');
    var selectedValue = selectElement.value;
    var elementoClicado = event.target;
    console.log(selectedValue);

    if (selectedValue == "SelecioneUmPersonagem") {
        console.log('O clique ocorreu em:', elementoClicado);
        if (elementoClicado == `<button onclick="acharPersonagem()" class="btnl">Selecionar Personagem</button>`) {
            mesagemCadastro.innerHTML = `Selecione um Personagem!!`
            selectPersonagem.style.borderColor = "#b03838";
        } else if (elementoClicado == `<button onclick="acharPersonagem()" class="btn">Selecionar Personagem</button>`) {
            person.innerHTML = `Selecione um Personagem!!`
            selectPersonagem.style.borderColor = "#b03838";
        }
    } else if (selectedValue == "capitain_american") {
        if (elementoClicado == `<button onclick="acharPersonagem()" class="btn">Selecionar Personagem</button>`) {
            idPersonagem = 1009220;
        } else {
            idPersonagem = 1009220;
        }
    } else if (selectedValue == "iron_man") {
        if (elementoClicado == `<button onclick="acharPersonagem()" class="btn">Selecionar Personagem</button>`) {
            idPersonagem = 1009368;
        } else {
            idPersonagem = 1009368;
        }
    } else if (selectedValue == "thor") {
        idPersonagem = 1011025;
    } else if (selectedValue == "hulk") {
        idPersonagem = 1009351;
    } else if (selectedValue == "black_widow") {
        idPersonagem = 1009189;
    } else if (selectedValue == "black_panther") {
        idPersonagem = 1009187;
    }

    const urlPerson = `https://gateway.marvel.com/v1/public/characters/${idPersonagem}?&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
    // const urlStories = `https://gateway.marvel.com:443/v1/public/characters/${idPersonagem}/stories?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            getPerson(data);
        }
    };
    xhttp.open("GET", urlPerson, true);
    xhttp.send();
}

function getPerson(dados) {

    console.log(dados["data"]["results"]);
    let coisasPersonagens = dados["data"]["results"];
    i = 0;
    person.innerHTML = "";
    while (i < coisasPersonagens.length) {
        if (idPersonagem == 1009220) {
            person.innerHTML += `
            <span class="tituloPersonagem">Capitão America</span><br>
            <img class="personagemImg" src="./assets/img/pesons/capitao.png"><br>
            <span class="infoPerso">
                <a> Capitão América é um super-herói de histórias em quadrinhos americanos publicado pela Marvel Comics.
                Criado por Joe Simon e Jack Kirby, o primeiro personagem apareceu em Captain America Comics
                # 1 da Timely Comics, antecessora da Marvel Comics.</a>
            </span>
            `
        }
        person.innerHTML += `
        <div class="card" style="width: 18rem;" id="c${i}">
            <div class="card-body">
                <h5 class="card-title" id="n${i}">Card title</h5>
                <h5 class="card-title" id="cod${i}">Card title</h5>
                <a href="#" onclick="showHistorys(this)" class="btn btn-primary" data-toggle="modal"
                    data-target="#exampleModal">Stories</a>
            </div>
        </div>
        `;
        let primeiro = coisasPersonagens[i];
        quadrado = document.querySelector("#c" + i + "");
        quadrado.querySelector("#n" + i + "").textContent = "Nome: " + primeiro["name"];
        quadrado.querySelector("#cod" + i + "").textContent = "Id: " + primeiro["id"];
        i++;
    }

}

function cadastrar() {

    var emailVar = inp_email.value;
    var nomeVar = inp_nome.value;
    var userVar = inp_user.value;
    var senhaVar = inp_senha.value;
    var confiSenhaVar = inp_confiSenha.value;

    if (emailVar == "" || nomeVar == "" || userVar == "" || senhaVar == "" || confiSenhaVar == "") {

        finalizarAguardar();
        return false;
    }

    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            userServer: userVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            cardErro.style.display = "block";

            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")

            limparFormulario();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}