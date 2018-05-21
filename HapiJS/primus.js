
const Emitter = require('primus-emitter')
const Rooms = require('primus-rooms')


module.exports = class PrimusCtrl {

    constructor(primus) {

        this.primus = primus
        primus.plugin('emitter', Emitter)
        primus.plugin('rooms', Rooms)
    }

    /**
     * Initialize primus
     * @param http
     */
    init() {

        /**
         * send all online friends list to all connected socket
         */
        const getOnlineFriends = ()=> {

            let data = Object.keys(this.primus.connections)
            this.primus.send('allOnlineFriends', { data })
        }

        /**
         * Socket client disconnection
         */
        const onDisconnect = (spark)=> {
            console.log(spark.id+' disconnected');
            getOnlineFriends();
        }

        this.primus.on('connection', (spark)=> {

            console.log(spark.id+' connected');

            //HANDLERS
            /**
             * Send a message to particular socket
             * @param data
             */
            const onMessageSubmit = (data)=> { this.primus.spark(data.id, spark.id).send('message', data.message); }
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
            const onBroadcastToRoom = (data)=> { this.primus.room(data.room).send('message', data.message); }

            //LISTENERS
            getOnlineFriends()
            spark.on('messageSubmit', onMessageSubmit)
            spark.on('join', onSubscribe)
            spark.on('leave', onUnSubscribe)
            spark.on('broadcast', onBroadcastToRoom)
        });
        this.primus.on('disconnection', onDisconnect)
    }
}