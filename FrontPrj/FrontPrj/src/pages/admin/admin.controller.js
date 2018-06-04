import angular from 'angular';
import { debug } from 'util';

const CONTROLLER_NAME = 'AdminController';

angular
    .module('app')
    .controller(CONTROLLER_NAME, ['$window','$scope', '$location', '$route', 'createTestService', 'entitiesService', ($window, $scope, $location, $route, createTestService, entitiesService) => {
        var ctrl = $scope;
        ctrl.model = [];
        ctrl.response = "";
        ctrl.classes = {};
        ctrl.students = {};
        ctrl.lectures = {};
        ctrl.dropDownClasses = [];
        ctrl.dropDownStudents = [];
        ctrl.dropDownStudentsAll = [];
        ctrl.dropDownTeachers = [];
        ctrl.person = {};
        ctrl.person.lectures = [];
        ctrl.teachers = {};

        ctrl.dropDownLectures = [];

        var test = {};
        ctrl.radio = {};
        ctrl.radio.selectedRadio = "Teachers";
        ctrl.studyYears = [ { value: 1, text: "1" },
                            { value: 2, text: "2" },
                            { value: 3, text: "3" },
                            { value: 4, text: "4" }];


        init();

        function init() { 
            ctrl.lecture = {};
            ctrl.lecture.name = "";
            ctrl.lecture.yearOfStudy = "";
            ctrl.person = {};
            ctrl.dropDownTeachers = [];

            ctrl.class = {};
        }

        $scope.$watch('person.classID', function (newValue, oldValue) {
            if (newValue != null && newValue != oldValue) {
                ctrl.dropDownStudents = ctrl.dropDownStudentsAll.filter
                    (student => (student.classID.toString() == newValue.toString()));
            }
        });
    
         $scope.$watch('person.studentID', function (newValue, oldValue) {
             if (newValue != null && newValue != oldValue) {
                 var personObj = ctrl.dropDownStudentsAll.filter
                     (student => (student.studentID.toString() == newValue.toString()))[0];
                 ctrl.person.firstName = personObj.firstName;
                 ctrl.person.lastName = personObj.lastName;
                 ctrl.person.email = personObj.email;
            }
        });

        $scope.$watch('person.teacherID', function (newValue, oldValue) {
            if (newValue != null && newValue != oldValue) {
                var teacherObj = ctrl.teachers.filter
                    (teacher => (teacher.teacherID.toString() == newValue.toString()))[0];
                ctrl.person.firstName = teacherObj.firstName;
                ctrl.person.lastName = teacherObj.lastName;
                ctrl.person.email = teacherObj.email;
                ctrl.person.lectures = teacherObj.lectures;
                //console.log(ctrl.person.lectures);
            }
        });

        $scope.$watch('radio.selectedRadio', function (newValue, oldValue) {
            if (newValue != null && newValue != oldValue) {
                ctrl.refresh();
            }
        });

        $scope.$watch('lecture.lectureID', function (newValue, oldValue) {
            if (newValue != null && newValue != oldValue) {
                console.log(ctrl.dropDownLectures);
                var lectureObj = ctrl.dropDownLectures.filter
                    (lecture => (lecture.lectureID.toString() == newValue.toString()))[0];
                ctrl.lecture.name = lectureObj.name;
                ctrl.lecture.yearOfStudy = lectureObj.yearOfStudy;
            }
        });

        $scope.$watch('class.classID', function (newValue, oldValue) {
            if (newValue != null && newValue != oldValue) {
                var classObj = ctrl.dropDownClasses.filter
                    (classElem => (classElem.classID.toString() == newValue.toString()))[0];
                ctrl.class.name = classObj.name;
            }
        });

        ctrl.save = function (selectedRadio) {
            if (selectedRadio == 'Lectures') {
                if (ctrl.lecture.lectureID == null)
                    ctrl.insertLecture(ctrl.lecture);
                else 
                    entitiesService.updateLecture(ctrl.lecture, ctrl.lecture.lectureID);
            }
            else if (selectedRadio == 'Classes') {
                if (ctrl.class.classID == null) 
                    entitiesService.insertClass(ctrl.class);
                else 
                    entitiesService.updateClass(ctrl.class, ctrl.class.classID);
            }
            else if (selectedRadio == 'Students') {
                if (ctrl.person.studentID == null) 
                    entitiesService.insertStudent(ctrl.person);
                else 
                     entitiesService.updateStudent(ctrl.person, ctrl.person.studentID);
            }
            else if (selectedRadio == 'Teachers') {
                if (ctrl.person.teacherID == null) {
                    entitiesService.insertTeacher(ctrl.person);
                }
                else {
                    entitiesService.updateTeacher(ctrl.person, ctrl.person.teacherID);
                    //$window.location.reload();
                }
            }
        };

        ctrl.getTeachers = function () {
            entitiesService.getTeachers().then(function (response) {
                if (response.data) {
                    ctrl.dropDownTeachers = [];
                    ctrl.teachers = response.data;
                    for (var element of ctrl.teachers) {
                        var teachers = element;
                        teachers.value = element.teacherID;
                        teachers.text = element.lastName + ' ' + element.firstName;
                        ctrl.dropDownTeachers.push(teachers);
                    }
                    //console.log(ctrl.dropDownTeachers);
                }
            });
        };

        ctrl.getTeachers();

        ctrl.getLectures = function () {
            entitiesService.getLectures().then(function (response) {
                if (response.data) {
                    ctrl.dropDownLectures = [];
                    ctrl.lectures = response.data;
                    for (var element of ctrl.lectures) {
                        var lecture = element;
                        lecture.value = element.lectureID;
                        lecture.text = element.name;
                        ctrl.dropDownLectures.push(lecture);
                    }
                    //console.log(ctrl.dropDownLectures);
                }
            });
        };


        ctrl.getLectures();

        ctrl.getStudyClasses = function () {
            entitiesService.getClasses().then(function (response) {
                if (response.data) {
                    ctrl.dropDownClasses = [];
                    ctrl.classes = response.data;
                    for (var element of ctrl.classes) {
                        var classObj = element;
                        classObj.value = element.classID;
                        classObj.text = element.name;
                        ctrl.dropDownClasses.push(classObj);
                    }
                }
            });
        };

        ctrl.getStudyClasses();

        ctrl.getStudents = function () {
            entitiesService.getStudents().then(function (response) {
                if (response.data) {
                    ctrl.dropDownStudentsAll = [];
                    ctrl.students = response.data;
                    for (var element of ctrl.students) {
                        var student = element;
                        student.value = element.studentID;
                        student.text = element.lastName + ' ' + element.firstName;
                        ctrl.dropDownStudentsAll.push(student);
                    }
                    ctrl.dropDownStudents = ctrl.dropDownStudentsAll.slice();
                }
            });
        }

        ctrl.getStudents();

        ctrl.add = function (selectedRadio) {
            if (selectedRadio == 'Lectures') {
                ctrl.insertLecture(ctrl.lecture);
            }
            else if (selectedRadio == 'Classes') {
                ctrl.insertClass(ctrl.class);
            }
            else if (selectedRadio == 'Students') {
                ctrl.insertStudent(ctrl.person);
            }
            else if (selectedRadio == 'Teachers') {
                console.log(ctrl.person);
                ctrl.insertTeacher(ctrl.person);
            }
        }

        ctrl.insertTeacher = function (teacher) {
            entitiesService.insertTeacher(teacher);
        }

        ctrl.insertStudent = function (student) {
            entitiesService.insertStudent(student);
        }

        ctrl.insertClass = function (studyClass) {
            entitiesService.insertClass(studyClass);
        }


        ctrl.insertLecture = function (lecture) {
            entitiesService.insertLecture(lecture);
        }

        ctrl.deleteElement = function (selectedRadio) {
            console.log(ctrl.classes.dropDownElem);
        };

        ctrl.cancel = function () {
            $route.reload();
        }

        ctrl.refresh = function () {
            init();
            ctrl.getStudents();
            ctrl.getStudyClasses();
            ctrl.getLectures();
            ctrl.getTeachers();
        }

        ctrl.new = function () {
            init();
        }

        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }


    }]);

module.exports = CONTROLLER_NAME;


