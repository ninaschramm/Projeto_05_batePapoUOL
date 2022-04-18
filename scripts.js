let myUserName;
defineUser()
const conectedInterval = setInterval(keepConected, 5000);

function defineUser () {
    myUserName = prompt("Bem vindo! Qual seu nome?")
    userName = {
        name: myUserName
    }
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName)
    promise.catch(userNameError)
    promise.then(processarResposta);}

    function processarResposta(resposta) {
        console.log("Voltou a resposta"); // Esse console.log disparará depois
    }

function userNameError(error) {
    const statusCode = error.response.status;
    if (statusCode === 400) {
        myUserName = alert("Este nome já está em uso!")
    }
    defineUser()
}

function keepConected() {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userName)
    promise.catch(alertDesconectado)
}

function alertDesconectado() {
    alert("Você está desconectado")
    clearInterval(conectedInterval);
    clearInterval(getPInterval);
}

const scroll = document.querySelector(".msgs_scroll")

function getMsgs() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    console.log(promise)
    promise.then(rendMsgs)
}

function scrollToBottom() {
    const element = document.querySelector(".msgs_scroll");
    element.scrollIntoView(false);
  }

let getInterval = setInterval(getMsgs, 3000)


function rendMsgs(mensagens) {
    console.log(mensagens);
    const msgs = document.querySelector(".msgs_scroll");
    msgs.innerHTML = "";
    for (let i=0; i<mensagens.data.length; i++) {
        if (mensagens.data[i].type === "private_message" && (mensagens.data[i].from === myUserName || mensagens.data[i].to === myUserName || mensagens.data[i].to === "Todos"))
         {msgs.innerHTML += `<div class="msg msg_${mensagens.data[i].type}">
        <time>(${mensagens.data[i].time}) </time> <span>${mensagens.data[i].from} </span> reservadamente para <span>${mensagens.data[i].to}: </span>  ${mensagens.data[i].text}
    </div>`}
    else if (mensagens.data[i].type === "private_message") {
        msgs.innerHTML += "";
    }
    else {
    msgs.innerHTML += `<div class="msg msg_${mensagens.data[i].type}">
    <time>(${mensagens.data[i].time}) </time> <span>${mensagens.data[i].from} </span> para <span>${mensagens.data[i].to}: </span>  ${mensagens.data[i].text}
</div>`}}
    scrollToBottom()
    }

let destinatario;
let msgDigitada;
let destSelected = false;
let privateMsg = false;

function sendMsg() {
    if (destSelected = false) {
        destinatario = "Todos"
    }
    msgDigitada = document.getElementById("textInput").value;
    let mensagem = {
        from: myUserName,
        to: destinatario,
        text: msgDigitada,
        type: "message" // ou "private_message" para o bônus
    }
    if (privateMsg = true) {mensagem.type = "private_message"}
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)

    promise.then(getMsgs);
    promise.catch(f5);
    document.getElementById("textInput").value = "";
    destSelected = false;
    privateMsg = false;
    document.querySelector(".enviando").innerHTML = "";
}

function f5() {
    location.reload()
}

function viewParticipants() {
    const element = document.querySelector(".participants")
    element.classList.toggle("hidden")
    const pList = document.querySelector(".pList")
    pList.classList.toggle("sizeAdjust")
    getParticipants()}

    function getParticipants() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    promise.then(rendParticipants);
}

function rendParticipants(online) {
    const participantsOn = document.querySelector(".participant");
    participantsOn.innerHTML = `<div class="pOn" onclick="selDestin(this)"><ion-icon name="people"></ion-icon> <span> Todos </span></div>`
    for (let i=0; i<online.data.length; i++) {
    participantsOn.innerHTML += `<div class="pOn" onclick="selDestin(this)"> <ion-icon name="person-circle"></ion-icon> ${online.data[i].name}
</div>`}
}

function selDestin(user) {
    destinatario = user.innerText;
    destSelected = true;
    let elt = document.querySelector(".pOn.selected");
    if (elt !== null) {
        elt.classList.remove("selected");        
    }
    user.classList.add("selected")
    sending()
}

function selPriv(priv) {
    let elt = document.querySelector(".privacidade .selected");
    if (elt !== null) {
        elt.classList.remove("selected");        
    }
    priv.classList.add("selected")
    if (elt.innerText === " Reservadamente") {
        privateMsg = true;
    }
}

function sending() {
    if (destSelected = true) {
        if (privateMsg = true) {document.querySelector(".enviando").innerHTML = `Enviando para ${destinatario} (reservadamente)`}
       else {document.querySelector(".enviando").innerHTML = `Enviando para ${destinatario}`}
    }
}

const sendButton = document.getElementById("textInput")
sendButton.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".icon_send").click();
}
});