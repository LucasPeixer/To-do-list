window.onload = function () {
    const logado = JSON.parse(window.sessionStorage.getItem('ConfirmacaoLogin'));

    if (!logado){
        window.location = 'login.html';
    }else{
        inicializaDOM()
    } 
};



const formulario = document.querySelector('#form1');
const inputAtividade = document.getElementById('atividade')
let listaTarefa = [];

formulario.addEventListener("submit", evento =>{
    evento.preventDefault();
    
    const cadastroAtividade = criarDadosDaAtividade();

    if (cadastroAtividade) {
        gravarAtividade(cadastroAtividade);
    }

    if (!cadastroAtividade) {
        alert('Favor preencher o campo!');
    }
    
    formulario.reset();
    inputAtividade.focus();

    console.log (listaTarefa);
});



function criarDadosDaAtividade() {
    const status = document.querySelector('#verificado').checked
    const titulo = inputAtividade.value;
    const atividade = {'titulo':titulo, 'status': status}
    
    if (titulo) {return atividade}
    
    return null;    
}


function gravarAtividade(cadastroAtividade){
    listaTarefa.push(cadastroAtividade);
    addLineTable(cadastroAtividade);
    atualizaStorage()
}
const historico = obtemAtividadesStorage();

function atualizaStorage() {
    const dados = JSON.stringify(listaTarefa)
    localStorage.setItem('Atividades', dados)
}

function inicializaDOM(){
    if ( historico.length > 0){
        for(let atv1 of historico){
            listaTarefa = historico
            addLineTable(atv1)
            console.log(listaTarefa)
        }
    }
}

function obtemAtividadesStorage(){
    let aux = localStorage.getItem('Atividades')
    if (aux) {
        return JSON.parse(aux)
    }else{
        return Array()
    }
}

const localizar = document.getElementById('opc')
localizar.addEventListener("change", componente => {
    let filtered = [];

    switch (componente.target.value){
        case "all" : filtered = listaTarefa; console.log(filtered); break;
        case "uncompleted" : filtered = listaTarefa.filter((value) => value.status == false); console.log(filtered); break;
        case "completed" : filtered = listaTarefa.filter((value) => value.status == true); console.log(filtered); break;
        default : filtered = 'Escolha uma opção!';
    }

    removeAll();
    filtered.forEach(linha => {
        addLineTable(linha)
    })
});



function addLineTable(atividade){
    const tabela = document.querySelector('.todo-list');
    const line = document.createElement('div');
    line.classList.add('todo');
    const cAtividade = document.createElement('li');
    cAtividade.classList.add('todo-item');

    const cCheck = document.createElement('button');
    cCheck.classList.add('check-btn')
    cCheck.setAttribute('id', inputAtividade.value)
    const icon = document.createElement('i')
    icon.classList.add('fas')
    icon.classList.add('fa-check')

    const cDelete = document.createElement('button');
    cDelete.classList.add('trash-btn')
    cDelete.setAttribute('id', inputAtividade.value)
    const iconD = document.createElement('i')
    iconD.classList.add('fas')
    iconD.classList.add('fa-trash')
    tabela.appendChild(line);
    line.appendChild(cAtividade);
    line.appendChild(cCheck);
    cCheck.appendChild(icon)
    line.appendChild(cDelete)


    cDelete.appendChild(iconD)    
    cAtividade.innerHTML = atividade.titulo;

}


tabela.addEventListener('click', evento => {
    const userAction = evento.target

    const coluna = userAction.parentElement;
    switch(userAction.classList[0]){
        case('check-btn'): {
            coluna.classList.toggle('completed')
            atualizarStatus(userAction.id)
            atualizaStorage()
            console.log(listaTarefa)
            break;
    }   case('trash-btn'): {
            coluna.remove()
            listaTarefa = listaTarefa.filter(atividade => atividade.titulo == userAction.id)
            atualizaStorage()
            console.log(listaTarefa)
            break;
        }
    }
});

function removeAll(){
    const table = document.querySelector('#tabela');
    while (table.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
}

function atualizarStatus(atividade) {
    listaTarefa.filter(event => {
        if (event.titulo == atividade)
        event.status = !event.status;
    }); 
};
