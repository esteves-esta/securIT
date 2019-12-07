let sistemasCadastrados = [];

async function consultarSistema() {

    let corpo = new URLSearchParams({ idCliente: sessionStorage.idClient });
    let resposta = await fetch("../consultasBd", { method: "POST", body: corpo });
    if (resposta.ok) {
        let rer = await resposta.json();

        let conteudo = '<option selected>Selecione o Sistema</option>';
        for (r = 0; r < rer.length; r++) {
            let atual = rer[r];
            sistemasCadastrados.push(atual.name.toLowerCase());
            conteudo += `<option value="${atual.idServer}">${atual.name}</option>`;
        }

        sistema.innerHTML = conteudo;
    }
}

function alertar(title, text) {
    swal({
        title: title,
        text: text,
        type: "warning",
        icon: "warning",
        closeOnClickOutside: true,
    });
}

async function cadastrarDispositivo(e) {
    e.preventDefault();

    if (nomeDispositivo.value == "" || tipoDispositivo.value == "" || modeloDispositivo.value == "") {
        alertar("Preencha os campos em branco!", "");
        nomeDispositivo.focus();
        return false;

    } else if (nomeSistema.value != "" && sistema.value != "Selecione o Sistema") {
        alertar("Atenção", "Por favor escolha se quer cadastrar um novo sistema ou utilizar um existente!");
        nomeSistema.focus();
        return false;
    }
    else {
        idCliente.value = sessionStorage.idClient;

        let formulario = new URLSearchParams(new FormData(formDispositivo));
        let resposta = await fetch("../dispositivoBd/inserirDispositivo", { method: "POST", body: formulario });
        if (resposta.ok) {
            swal({
                title: "Dispositivo cadastrado!",
                icon: "info",
                closeOnClickOutside: true,
            });

            window.location = "cadastroDispositivo.html";
        } else {
            swal({
                title: "Aviso!",
                icon: "warning",
                dangerMode: true,
                text: "Esse nome de dispositivo já foi cadastrado. Por favor verifique na pagina de consulta!",
                closeOnClickOutside: true,
            });
        }
    }
}

async function alterarDispositivo(e) {
    e.preventDefault();

    if (nomeDispositivo.value == "" || tipoDispositivo.value == "" || modeloDispositivo.value == "") {

        swal({
            text: "Preencha os campos em branco!",
            type: "warning",
            icon: "warning",
            closeOnClickOutside: true,
        });
        nomeDispositivo.focus();
        return false;
    }
    else {
        let cdDevice = sessionStorage.codigo_alterar;
        idDevice.value = cdDevice;
        let formulario = new URLSearchParams(new FormData(formDispositivo));
        let resposta = await fetch("../dispositivoBd/alterar", { method: "POST", body: formulario });
        if (resposta.ok) {
            swal({
                title: "Aviso!",
                type: "info",
                text: "Dispositivo alterado!",
                closeOnClickOutside: true,
            });
        } else {
            swal({
                title: "Aviso!",
                type: "warning",
                dangerMode: true,
                text: "Ocorreu um erro e não foi alterado as informações. Tente novamente!",
                closeOnClickOutside: true,
            });
        }
    }
}



async function consultarDispositivo() {
    let info = { idDevice: sessionStorage.codigo_alterar }
    let corpo = new URLSearchParams(info);

    let resposta = await fetch("../dispositivoBd/pesquisarDispositivo", {
        method: "POST",
        body: corpo
    })

    if (resposta.ok) {
        let rer = await resposta.json();

        for (r = 0; r < rer.length; r++) {
            let atual = rer[r];
            // sistema.value = atual.sistema;
            sistema.value = atual.idServer;
            nomeDispositivo.value = atual.name;
            tipoDispositivo.value = atual.type;
            modeloDispositivo.value = atual.model;

            let des = atual.description.split(' ');
            localDispositivo.value = des[0];
            salaDispositivo.value = des[1];
        }
    }
}



