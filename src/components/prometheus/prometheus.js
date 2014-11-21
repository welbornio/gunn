angular.module('app.prometheus', [])

    .service('prometheus', function() {
        var service = {
            dom: {
                panels: [
                    {
                        id: 1,
                        img: 'http://imgc.allpostersimages.com/images/P-473-488-90/51/5130/BTKEG00Z/posters/marvel-comics-retro-mighty-thor-comic-panel-god-of-thunder-holding-hammer.jpg',
                        blurbs: [
                            {
                                pos: {x: 20, y: 40},
                                text: 'I am a blurb'
                            }
                        ]
                    }
                ]
            }
        };

        return service;
    })

    .directive('prometheus', function(
        zeus, hermes, prometheus
    ) {
        return {
            restrict: 'E',
            scope: true,
            controller: function($scope) {
                $scope.panels = prometheus.dom.panels;
            }
        };
    })

    .directive('blurb', function() {
        return {
            scope: {
                config: '='
            },
            restrict: 'E',
            template: "<div class='blurb' style='top: {{config.pos.y}}px; left: {{config.pos.x}}px;' ng-bind='config.text'></div>",
            replace: true
        };
    });
