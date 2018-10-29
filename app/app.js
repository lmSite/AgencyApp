var app = angular.module("lmApp", ["ngAnimate", "ngSanitize","ui.bootstrap","ngRoute"]);

app.run(function($rootScope) { 
    $rootScope.isNavBAr=false;
    $rootScope.assetId=0;
    $rootScope.assetUpdate=null;
});

const jsonSrvUrl="https://json-server-heroku-jukpdzawez.now.sh";

let activeAsset={};


app.config(function($routeProvider) {
   $routeProvider
    .when("/", {
        templateUrl : "app/home/home.html",
        controller : "homeCtrl",
        caseInsensitiveMatch: true
    })
    // .when("/about", {
    //     templateUrl : "app/about/about.html",
    //     controller : "" ,
    //     caseInsensitiveMatch: true
    // })
    .when("/contact", {
        templateUrl : "app/contact/contact.html",
        controller : "contactCtrl" ,
        caseInsensitiveMatch: true
    })
    .when("/signup", {
        templateUrl : "app/signup/signup.html",
        controller : "signupCtrl",
        caseInsensitiveMatch: true 
    })
    .when("/login", {
        templateUrl : "app/login/login.html",
        controller : "loginCtrl",
        caseInsensitiveMatch: true  
    })
    .when("/admin", {
        templateUrl : "app/admin/admin.html",
        controller : "adminCtrl" , 
        caseInsensitiveMatch: true 
    })
    .when("/assets", {
        templateUrl : "app/assets/assetsClient.html",
        controller : "assetsClientCtrl",
        caseInsensitiveMatch: true  
    })
    .when('/assets/:assetId', {
        templateUrl: 'app/assets/assetDetailsClient.html',
        controller: 'assetDetailsCtrl',
        caseInsensitiveMatch: true  
      }) 
    // .when("/agencies", {
    //     templateUrl : "app/agency/agency.html",
    //     controller : "agencyCtrl",
    //     caseInsensitiveMatch: true  
    // }) 
    .otherwise({
        template : "<h1>404</h1><p>sorry ... a problem is occured</p>"
    });
});

