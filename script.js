const CSV_URL =
'https://docs.google.com/spreadsheets/d/1RgV1cfvm_G5os9_jz04rHy8-doMnRldh2CdSrFny6CI/export?format=csv&gid=0';

async function carregarDados() {

    try {

        const resposta = await fetch(CSV_URL + '&t=' + new Date().getTime());

        const csv = await resposta.text();

        document
            .querySelectorAll('.coluna > div')
            .forEach(el => el.innerHTML = '');

        const linhas = csv.split('\n');

        linhas.shift();

        linhas.forEach(linha => {

            if (!linha.trim()) return;

            const [frota, local] = linha.split(',');

            const localNormalizado =
                local
                    .trim()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase();

            const card = document.createElement('div');

            card.className = 'card';
            card.innerHTML = `🚛 ${frota.trim()}`;

            let destino = null;

            switch(localNormalizado){

                case 'POSTO':
                    destino = document.getElementById('POSTO');
                    break;

                case 'ALCA':
                    destino = document.getElementById('ALÇA');
                    break;

                case 'PATIO':
                    destino = document.getElementById('PÁTIO');
                    break;

                case 'USINA':
                    destino = document.getElementById('USINA');
                    break;

                case 'OMC':
                case 'O.M.C':
                    destino = document.getElementById('O.M.C');
                    break;

                case 'FILA BANHEIRO':
                    destino = document.getElementById('FILA BANHEIRO');
                    break;
            }

            if(destino){
                destino.appendChild(card);
            }

        });

    } catch (erro) {

        console.error('Erro ao carregar dados:', erro);

    }
}

function atualizarHora() {

    const agora = new Date();

    document.getElementById('hora').innerHTML =
        agora.toLocaleTimeString('pt-BR');

}

carregarDados();

setInterval(carregarDados, 10000);

setInterval(atualizarHora, 1000);
