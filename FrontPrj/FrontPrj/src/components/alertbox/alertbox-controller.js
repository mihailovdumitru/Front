import angular from 'angular';

const CONTROLLER_NAME = 'notifications-controller';

angular
    .module('login')
    .controller(CONTROLLER_NAME, ['$scope', '$element', '$attrs', '$timeout', '$window', ($scope, $element, $attrs, $timeout, $window) => {
        $scope.errorMessage = " ";

        var alertbox = angular.element(document.querySelector('notification'));
        var image = angular.element(document.querySelector('#cross-delete'));

        $scope.$onInit = function() {
            $scope.setErrorMessage(errorMessage);
        }
        $scope.setErrorMessage = function(msg) {
            var msg = $scope.errorMessage;
       };

        image.on('click', function() {
            alertbox.attr('hidden', 'true');
        });
    }]);

module.exports = CONTROLLER_NAME;