angular.module('app',
	[
        'ui.router',
		'app.zeus',
        'app.prometheus',
        'app.hermes'
	]
)

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '',
                views: {
                    "nav": { template: 'i am a sidenav' },
                    'main': { templateUrl: '/src/components/prometheus/prometheus.html' }
                }
            });

    })

    .constant('config', {
        hermesTimeout: 1000
    })

    .controller('AppCtrl', function($scope) {});
