import angular from 'angular';

import '@components/input/input.css';

angular
    .module('app')
    .component('inputComponent', {
        template: require('@components/input/input-template.html'),
        bindings: { label: '@', width: '@', type: '@', disable:'@', model: '=' }
    })