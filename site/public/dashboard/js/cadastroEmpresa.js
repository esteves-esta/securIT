function alertSweet(text) {
    swal({
        title: "Aviso",
        text: text,
        icon: "warning",
        buttons: false,
        closeOnClickOutside: true,
    });
}


function verificarDados(e) {
    e.preventDefault();

    form.email.value = form.email.value.toLowerCase();

    if (nomeEmpresa.value == "") {
        alertSweet("Preencha campo NOME corretamente!");
        nomeEmpresa.focus();

        return false;
    } else if (nomeRepresentante.value == "" || cnpj.value == "") {
        alertSweet("Preencha os campos corretamente!");
        nomeRepresentante.focus();

        return false;
    } else if (form.email.value == ""
        || form.email.value.indexOf('@') == -1
        || form.email.value.indexOf('.com') == -1) {

        alertSweet("Insira um e-mail válido!");
        form.email.focus();
        return false;
    } else if (form.senha.value == "" || form.senha.value.length < 8) {
        alertSweet("A senha deve ter no mínimo 8 caracteres!");
        form.senha.focus();
        return false;
    } else {
        cadastrar();
    }
}


//Função pra enviar os dados do formulário para o cadastro.js e  retornar a resposta
async function cadastrar() {

    swal({
        title: "Aguarde...",
        text: "alguns instantes enquanto o cadastro é realizado",
        buttons: false,
        closeOnClickOutside: false,
    });

    let formulario = new URLSearchParams(new FormData(form));
    let resposta = await fetch("../empresaBd", { method: "POST", body: formulario });

    if (resposta.ok) {
        window.location = "login.html";
    } else {
        swal({
            title: "Aviso!",
            type: "warning",
            dangerMode: true,
            text: "O CNPJ e/ou o EMAIL está cadastrado no sistema!",
            closeOnClickOutside: true,
        });
    }
}

async function consultarCampos() {

    idCliente.value = sessionStorage.idClient;
    var cdCliente = { idCliente: sessionStorage.idClient };
    let corpo = new URLSearchParams(cdCliente);
    let results = await fetch("../empresaBd/consultarEmpresa", {
        method: "POST",
        body: corpo
    });

    if (results.ok) {
        let rer = await results.json();
        let atual = rer[0];

        idCliente.value = atual.idClient;
        nomeEmpresa.value = atual.compName;
        representante.value = atual.name;
        cnpj.value = atual.cnpj;
        email.value = atual.email;
        telefone.value = atual.phone;
        password.value = atual.pswd;

    }

}


async function alterarEmpresa(e) {
    e.preventDefault();

    let formulario = new URLSearchParams(new FormData(FormAlterarCliente));
    let resposta = await fetch("../empresaBd/alterar", { method: "POST", body: formulario });

    if (resposta.ok) {
        swal({
            title: "Aviso!",
            icon: "info",
            text: "Dados Cliente alterados!",
            closeOnClickOutside: true,
        });

        sessionStorage.name = representante.value;
        sessionStorage.empresa = nomeEmpresa.value;
    } else {
        swal({
            title: "Aviso!",
            icon: "warning",
            dangerMode: true,
            text: "Ocorreu um erro e as informações não foi alteradas. Tente novamente!",
            closeOnClickOutside: true,
        });
    }
}