module.exports = function(io) {
    var history = [];
    io.on('connection', function (socket) {
        socket.emit('messageInit', history);
        // On envoie le nombre de personnes actuellement sur le socket à tout le monde (sauf la personne qui vient de se connecter)
        socket.broadcast.emit('UserState', io.engine.clientsCount);
        // On envoie le nombre de personnes actuellement sur le socket à la personne qui vient de se connecter
        socket.emit('UserState', io.engine.clientsCount);

        socket.on('disconnect', function () {
            // On prévient tout le monde qu'une personne s'est deconnectée
            socket.broadcast.emit('UserState', io.engine.clientsCount);
        });
        //Execute la fonction à l'apelle d'un signal message
        socket.on('message', function (data) {
            if(history.length > 10){
                //Enlève le premier élement
                history.shift()
            }
            history.push(data);
            //tout le monde sauf celui qui as la connexion
            socket.broadcast.emit('messageServer', data);
            //L'envoyer à la personne connectée
            socket.emit('messageServer',data);
        })
    });
};