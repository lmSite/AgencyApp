app.controller('signupCtrl', function ($scope, $rootScope, $location,  userSrv) {
    $rootScope.isNavBAr = false;

    $scope.createUser = function () {

        if ($scope.email != "" && $scope.password != "" && $scope.agency != "") {
            var newUser = userSrv.createUser({
                email: $scope.email, password: $scope.password,
                agency: $scope.agency, tel: $scope.tel, city: $scope.city,
                street: $scope.street, building: $scope.building,
                postal: $scope.postal, imgUrl: $scope.imgUrl
            });

            userSrv.signUp(newUser).then(function () {
                $location.path("/login")
            }, function (err) {
                console.log(err);
            })
        }
    }



    $scope.submitForm = function () {
        if ($scope.email != "" && $scope.password != "" && $scope.agency != "") {
            var newUser = userSrv.createUser({
                email: $scope.email, password: $scope.password,
                agency: $scope.agency, tel: $scope.tel, city: $scope.city,
                street: $scope.street, building: $scope.building,
                postal: $scope.postal, imgUrl: $scope.imgUrl
            });

            userSrv.signUp(newUser).then(function (user) {
                $location.path("/admin");
            }, function (err) {
                console.log(err);
                $location.path("/");
            })
        };
    }


    
}); 