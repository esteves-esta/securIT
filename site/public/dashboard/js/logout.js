function logoff() {
    sessionStorage.removeItem('idClient');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('empresa');

    window.location.href = 'login.html';
}

function verificarAutenticacao() {
    var nome = sessionStorage.name;
    var id = sessionStorage.idClient;
    var empresa = sessionStorage.compName;

    if (nome == undefined && id == undefined) {
        location.href = 'login.html';
    } else {
        return false;
    }
}


function verificarDados(e) {
    e.preventDefault();

    formlogin.email.value = formlogin.email.value.toLowerCase();
    formlogin.password.value = formlogin.password.value.toLowerCase();

    if (email.value == "" || password.value == "") {
        swal({
            title: "Aviso",
            text: "Preencha os campos corretamente!",
            icon: "warning",
            buttons: false,
            closeOnClickOutside: true,
        });
        email.focus();
        return false;
    } else {
        logar();
    }
}


async function logar() {
    let formulario = new URLSearchParams(new FormData(formlogin));
    let resposta = await fetch("../login", { method: "POST", body: formulario });
    console.log(formulario);
    console.log(resposta);
    if (resposta.ok) {
        let respostaJSON = await resposta.json();
        console.log(respostaJSON);
        sessionStorage.idClient = respostaJSON[0].idClient;
        sessionStorage.name = respostaJSON[0].name;
        sessionStorage.empresa = respostaJSON[0].compName;
        autentificarDash();
    }
    else {
        swal({
            title: "Aviso",
            text: "Informações de login não encontradas!",
            icon: "error",
            buttons: false,
            closeOnClickOutside: true,
        });
    }
}


function autentificarDash() {
    var nome = sessionStorage.name;
    var id = sessionStorage.idClient;

    if (nome != undefined && id != undefined) {
        location.href = 'index.html';

    } else {
        return false;
    }
}
