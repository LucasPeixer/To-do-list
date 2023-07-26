let btnSair = document.querySelector("#btn-sair")
btnSair.addEventListener("click", () => {
    sessionStorage.setItem("ConfirmacaoLogin", false)
    window.location = 'login.html'
});