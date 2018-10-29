app.controller('assetsClientCtrl', function ($scope, $rootScope, $location, $route, $http, assetSrv, userSrv) {
    $rootScope.isNavBAr = true;
    var result;
    $scope.isAssetSaved = false;
    $scope.rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    assetSrv.get_Cities().then(function (cities) {
        $scope.cities = cities;
        $scope.$apply();
    }, function (err) {
        console.log(err);
    });



    $scope.assets = [];


    assetSrv.getAssets().then(function (assets) {
        $scope.assets = assets;
        $scope.$apply();
        $scope.assets.forEach(function (obj) { obj.agency = ""; });
        $scope.assets.forEach(function (obj) { obj.tel = ""; });

    }, function (err) {
        console.log(err);
    });

    userSrv.getUsers().then(function (users) {
        $scope.users = users;

        $scope.assets.forEach(function (obj) {
            result = $scope.users.filter(user => user.id == obj.userId);
            obj.agency = result[0].agency;
            obj.tel = result[0].tel;
        });

        $scope.$apply();
    }, function (err) {
        console.log(err);
    });

    $scope.clearSearch = function () {
        $scope.searchText = "";
        $scope.query = {};
    }


    $scope.pricefilter = function (obj) {
        if ($scope.toPrice > 0 && $scope.toPrice != null
            && $scope.toPrice != undefined
            && $scope.toPrice != "") {
            if (obj.price >= 0 && obj.price <= $scope.toPrice) {
                return true;
            }
            return false;
        }

        else { return true; }
    }

    $scope.assetViewer = function (obj) {

        activeAsset = JSON.parse(JSON.stringify(obj));

        $location.path("/assets/" + obj.id);
    }

})