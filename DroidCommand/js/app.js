angular.module('driodCommand', ['ui.router', 'ui.slider'])
    .config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/odyssey');
        // ODYSSEY STATE ========================================
        $stateProvider.state('odyssey', {
            url: '/odyssey',
            views: {
                // the main template (relatively named)
                '': { templateUrl: 'views/main.html' },

                //the navigator
                'navColumn@odyssey': {
                    templateUrl: 'views/navigatorMainView.html',
                    controller: 'NavigatorController'
                },
                'OdysseyColumn@odyssey': {
                    templateUrl: 'views/OdysseyViews/Main_Odyssey.html'
                },
            }
        })

            .state('odyssey.bluetoothSelection', {
                url: '/bluetoothSelection',
                views: {
                    'OdysseyColumn@odyssey': {
                        templateUrl: 'views/OdysseyViews/Main_bluetoothSelection.html',
                    },
                    //the navigator
                    'navColumn@robotControl': {
                        templateUrl: 'views/navigatorMainView.html',
                        controller: 'NavigatorController'
                    },
                }
            })
        
        // ROBOTCONTROL STATE ========================================
            .state('robotControl', {
                url: '/robotControl',
                views: {
                    // the robotControl template (relatively named)
                    '': { templateUrl: 'views/robotControl.html' },
                    //the navigator
                    'navColumn@robotControl': {
                        templateUrl: 'views/navigatorMainView.html',
                        controller: 'NavigatorController'
                    },
                    'leftControlColumn@robotControl': {
                        templateUrl: 'views/robotControlViews/robotControl_JoystickControl.html'
                    },
                    'rightControlColumn@robotControl': {
                        templateUrl: 'views/robotControlViews/robotControl_RobotStatus.html',
                        controller: 'RobotStatusController'
                    }

                }
            })

            .state('robotControl.differentialControl', {
                url: '/differentialControl',
                views: {
                    'leftControlColumn@robotControl': {
                        templateUrl: 'views/robotControlViews/robotControl_DifferentialControlLeft.html',
                    },
                    'navColumn@robotControl': {
                    templateUrl: 'views/robotControlViews/robotControl_DifferentialControlRight.html',
                    }
                }
            })

            .state('robotControl.motionControl', {
                url: '/motionControl',
                views: {
                    'leftControlColumn@robotControl': {
                        templateUrl: 'views/robotControlViews/robotControl_MotionControl.html'
                    },
                    //the navigator
                    'navColumn@robotControl': {
                        templateUrl: 'views/navigatorMainView.html',
                        controller: 'NavigatorController'
                    },
                }
            })
            .state('robotControl.program', {
                url: '/program',
                views: {
                    'leftControlColumn@robotControl': {
                        templateUrl: 'views/robotControlViews/robotControl_ProgramRobot.html'
                    }
                }
            })
        // GAMES STATE ========================================
	        .state('games', {
	            url: '/games',
	            views: {
	                // the games template (relatively named)
	                '': { templateUrl: 'views/games.html' },
	                //the navigator
	                'navColumn@games': {
	                    templateUrl: 'views/navigatorMainView.html',
	                    controller: 'NavigatorController'
	                }
	            }
	        })
        // CENTRAL STATE ========================================
	        .state('central', {
	            url: '/central',
	            views: {
	                // the central template (relatively named)
	                '': { templateUrl: 'views/central.html' },
	                //the navigator
	                'navColumn@central': {
	                    templateUrl: 'views/navigatorMainView.html',
	                    controller: 'NavigatorController'
	                }
	            }
	        })

        // DROIDWARS STATE ========================================
            .state('droidWars', {
                url: '/droidWars',
                views: {
                    // the central template (relatively named)
                    '': { templateUrl: 'views/droidWars.html' },
                    //the navigator
                    'navColumn@droidWars': {
                        templateUrl: 'views/navigatorMainView.html',
                        controller: 'NavigatorController'
                    }
                }
            })

    });




function onLoad() {

    //angular.element(document).ready(function () {
    //    angular.bootstrap(document, ['driodCommand']);
    //});

    document.addEventListener('deviceready', function onDeviceReady() {
        angular.bootstrap(document, ['driodCommand']);
    }, false);
}