function consultar() {
    var sisEscolhido = sistemasescolha.options[sistemasescolha.selectedIndex].text;
    consultarHistorico(sistemasescolha.value, sisEscolhido);
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
            text: 'Quantidade de alertas por sistema'
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
            label: 'Alertas',
            data: [],
            borderColor: "#fdb416",
            borderWidth: "2",
            backgroundColor: "rgba(253, 180, 22, 0.27)",
        }
        ]
    };

    try {

        var response = await fetch('../consultasBd/consultaMaiorUtilizacao', {
            cache: 'no-store'
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

                dados.labels.push(registro.name);
                console.log(dados.labels);

                dados.datasets[0].data.push(registro.alertas);
                console.log(dados.datasets);
            }
            plotarGrafico(dados);

        } else {
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
    window.grafico_linha = Chart.Bar(c, {

        data: dados,
        options: configurarGrafico()
    });
}

// ---------------------------------------------------------------
// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGrafico() {
    obterDadosGrafico();
    setTimeout(atualizarGrafico, 5000);
}


///////////////////
