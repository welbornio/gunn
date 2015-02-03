angular.module('app.prometheus', [])

    .service('prometheus', function() {
        var service = {};

        return service;
    })

    .directive('prometheus', function(_) {
        return {
            restrict: 'E',
            template:"<pre contenteditable='true' class='prometheus'><span>hi</span></pre>",
            replace: true,
            controller: function($scope,
                zeus, hermes, prometheus
            ) {
                $scope.update = function update(data) {
                    zeus.relay({
                        type: 'write',
                        data: data
                    })
                };
            },
            link: function(scope, element, attrs) {
                element.bind('keydown', function(e) {
                    var keyCode = e.keyCode || e.which;
                    switch (keyCode) {
                        case 9:
                            e.preventDefault();
                            document.execCommand('styleWithCSS',true,null);
                            document.execCommand('indent', true, null);
                            break;
                    }
                });

                element.bind('keyup', _.debounce(function(e) {
                    var data = []
                        i = 0,
                        l = element[0].children.length;
                    console.log(element[0].children)
                    for (i; i < l; i++) {
                        console.log(element[0].children[i])
                        data.push(element[0].children[i].innerHTML);
                    }
                    scope.update(data);
                }, 750));
            }
        };
    });
