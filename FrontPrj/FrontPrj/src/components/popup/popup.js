import angular from 'angular';
import '@components/popup/popup.css';

const CONTROLLER_NAME = require('@components/popup/popup-controller.js');

angular
    .module('app')
    .component('popupComponent', {
        controller: CONTROLLER_NAME,
        template: require('@components/popup/popup-template.html')
    })
