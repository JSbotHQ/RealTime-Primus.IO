'use strict'

const Primus = require('primus')
const Emitter = require('primus-emitter')
const Rooms = require('primus-rooms')
let primus

module.exports = class PrimusController {

  constructor(http) {

    primus = new Primus(http)
    primus.use('emitter', Emitter)
    primus.use('rooms', Rooms)
  }

  /**
   * Initialize primus
   * @param http
   */
  init() {

    // On socket client connection
    primus.on('connection', (spark)=> {

      console.log(spark.id+' connected');

      //HANDLERS
      /**
       * send all online friends list to all connected socket
       */
      const getOnlineFriends = ()=> {

        // let data = Object.keys(primus.sockets.sockets)
        // primus.emit('allOnlineFriends', { data })
      }
      /**
       * Send a message to particular socket
       * @param data
       */
      const onMessageSubmit = (data)=> { primus.to(data.id).emit('message', data.message); }
      /**
       * Subscribe to join a room
       * @param room
       */
      const onSubscribe = (room)=> { spark.join(room); }
      /**
       * Unsubscribe to leave a room
       * @param room
       */
      const onUnSubscribe = (room)=> { spark.leave(room); }
      /**
       * Broadcast a message in room
       * @param data
       */
      const onBroadcastToRoom = (data)=> { spark.room(data.room).emit('message', data.message); }
      /**
       * Socket client disconnection
       */
      const onDisconnect = ()=> {
        console.log(spark.id+' disconnected');
        getOnlineFriends();
      }

      //LISTENERS
      getOnlineFriends()
      spark.on('messageSubmit', onMessageSubmit)
      spark.on('subscribe', onSubscribe)
      spark.on('unsubscribe', onUnSubscribe)
      spark.on('broadcast', onBroadcastToRoom)
      spark.on('disconnect', onDisconnect)
    });
  }

}