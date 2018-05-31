import angular from 'angular';

const CONTROLLER_NAME = 'CreateTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'createTestService', 'entitiesService', ($scope, $location, $route, createTestService, entitiesService) => {
        var ctrl = $scope;
        ctrl.model = [];
        ctrl.model.questions = [];
        ctrl.showQuestion = true;
        ctrl.model.testNaming = "";
        ctrl.response = "";


        var test = {};

        ctrl.dropdownData = [{ value: 1, text: "Ddddddddddddddddddddima" }, { value: 2, text: "Jaddddddddddddddddnea" }, { value: 3, text: "Emilddddddddddddddddddddddddddd" }];

        ctrl.selectedRadio = "Teachers";
        ctrl.studyYears = [{ value: 1, text: "1" }, { value: 2, text: "2" }, { value: 3, text: "3" }, { value: 4, text: "4" }];


        init();

        function init() { 
            ctrl.model.question = "";
            ctrl.model.points = 0;
            ctrl.model.answers = [];
            ctrl.model.answers.push({ content: "", correct: false });
            ctrl.model.lecture = "PSBD";
            ctrl.lecture = {};
            ctrl.lecture.name = "";
            ctrl.lecture.yearOfStudy = "";
            ctrl.class = {};
            ctrl.class.name = "";
            ctrl.classes = {};
        }

        ctrl.getSchemesDetails = function () {
            entitiesService.getClasses().then(function (response) {
                if (response.data) {
                    ctrl.classes = response.data;
                }
            });
        };


        ctrl.getSchemesDetails();

        ctrl.click = function () {

        }

        ctrl.save = function () {
            console.log(ctrl.model.question);
        }

        ctrl.addAnswer = function () {
            ctrl.model.answers.push({ content: "", correct: false });
            createTestService.getValues().then(function (values) {
                ctrl.response = values.data;
            });
        }

        ctrl.addQuestion = function (question, answers, points) {
            var questionObj = { content: question, points: points};
            ctrl.model.questions.push({ question: questionObj, answers: answers});
            init();  
            //console.log(ctrl.response);
        }

        ctrl.add = function (selectedRadio) {
            if (selectedRadio == 'Lectures') {
                ctrl.insertLecture(ctrl.lecture);
            }
            else if (selectedRadio == 'Classes') {
                ctrl.insertClass(ctrl.class);
            }

            console.log(selectedRadio);
        }

        ctrl.insertClass = function (studyClass) {
            entitiesService.insertClass(studyClass);
        }


        ctrl.insertLecture = function (lecture) {
            entitiesService.insertLecture(lecture);
        }

        ctrl.showPreview = function() {
            ctrl.showQuestion = false;
            //console.log(ctrl.model.questions);
            console.log(ctrl.model);
        }

        ctrl.saveAndSubmit = function () {
            test.naming = ctrl.model.testNaming;
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


