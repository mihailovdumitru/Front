import angular from 'angular';

const CONTROLLER_NAME = 'StartTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location','$route', 'createTestService', ($scope, $location,$route, createTestService) => {
        var ctrl = $scope;
        ctrl.model = [];
        ctrl.model.questions = [];
        ctrl.showQuestion = true;

        init();

        function init() { 
            ctrl.model.question = "";
            ctrl.model.points = 0;
            ctrl.model.answers = [];
            ctrl.model.answers.push({ content: "", correct: "" });
            ctrl.model.hashcodes = "";
        }

        ctrl.save = function () {
            console.log(ctrl.model.question);
        }

        ctrl.addAnswer = function () {
            ctrl.model.answers.push({ content: "", correct: ""});
        }

        ctrl.addQuestion = function(question, answers, points) {
            ctrl.model.questions.push({ question: question, answers: answers, points:points });
            init();  
        }

        ctrl.showPreview = function() {
            ctrl.showQuestion = false;
            console.log(ctrl.model.questions);
        }

        ctrl.saveAndSubmit = function () {
            console.log(ctrl.model);
        }

        ctrl.cancel = function () {
            $route.reload();
        }

        $scope.showPopup = function () {
            angular.element(document.querySelector('.popup'))[0].style.display = "block";
        }

        createTestService.getUserInfoForUserId();


    }]);

module.exports = CONTROLLER_NAME;


