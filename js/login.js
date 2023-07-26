const localizarLogin = document.querySelector('#login');
const usuario_esperado = 'admin';
const senha_esperado = '1234';

localizarLogin.addEventListener("submit", eventoLogin => {
    eventoLogin.preventDefault();

    const login = document.querySelector('#usuario').value;
    const password = document.querySelector('#senha').value;

    if (login === usuario_esperado && password === senha_esperado){
        window.sessionStorage.setItem('ConfirmacaoLogin','true');
        window.sessionStorage.setItem('nomeUsuario', login )
        window.location = 'index.html';
    }else{
        window.sessionStorage.setItem('ConfirmacaoLogin','false');
        alert('Usuário ou senha incorreto');
    }
});
