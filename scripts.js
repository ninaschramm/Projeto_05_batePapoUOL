let myUserName;
defineUser()

function defineUser () {
    myUserName = prompt("Bem vindo! Qual seu nome?")
    userName = {
        name: myUserName
    }
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName)

    //promise.then(setInterval(keepConected, 5000))
}

// function keepConected() {
//     let promise2 = axios.post("https://mock-api.driven.com.br/api/v6/uol/status"), userName)
//     promise2.catch(function {
//         alert("Você está desconectado")
//     })
// }

function getMsgs() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    console.log(promise)
    promise.then(rendMsgs)
}

function rendMsgs() {
    console.log(promise)
}