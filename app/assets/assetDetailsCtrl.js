app.controller('assetDetailsCtrl', function ($scope, $rootScope, $routeParams, $sce, $location, assetSrv) {
    
    $rootScope.isNavBAr = false;

    $scope.modalState = "";
   
    $scope.q = "";

    if ($routeParams.assetId) {
        assetSrv.getAssetById($routeParams.assetId).then(function (asset) {
            $scope.activeAsset = JSON.parse(JSON.stringify(asset));
            $scope.image = $scope.activeAsset.imgUrl[0];
            $scope.q = $scope.activeAsset.street + " " + $scope.activeAsset.building + " " + $scope.activeAsset.city;
            console.log($scope.q);
            $scope.query = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCXtNI7RL0FN5jAvjs0fbCwMntma1wY0i4&q=" + encodeURIComponent($scope.q));
            $scope.$apply();

        }, function (err) {
            console.log(err);
        });
    }



    $scope.closeWin = function () {
        $location.path("/assets");
    }



})