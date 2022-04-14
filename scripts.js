let myUserName;
defineUser()
setInterval(keepConected, 5000)

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
}

function getMsgs() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    console.log(promise)
    promise.then(rendMsgs)
}

getMsgs()

function rendMsgs(mensagens) {
    console.log(mensagens);
    const msgs = document.querySelector(".msgs_scroll");
    for (let i=0; i<mensagens.data.length; i++) {
    msgs.innerHTML += `<div class="msg msg_${mensagens.data[i].type}">
    <time>(${mensagens.data[i].time}) </time> <span>${mensagens.data[i].from} </span> para <span>${mensagens.data[i].to}: </span>  ${mensagens.data[i].text}
</div>`}
}