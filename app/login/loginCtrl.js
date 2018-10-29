app.controller('loginCtrl', function ($scope, userSrv, $location, $rootScope) {
   
    $rootScope.isNavBAr = false;
    $scope.isclicked = false;
    $scope.invalidLogin = false;

    //user
    //$scope.email="myplace@myplace.com";//TODO:remove for production
    // $scope.password="123";//TODO:remove for production

    $scope.email="dor@dor.com";//TODO:remove for production
    $scope.password="444";//TODO:remove for production

    //   $scope.login(); //TODO:remove for production

    $scope.login = function ()
     {
        $scope.invalidLogin = false;

        // activeUser => the result of = userSrv.login($scope.email, $scope.password)
        userSrv.login($scope.email, $scope.password).then(function (activeUser) {
            sessionStorage.activeTab = 1;
            $location.path("/admin");
        }, function () {
            $scope.invalidLogin = true;
        })
    }

});
