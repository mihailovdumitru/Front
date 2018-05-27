import angular from 'angular';

const CONTROLLER_NAME = 'CreateTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location','$route', 'createTestService', ($scope, $location,$route, createTestService) => {
        var ctrl = $scope;
        ctrl.model = [];
        ctrl.model.questions = [];
        ctrl.showQuestion = true;
        ctrl.response = "";
        var test = {};

        init();

        function init() { 
            ctrl.model.question = "";
            ctrl.model.points = 0;
            ctrl.model.answers = [];
            ctrl.model.answers.push({ content: "", correct: "" });
            ctrl.model.lecture = "PSBD";
        }

        ctrl.save = function () {
            console.log(ctrl.model.question);
        }

        ctrl.addAnswer = function () {
            ctrl.model.answers.push({ content: "", correct: "" });
            createTestService.getValues().then(function (values) {
                ctrl.response = values.data;
            });
        }

        ctrl.addQuestion = function (question, answers, points) {
            var questionObj = { content: question, points: points };
            ctrl.model.questions.push({ question: questionObj, answers: answers});
            init();  
            //console.log(ctrl.response);
        }

        ctrl.showPreview = function() {
            ctrl.showQuestion = false;
            //console.log(ctrl.model.questions);
            console.log(ctrl.model);
        }

        ctrl.saveAndSubmit = function () {
            test.lecture = ctrl.model.lecture;
            test.questions = ctrl.model.questions;
            createTestService.insertTest(test);
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


