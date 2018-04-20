'use strict'

const Service = require('trails/service')
const Emitter = require('primus-emitter')
const Rooms = require('primus-rooms')

/**
 * @module PrimusService
 * @description primius service
 */
module.exports = class PrimusService extends Service {

  init() {

    // add emitter to Primus
    this.app.sockets.use('emitter', Emitter);
    // add rooms to Primus
    this.app.sockets.use('rooms', Rooms);

    this.app.sockets.on('connection', (spark)=> {

      console.log(spark.id+' connected');

      //HANDLERS
      /**
       * send all online friends list to all connected socket
       */
      const getOnlineFriends = ()=> {

        // let data = Object.keys(this.app.sockets.sockets.sockets)
        // this.app.sockets.emit('allOnlineFriends', { data })
      }
      /**
       * Send a message to particular socket
       * @param data
       */
      const onMessageSubmit = (data)=> { this.app.sockets.to(data.id).send('message', data.message); }
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
      const onBroadcastToRoom = (data)=> { this.app.sockets.room(data.room).send('message', data.message); }
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

