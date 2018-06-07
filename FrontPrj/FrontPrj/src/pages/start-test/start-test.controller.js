import angular from 'angular';
import { debug } from 'util';

const CONTROLLER_NAME = 'StartTestController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$scope', '$location', '$route', 'createTestService', 'startTestService', 'entitiesService', ($scope, $location, $route, createTestService, startTestService, entitiesService) => {
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
            ctrl.dropdownTestsAll = [];
        }

        $scope.$watch('model.lectureID', function (newValue, oldValue) {
            if (newValue != null && newValue != oldValue) {
                var selectedLecture = ctrl.lectures.filter(lecture => lecture.lectureID == newValue)[0];
                var yearOfStudy = parseInt(selectedLecture.yearOfStudy);
                ctrl.dropDownStudyClasses = ctrl.studyClasses.filter
                    (studyClass => (parseInt(studyClass.name.toString().charAt(1)) == yearOfStudy));
                ctrl.dropDownTests = ctrl.dropdownTestsAll.filter(test => test.lectureID == newValue);
            }
        });

        ctrl.getTests = function () {
            startTestService.getTests().then(function (response) {
                if (response.data) {
                    ctrl.dropDownTests = [];
                    ctrl.tests = response.data;
                    for (var element of ctrl.tests) {
                        var test = element;
                        test.value = element.testID;
                        test.text = element.naming;
                        ctrl.dropdownTestsAll.push(test);
                    }
                    ctrl.dropdownTests = ctrl.dropdownTestsAll.slice();
                }
            });
        };

        ctrl.getTests();


        ctrl.getLectures = function () {
            startTestService.getLectures().then(function (response) {
                if (response.data) {
                    ctrl.dropDownLectures = [];
                    ctrl.lectures = response.data;
                    for (var element of ctrl.lectures) {
                        var lecture = element;
                        lecture.value = element.lectureID;
                        lecture.text = element.name;
                        ctrl.dropDownLectures.push(lecture);
                    }
                }
            });
        };


        ctrl.getLectures();

        ctrl.getStudyClasses = function () {
            entitiesService.getClasses().then(function (response) {
                if (response.data) {
                    ctrl.studyClasses = [];
                    ctrl.classes = response.data;
                    for (var element of ctrl.classes) {
                        var classObj = element;
                        classObj.value = element.classID;
                        classObj.text = element.name;
                        ctrl.studyClasses.push(classObj);
                    }
                }
            });
        };

        ctrl.getStudyClasses();


        ctrl.beginTest = function () {
            startTestService.generateHashCodes(ctrl.model.classID).then(function (response) {
                if (response.data) {
                    var generated = response.data;
                    if (generated == true) {
                        startTestService.generateFileWithHashCodes(ctrl.model.classID)
                            .then(function (response) {
                                if (response.data) {
                                    startTestService.downloadFile('Dima', response.data);
                                }
                            })
                    }
                }
            });
        };















        ctrl.save = function () {
            console.log(ctrl.model.question);
        }

        ctrl.addAnswer = function () {
            ctrl.model.answers.push({ content: "", correct: "" });
        }

        ctrl.addQuestion = function (question, answers, points) {
            ctrl.model.questions.push({ question: question, answers: answers, points: points });
            init();
        }

        ctrl.showPreview = function () {
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


