// Array
let participantes = [
    {
        nome: 'Cauã Borges',
        email: 'cauabfaria@gmail.com',
        dataInscricao: new Date(2024, 4, 25, 18, 15),
        dataCheckIn: new Date(2024, 4, 28, 22, 0)
    },
    {
        nome: 'Davi Faria',
        email: 'davigtrindade@gmail.com',
        dataInscricao: new Date(2024, 3, 25, 10, 8),
        dataCheckIn: new Date(2024, 3, 30, 9, 0)
    },
    {
        nome: 'Maria Silva',
        email: 'mariasilva@gmail.com',
        dataInscricao: new Date(2024, 4, 9, 15, 30),
        dataCheckIn: new Date(2024, 4, 10, 20, 0)
    },
    {
        nome: 'João Oliveira',
        email: 'joaooliveira@gmail.com',
        dataInscricao: new Date(2024, 4, 5, 12, 45),
        dataCheckIn: null
    },
    {
        nome: 'Ana Santos',
        email: 'anasantos@gmail.com',
        dataInscricao: new Date(2024, 4, 15, 9, 0),
        dataCheckIn: new Date(2024, 4, 18, 15, 30)
    },
    {
        nome: 'Pedro Carvalho',
        email: 'pedrocarvalho@gmail.com',
        dataInscricao: new Date(2024, 4, 5, 17, 20),
        dataCheckIn: new Date(2024, 4, 7, 20, 0)
    },
    {
        nome: 'Carolina Martins',
        email: 'carolinamartins@gmail.com',
        dataInscricao: new Date(2024, 3, 30, 14, 0),
        dataCheckIn: null
    },
    {
        nome: 'Felipe Oliveira',
        email: 'felipeoliveira@gmail.com',
        dataInscricao: new Date(2024, 4, 12, 11, 10),
        dataCheckIn: new Date(2024, 4, 14, 16, 20)
    },
    {
        nome: 'Mariana Costa',
        email: 'marianacosta@gmail.com',
        dataInscricao: new Date(2024, 4, 22, 16, 40),
        dataCheckIn: null
    },
    {
        nome: 'Gustavo Pereira',
        email: 'gustavopereira@gmail.com',
        dataInscricao: new Date(2024, 4, 3, 8, 55),
        dataCheckIn: new Date(2024, 4, 1, 10, 30)
    }
]




const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)   

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
        <button
            data-email="${participante.email}"
            onclick="fazerCheckIn(event)"
        >
            Confirmar check-in
        </button>
        `
    }
        
    return `
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong> 
            <br>
            <small>
                ${participante.email}
            </small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
        `
}

const atualizarLista = (participantes) => {
    let output = ''
    // estrutura de repetição
    for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }

    // substituir informação do html
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    // esse event(submit) é o botao realizar incrição(evento pradrao de submit do form)
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)
 
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    // Verificar se o participante ja existe antes de adicionalo

    const participanteExiste = participantes.find(
        (p) => {
        return p.email == participante.email
    })

    /*Essa função pode ser escrita assim:
    const participanteExiste = partcipante.find(
        (p) => p.email == participante.email
    )
    */

    if(participanteExiste){
        alert('Participante ja cadastrado')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // Limapar o form
    // event.target == formulario (pq o event é o submit, e o target desse evento é o formulario, ou seja, event.target == form)
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}


const fazerCheckIn = (event) => {
    // confirmar se realmente quer fazer o check-in
    const mensagemConfirmacao = 'Tem certeza que quer fazer o check-in ?'
    
    if (confirm(mensagemConfirmacao) == false) {
        return
        // ao colocar somente o return  a função se interrompe e nao acontece nada
    }

    // encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    // atualizar o check-in do participante

    participante.dataCheckIn = new Date()

    // atualizar a lista de participantes

    atualizarLista(participantes) 
 }