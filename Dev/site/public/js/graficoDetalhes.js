let nomeComponente = "";


// consultarComponentes
async function consultarSituaçãoAtual() {

    var codigosistema = { codigosistema: sessionStorage.codigo_sistema }
    var corpo = new URLSearchParams(codigosistema);
    try {

        var resposta = await fetch("../consultaUser/consultaComponentsAtual", {
            method: "POST",
            body: corpo
        });

        if (resposta.ok) {

            var rer = await resposta.json();

            console.log(rer);
            for (r = 0; r < rer.length; r++) {
                var atual = rer[r];
                if (atual.name.includes('CPU')) {
                    cpuValue.innerHTML = atual.value;
                }
                else if (atual.name.includes('RAM')) {
                    memoriaValue.innerHTML = atual.value;
                }
                else {
                    hdValue.innerHTML = atual.value;
                }
            }
        }
    } catch (error) {
        console.log('erro atual' + error);
    }

}

function chamarMudaCor() {
    mudarCor(cpuValue, cardCpu);
    mudarCor(memoriaValue, cardMemoria);
    mudarCor(hdValue, cardDisco);
}

function mudarCor(comp, divcomp) {
    if (parseFloat(comp.innerHTML) > 90) {
        divcomp.style.border = "2px solid red";
    } else {

        if (divcomp.className.includes('activeCard')) {
            divcomp.style.border = "2px solid  #c7911d87";
        } else {
            divcomp.style.border = "2px solid  #fff";
        }
    }
}


async function verComponentes() {
    try {

        var codigosistema = { codigosistema: sessionStorage.codigo_sistema }

        var corpo = new URLSearchParams(codigosistema);
        var resposta = await fetch("../consultaUser/informacaoComponentes", {
            method: "POST",
            body: corpo
        });

        if (resposta.ok) {
            var rer = await resposta.json();

            for (r = 0; r < rer.length; r++) {
                var atual = rer[r];
                if (atual.name.includes('CPU')) {
                    nomeCPU.innerHTML = atual.name;
                    freq.innerHTML = atual.size;
                } else if (atual.name.includes('RAM')) {
                    capacidadeMemoria.innerHTML = atual.size;
                } else {
                    capacidadeHD.innerHTML = atual.size;
                }
            }
        }
    } catch (error) {
        console.log('erro info componentes' + error);
    }
}



// ---------------------------------------------------------------
// DECLARAR VÁRIAVEIS
var exibiu_grafico = false;

// ---------------------------------------------------------------
// DECLARAR FUNÇÕES

// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
function configurarGrafico() {
    var configuracoes = {
        responsive: true,
        animation: exibiu_grafico ? false : {
            duration: 1000
        },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Dados atuais do componente'
        },
    };

    exibiu_grafico = true;

    return configuracoes;
}

// ---------------------------------------------------------------


// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
async function obterDadosGrafico() {

    // neste JSON tem que ser 'labels', 'datasets' etc, 
    // porque é o padrão do Chart.js
    var dados = {
        labels: [],
        datasets: [{
            label: nomeComponente,
            data: [],
            borderColor: "#fdb416",
            borderWidth: "2",
            backgroundColor: "rgba(253, 180, 22, 0.27)",
        }
        ]
    };

    try {

        var info = {
            codigosistema: sessionStorage.codigo_sistema,
            componenteNome: nomeComponente
        };
        var corpo = new URLSearchParams(info);

        var response = await fetch('../consultaUser/consultaComponentesHistorico', {
            method: "POST",
            body: corpo
        });
        if (response.ok) {
            var resposta = await response.json();

            // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            resposta.reverse();

            for (i = 0; i < resposta.length; i++) {
                var registro = resposta[i];

                // aqui, após 'registro.' use os nomes 
                // dos atributos que vem no JSON 
                // que gerou na consulta ao banco de dados

                var dataLabel = registro.date_time;
                dataLabel = dataLabel.substring(11, 19);
                dados.labels.push(dataLabel);


                dados.datasets[0].data.push(registro.value);

            }
            plotarGrafico(dados);

        } else {
            swal({
                title: "Aviso!",
                type: "warning",
                dangerMode: true,
                text: "Você ainda não começoçu a utilizar a nossa aplicação! Inicie a aplicação para ver os dados!",
                closeOnClickOutside: true,
            });
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }
    catch (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    };

}

// ---------------------------------------------------------------

// só altere aqui se souber o que está fazendo!
function plotarGrafico(dados) {
    var ctx = document.getElementById("singelBarChart");
    ctx.width = 500;
    ctx.height = 500;

    var c = singelBarChart.getContext('2d');
    window.grafico_linha = Chart.Line(c, {
        data: dados,
        options: configurarGrafico()
    });
}

// ---------------------------------------------------------------
// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
async function atualizarGrafico() {
    await obterDadosGrafico();
    await consultarSituaçãoAtual();
    setTimeout(atualizarGrafico, 5000);
}

