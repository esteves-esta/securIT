function abrirDetalhes(codigo, nome) {
    sessionStorage.codigo_sistema = codigo;
    sessionStorage.nomeSistema = nome;
    location.href = 'sistemaDetalhes.html';
}

async function consultarDispositivosServidores() {

    var sistemas = [];
    var cdCliente = { idCliente: sessionStorage.idClient }
    var corpo = new URLSearchParams(cdCliente);
    try {
        var respostaSistemas = await fetch("../consultasBd", {
            method: "POST",
            body: corpo
        });

        if (respostaSistemas.ok) {
            var json = await respostaSistemas.json();
            sistemas = json;
        }
        const resposta = await fetch("../consultasBd/consultaTotalDispositivos", { method: "POST", body: corpo });

        if (resposta.ok) {
            let rer = await resposta.json();

            let conteudoCards = '';
            for (r = 0; r < sistemas.length; r++) {
                let sistema = sistemas[r];
                let dispositivoTotal = 0;

                for (i = 0; i < rer.length; i++) {
                    if (rer[i].idServer == sistema.idServer) {
                        dispositivoTotal = rer[i].totalDevices;
                        break;
                    }
                }

                conteudoCards += `<a class="detalhesOff">
                                <div class="card borda-esq mb-3">
                                    <div class="card-body linha">
                                        <h4 class="titulo-sistemas">
                                            <span class="dispositivos-total">${dispositivoTotal}</span>
                                            ${sistema.name}
                                        </h4>

                                        <div>
                                            <span class="status-dispositivo on mr-3">
                                                <span id="dispositivos-on">${dispositivoTotal}</span>
                                                <span id="dispositivos-off">ON</span>
                                            </span>

                                            <span class="status-dispositivo off">
                                                <span id="dispositivos-on">0</span>
                                                <span id="dispositivos-off">OFF</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col-lg-12 p-3 infoSistema">

                                        <button class="btn btn-outline-warning mb-2"
                                            onclick="abrirDetalhes(${sistema.idServer}, '${sistema.name}')">Detalhes</button>
                                    </div>
                                </div>
                            </a>`;
            }
            cardSistemas.innerHTML = conteudoCards;

            $('.detalhesOff').each(function () {
                $(this).on('click', function (event) {
                    $(this).children().find('.infoSistema').toggle();
                });
            });


        } else {
            vazio.style.display = "block";
            alert('erro 2');
        }
    } catch (error) {
        vazio.style.display = "block";
    }
}

// ------------------------

// CONSULTA SISTEMAS
async function excluir(id) {

    let willDelete = await swal({
        title: "Você tem certeza que deseja excluir estes dados?",
        text: "Essa ação não poderá ser revertida!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });
    if (willDelete) {
        let corpo = new URLSearchParams({ idDispositivo: id });

        let resposta = await fetch("../excluir", { method: "POST", body: corpo });
        if (resposta.ok) {
            swal({
                title: "Excluído com sucesso!",
                icon: "success"
            });
            carregaTabela();
        } else {
            swal({
                title: "Erro ao excluir!",
                icon: "error"
            });
        }
    } else {
        swal("Seus dados não foram excluidos.");
    }
}

function alterar(id) {
    sessionStorage.codigo_alterar = id;
    location.href = 'alterarDispositivo.html';
}

//FUNÇÃO QUE BUSCA OS DADOS E INSERE NA TABELA
async function carregaTabela() {
    let formulario = new URLSearchParams(new FormData(FormSistema));
    let resposta = await fetch("../consultasBd/pesquisarDispositivosDoSistema", { method: "POST", body: formulario });
    if (resposta.ok) {
        let conteudo = '';
        let rer = await resposta.json();

        for (r = 0; r < rer.length; r++) {
            let atual = rer[r]; conteudo += `<tr>
                        <td>
                            <span class="status-dispositivo ${atual.status == 'online' ? 'on' : 'off'} mr-3">
                                <span id="dispositivos-off">${atual.status == 'online' ? 'ON' : 'OFF'}</span>
                            </span>
                        </td>
                        <td>${atual.name}</td>
                        <td>${atual.description}</td>
                        <td>${atual.model}</td>
                        <td>${atual.type}</td>
                        <td>
                                <button class="btn btn-warning mb-2" onclick="alterar(${atual.idDevice})">Alterar</button>
                                <button class="btn btn-danger mb-2" onclick="excluir(${atual.idDevice})">Excluir</button>
                            </td>
                        </tr>`;
        }
        tabelaDados.innerHTML = conteudo;
        tabelaContainer.style.display = "block";
        cardConteudo.style.display = "none";
        card.style.display = "block";

    }
    else {
        card.style.display = "block";
        cardConteudo.style.display = "block";
        cardConteudo.innerHTML = "<h2>Você não cadastrou nenhum Dispositivo! </h2>";
        tabelaContainer.style.display = "none";
    }
}

function carrega() {
    carregaTabela(sistema.value);

    $('#tabele').dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        }
    });
}


async function consultarSis() {
    let corpo = new URLSearchParams({ idCliente: sessionStorage.idClient });
    let resposta = await fetch("../consultasBd", { method: "POST", body: corpo });

    if (resposta.ok) {
        let rer = await resposta.json();
        let conteudo = '<option disabled selected>Selecione o Sistema</option>';
        for (r = 0; r < rer.length; r++) {
            let atual = rer[r]; conteudo += `<option value="${atual.idServer}">${atual.name}
            </option>`;
        }
        sistema.innerHTML = conteudo;
    }
    else {
        cardConteudo.innerHTML = "<h2>Você não cadastrou nenhum Sistema! </h2>";
    }
}


// -----

// consultar alertas

async function consultarLogAlertas() {
    let corpo = new URLSearchParams({ idCliente: sessionStorage.idClient });

    let resposta = await fetch("../consultasBd/alertas", {
        method: "POST",
        body: corpo
    });

    if (resposta.ok) {
        let rer = await resposta.json();
        let conteudo = '';
        for (r = 0; r < rer.length; r++) {
            let atual = rer[r];

            conteudo += `
                    <tr>
                        <td>${atual.serverName}</td>
                        <td>${atual.component}</td>
                        <td>O componente atingiu <b>${atual.value}%</b> de uso.</td>
                        <td>${atual.date.substring(0, 19).replace('T', ' ')}</td>
                    </tr>
                    `;
        }

        card.style.display = "block";
        tabelaConteudo.innerHTML = conteudo;
        tabelaContainer.style.display = "block";
        cardConteudo.style.display = "none";

        $('#alertaTabela').dataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
            }
        });
    }
    else {
        card.style.display = "block";
        cardConteudo.style.display = "block";
        cardConteudo.innerHTML = "<h2>Não exitem logs de nenhum sistema.</h2>";
        tabelaContainer.style.display = "none";
    }
}


