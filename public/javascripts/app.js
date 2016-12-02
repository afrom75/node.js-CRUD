var socket = io() // On se connecte au socket du serveur pour avoir les informations en temps réel

// Si le socket nous informe qu'il y a une notification qui se nomme UserState, il executera le callback.
socket.on('UserState', function (data) {
    // nous insérons dans la span la valeur envoyée par le socket
    $('.connected-number').text(data);
});

var SendMessage = document.getElementById('SendMessage');


if (SendMessage){
    var inputMessage = document.getElementById('inputMessage');
    SendMessage.addEventListener('click', function(event){
        event.preventDefault();
        if(inputMessage.value){
            socket.emit('message', inputMessage.value);
        }

    });
    socket.on('messageServer', function (data){
        var messages = document.getElementById('messages');
        var li = document.createElement('li');
        li.innerHTML = data;
        messages.appendChild(li);
    });
    socket.once('messageInit', function (datas) {
        var messages = document.getElementById('messages');
        datas.forEach(function (data) {
            var li = document.createElement('li');
            li.innerHTML = data;
            messages.appendChild(li);
        })
    })
}