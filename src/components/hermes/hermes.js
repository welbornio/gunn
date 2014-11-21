angular.module('app.hermes', [])

    .service('hermes', function(
        config, zeus
    ) {
        var queue = zeus.gods.hermes.events;

        /**
         * Process the queue of events
         */
        function process() {
            var event,
                message = '';

            while (event = queue.shift()) {
                message += event.data;
            }
            console.log(message);
        }


        /**
         * Hermes loop to process his message queue
         */
        (function loop() {
            if (queue.length > 0) process();
            setTimeout(loop, config.hermesTimeout);
        })();

    });