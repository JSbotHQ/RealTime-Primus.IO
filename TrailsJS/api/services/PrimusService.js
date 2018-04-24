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

    /**
     * send all online friends list to all connected socket
     */
    const getOnlineFriends = ()=> {

      let data = Object.keys(this.app.sockets.connections)
      this.app.sockets.send('allOnlineFriends', { data })
    }

    /**
     * Socket client disconnection
     */
    const onDisconnect = (spark)=> {
      console.log(spark.id+' disconnected');
      getOnlineFriends();
    }

    this.app.sockets.on('connection', (spark)=> {

      console.log(spark.id+' connected');

      //HANDLERS
      /**
       * Send a message to particular socket
       * @param data
       */
      const onMessageSubmit = (data)=> { this.app.sockets.spark(data.id, spark.id).send('message', data.message); }
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

      //LISTENERS
      getOnlineFriends()
      spark.on('messageSubmit', onMessageSubmit)
      spark.on('join', onSubscribe)
      spark.on('leave', onUnSubscribe)
      spark.on('broadcast', onBroadcastToRoom)
    });
    this.app.sockets.on('disconnection', onDisconnect)
  }
}

