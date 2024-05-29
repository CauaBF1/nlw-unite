# JavaScript 
~~~js
const participante = {
    nome: 'Cauã Borges',
    email: 'cauabfaria@gmail.com',
    dataInscricao: new Date(2024, 4, 28, 18, 15),
    dataCheckIn: new Date(2024, 4, 25, 22, 0)
}

let participantes = [
    {
        nome: 'Cauã Borges',
        email: 'cauabfaria@gmail.com',
        dataInscricao: new Date(2024, 4, 28, 18, 15),
        dataCheckIn: new Date(2024, 4, 25, 22, 0)
    }
]


// Estrutura de repetição
for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
}

para cada participante(objeto) no array participantes o meu declarado anteriormente como vazio output vai somar uma nova estrutura

ESTRUTURA:
const criarNovoParticipante = (participante) => {
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
    <td>${participante.dataInscricao}</td>
    <td>${participante.dataCheckIn}</td>
</tr>
    `
}

~~~



# Adicionar participante em um array

criei uma variavel para receber o participante com os dados do input

~~~js
const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }
~~~

depois disso adicionei esse objeto chamado participante dentro do array participantes
~~~js
    participantes = [participante, ...participantes]
    atualizarLista(participantes)
~~~
esse ... significa spread eu estou espalhando todo o resto do array depois de ter adicionado esse participante



# Utilização do botao confirmar check-in

### Criação do botão check-in 
Primeiro é criado o botão check-in caso o dataCheckIn seja == null e vai ser null sempre que o participante for adicionado pelo form{na função adicionarParticipante o participante(objeto) é criado seguindo os padrões nome, email, data de incrição = newDate() e a data de check-in como nula}

o botão foi criado: 

~~~js
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
~~~

### Função do botão
agora com o botão criado a função fazerCheckIn(event) deve ser criada
~~~js
const fazerCheckIn = (event) => {
    // encontrar o participante dentro da lista
    // criei uma variavel participante que recebe a função de achar dentro do array(participantes) um p.email que vai ser igual o email que eu defini no obj participante ao crialo pelo form
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    // atualizar o check-in do participante

    participante.dataCheckIn = new Date()

    // atualizar a lista de participantes

    atualizarLista(participantes) 
 }
~~~


# Não repetir mesmo email 

Para não ocorrer a repetição do mesmo email foi criada uma variavel que recebe o email do input e a compara com todos os emails ja presentes no array caso tenha algum igual ela alerta e caso não tenha ela prossegue com a incrição

Para isso dentro da função adicionarParticipante

~~~js
// Foi criada a variavael participanteExiste que recebe TRUE ou FALSE caso o p.email seja igual ao email de algum participante(obj dentro do array participantes) 

const participanteExiste = participantes.find(
    (p) => p.email == participante.email
)

// caso participanteExiste = TRUE alerta algo caso FALSE continua com a inscrição para isso:

if(participanteExiste){
    alert('Participante ja cadastrado')
    return
    esse return faz com que a função pare ai e não continue
    
}
~~~

