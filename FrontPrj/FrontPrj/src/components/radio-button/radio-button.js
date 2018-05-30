import angular from 'angular';

import '@components/radio-button/radio-button.css';

angular
    .module('app')
    .component('radioComponent', {
        template: require('@components/radio-button/radio-button.template.html'),
        bindings: { label: '@', model: '@', checked: '@' }
    })