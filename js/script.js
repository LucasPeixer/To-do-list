const formulario = document.querySelector('#form1');
const listaTarefa = [];

const inputAtividade = document.getElementById('atividade')

formulario.addEventListener("submit", evento =>{
    evento.preventDefault();

    const cadastroAtividade = criarDadosDaAtividade();

    if (cadastroAtividade) {
        gravarAtividade(cadastroAtividade);
    }

    if (!cadastroAtividade) {
        alert('Favor preencher o campooo!');
    }
    
    formulario.reset();
    inputAtividade.focus();

    console.log (listaTarefa);
});

function criarDadosDaAtividade() {
    const titulo = inputAtividade.value;
    const atividade = {titulo, status: 'uncompleted'}

    if (titulo) {return atividade}

    return null;    
}

function gravarAtividade(cadastroAtividade){
     listaTarefa.push(cadastroAtividade);
}


const localizar = document.getElementById('opc')
localizar.addEventListener("change", componente => {
    let filtered = [];
    switch (componente.target.value){
        case "all" : filtered = listaTarefa; console.log(filtered); break;
        case "uncompleted" : filtered = listaTarefa; console.log(filtered); break;
        default : console.log('Nenhuma Finalizada!');
    }
});
