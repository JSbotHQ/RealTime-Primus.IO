# RealTime-Primus.IO

### 3. TrailsJS
  - `cd TrailsJS`
  - start the server by `npm start`.

  #### i. peer to peer messaging
   - go to `http://localhost:4004/chat`.
   - you can send message by clicking on any online client from right panel.

  ##### client code logic:

        primus.send('messageSend', 'message');

        primus.on('message', (msg)=> {
          console.log(msg
        });

  ##### server code logic:

        // send to a specific spark
        primus.spark(id).send('message', 'message');

        spark.on('messageSend', function(data){
           console.log(data)
        });

  #### ii. room messaging
   - go to `http://localhost:4004/group?room={name}`.
   - here you can enter any room name of your choice.
   - now send message to this room and it will be received by all clients in the channel.

   ##### client code logic:

        socket.emit('subscribe', room)

        socket.emit('broadcast', { room: room, message: message })

   ##### server code logic:

       socket.on('subscribe', function(room) {
           socket.join(room)
       })

      socket.on('broadcast', function(data) {
          socket.to(data.room).emit('message', data.message);
      });
