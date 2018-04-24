# RealTime-Primus.IO

#1. ExpressJS
  - `cd ExpressJS`
  - start the server by `npm start`.

  i. peer to peer messaging
   - go to `http://localhost:3000/chat`.
   - you can send message by clicking on any online client from right panel.

  client code logic:

        $('form').submit(()=>{
          let id = $('#id').val()
          let message = $('#m').val()
          $('#messages').append($('<li>').text(message));
          primus.send('messageSubmit', { id, message });
          $('#m').val('');
          return false;
        });

        primus.on('message', (msg)=> {
          $('#messages').append($('<li>').text(msg));
        });

  server code logic:

        spark.on('messageSubmit', function(data){
           primus.spark(data.id, spark.id).send('message', data.message);
        });

  ii. room messaging
   - go to `http://localhost:3000/group?room={name}`.
   - here you can enter any room name of your choice.
   - now send message to this room and it will be received by all clients in the channel.

   client code logic:

        primus.send('join', room)

        primus.send('broadcast', { room: room, message: message });

   server code logic:

       spark.on('join', function(room) {
          spark.join(room);
       })

      spark.on('broadcast', function(data) {
          primus.room(data.room).send('message', data.message);
      });

#2. TrailsJS
  - `cd TrailsJS`
  - start the server by `npm start`.

  i. peer to peer messaging
   - go to `http://localhost:3000/chat`.
   - you can send message by clicking on any online client from right panel.

  client code logic:

        $('form').submit(()=>{
          let id = $('#id').val()
          let message = $('#m').val()
          $('#messages').append($('<li>').text(message));
          primus.send('messageSubmit', { id, message });
          $('#m').val('');
          return false;
        });

        primus.on('message', (msg)=> {
          $('#messages').append($('<li>').text(msg));
        });

  server code logic:

        spark.on('messageSubmit', function(data){
           primus.spark(data.id, spark.id).send('message', data.message);
        });

  ii. room messaging
   - go to `http://localhost:3000/group?room={name}`.
   - here you can enter any room name of your choice.
   - now send message to this room and it will be received by all clients in the channel.

   client code logic:

        socket.emit('subscribe', room)

        socket.emit('broadcast', { room: room, message: message })

   server code logic:

       socket.on('subscribe', function(room) {
           socket.join(room)
       })

      socket.on('broadcast', function(data) {
          socket.to(data.room).emit('message', data.message);
      });

#3. HapiJS
  - `cd HapiJS`
  - start the server by `npm start`.

  i. peer to peer messaging
   - go to `http://localhost:3000/chat`.
   - you can send message by clicking on any online client from right panel.

  client code logic:

        $('form').submit(function(){
            var id = $('#id').val()
            var message = $('#m').val()
            socket.emit('send', { id, message });
            $('#m').val('');
            return false;
        });

        socket.on('message', function(msg){
            $('#messages').append($('<li>').text(msg));
        });

  server code logic:

        socket.on('send', function(data){
            io.to(data.id).emit('message', data.message);
        });

  ii. room messaging
   - go to `http://localhost:3000/group?room={name}`.
   - here you can enter any room name of your choice.
   - now send message to this room and it will be received by all clients in the channel.

   client code logic:

        socket.emit('subscribe', room)

        socket.emit('broadcast', { room: room, message: message })

   server code logic:

       socket.on('subscribe', function(room) {
           socket.join(room)
       })

      socket.on('broadcast', function(data) {
          socket.to(data.room).emit('message', data.message);
      });
