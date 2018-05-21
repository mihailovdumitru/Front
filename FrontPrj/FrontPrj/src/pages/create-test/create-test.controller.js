import angular from 'angular';

const CONTROLLER_NAME = 'CreateTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', 'createTestService', ($scope, $location, createTestService) => {
        var ctrl = $scope;

        init();

        function init() {
            ctrl.model = [];
            ctrl.model.question = "";
            ctrl.model.answers = [];
        }

        ctrl.save = function () {
            console.log(ctrl.model.question);
        }

        ctrl.addAnswer = function () {
            ctrl.model.answers.push({ content: "" });
            console.log(ctrl.model.answers);
        }

        $scope.showPopup = function () {
            angular.element(document.querySelector('.popup'))[0].style.display = "block";
        }

        createTestService.getUserInfoForUserId();


    }]);

module.exports = CONTROLLER_NAME;


