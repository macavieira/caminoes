const URL_API =
"https://script.google.com/macros/s/SEU_ID_AQUI/exec";

async function carregarDados() {

    try {

        const resposta = await fetch(URL_API);

        const dados = await resposta.json();

        document
            .querySelectorAll(".coluna > div")
            .forEach(el => el.innerHTML = "");

        dados.forEach(item => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                🚛 ${item.frota}
            `;

            const local =
                document.getElementById(item.local);

            if(local){
                local.appendChild(card);
            }

        });

    }
    catch(erro){

        console.error(erro);

    }

}

function atualizarHora() {

    const agora = new Date();

    document.getElementById("hora").innerHTML =
        agora.toLocaleTimeString('pt-BR');

}

carregarDados();

setInterval(carregarDados, 10000);

setInterval(atualizarHora, 1000);
