angular.module('app.zeus', [])

    /**
     * Zeus is the master god service, responsible for all communication
     * with Olympus. He handles all events emitted from Olympus, and
     * dispatches them to the correct god service.
     *
     */
	.service('zeus', function($window) {
        var socket = $window.io(), zeus;

        zeus = {
            gods: {
                hermes: {
                    events: []
                }
            },
            relay: function zeusHandle(event) {
                socket.emit('from-zeus', event);
                console.log('emitting some shiiiiiiit', event);
            }
        };

        socket.on('from-olympus', function(event) {
            dispatch(event);
        });

        /**
         * Dispatch events to the corresponding god service
         *
         * @param type The type of event encountered
         * @param data The data sent along with the event
         */
        function dispatch(event) {
            switch (event.type) {
                case 'message':
                    zeus.gods.hermes.events.push(event);
                    break;
                default:
                    console.log('Unknown event', event);
                    break;
            }
        }

        return zeus;
    });
