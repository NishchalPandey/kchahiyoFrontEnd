// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'directiveModules'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);}

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();}
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.posts', {
      url: '/posts/:catagory',
      views: {
        'tab-dash': {
          templateUrl: 'templates/cat-posts.html',
          controller: 'CatPostCtrl'
        }
      }
    })
  .state('tab.post-detail', {
    url: '/post/:postId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('tab.myPosts', {
      url:'/myPosts',
      cache: false,
      views:{
        'tab-myPosts':{
          templateUrl:'templates/tab-myPosts.html',
          controller:'myPostsCtrl'
        }

      }
  })
  .state('tab.myPostDetail',{
    url:'/myPosts/:id',
    views: {
      'tab-myPosts':{
        templateUrl:'/templates/tab-setting.html',
        controller: 'myPostDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-setting': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.insertPost',{
    url:'/insertPost',
    views: {
      'tab-insertPost': {
        templateUrl: 'templates/add-post.html',
        controller: 'AddPostCtrl'
      }
    }
  });
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
