angular.module('utils', [])

    .service('_', function($window) {
        var service = angular.copy($window._);
        delete $window._;
        return service;
    });