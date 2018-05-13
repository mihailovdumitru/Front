import angular from 'angular';

import './primary-button.css';

angular
    .module('app')
    .component('primaryButtonComponent', {
        template: require('@components/primary-button/primary-button-template.html'),
        bindings: { text: '@', width: '@', height: '@', color: '@', hover: '@' }
    })