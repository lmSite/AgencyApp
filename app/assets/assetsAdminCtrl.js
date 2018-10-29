app.controller('assetsAdminCtrl', function ($scope, $rootScope, $filter, $location, $route, $timeout, assetSrv, userSrv) {
    $scope.xxx = "xxx";
    $rootScope.isNavBAr = true;
    // $location.path("/admin"); // remove
    $scope.isSavedNew = false; //new asset
    $scope.isAssetUpdated = false; //update asset
    $scope.isUpdateAsset = false;
    $scope.sRooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.modalUpdate = "";
    assetSrv.get_Cities().then(function (cities) {
        $scope.cities = cities;
        $scope.$apply();
    }, function (err) {
        console.log(err);
    });


    $scope.assets = [];
    $scope.imgUrl = [];

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    assetSrv.getActiveUserAssets().then(function (assets) {
        $scope.assets = assets;
        $scope.$apply();
    }, function (err) {
        console.log(err);
    });



    $scope.searchAssets = function () {
        //$scope.assets= $scope.assets.filter(asset => asset.price > $scope.toPrice);
    }

    $scope.clearSearch = function () {
        $scope.searchText = "";
        $scope.query = {};
        $scope.toPrice = null;
    }


    $scope.createAsset = function () {
        var edate = $scope.aevacuationDate;
        if ($scope.aevacuationDate == "date" && angular.isDate($scope.aevacuationDate1)) {
            edate = $filter('date')(new Date($scope.aevacuationDate1), 'dd/MM/yyyy').toString();
            $scope.aevacuationDate1 = null;
            $scope.aevacuationDate = "";
        }
        else {
            edate = $scope.aevacuationDate;
        }

        if ($scope.imgUrl.length > 0) { $scope.imgUrl.splice1(1, $scope.imgUrl.length) }

        if ($scope.imgUrl1 != "" && $scope.imgUrl1 != null && $scope.imgUrl1 != "undefined") { $scope.imgUrl.push($scope.imgUrl1); }
        if ($scope.imgUrl2 != "" && $scope.imgUrl2 != null && $scope.imgUrl2 != "undefined") { $scope.imgUrl.push($scope.imgUrl2); }
        if ($scope.imgUrl3 != "" && $scope.imgUrl3 != null && $scope.imgUrl3 != "undefined") { $scope.imgUrl.push($scope.imgUrl3); }
        if ($scope.imgUrl4 != "" && $scope.imgUrl4 != null && $scope.imgUrl4 != "undefined") { $scope.imgUrl.push($scope.imgUrl4); }
        if ($scope.imgUrl5 != "" && $scope.imgUrl5 != null && $scope.imgUrl5 != "undefined") { $scope.imgUrl.push($scope.imgUrl5); }


        assetSrv.createAsset({
            userId: userSrv.getActiveUser().id,
            forPurpose: $scope.forPurpose,
            price: $scope.price,
            type: $scope.type,
            //country : $scope.,
            city: $scope.city,
            // neighborhood : $scope.,
            street: $scope.street,
            building: $scope.building,
            evacuationDate: edate,
            builtSize: $scope.builtSize,
            size: $scope.size,
            rooms: $scope.rooms,
            floor: $scope.floor,
            balcony: $scope.balcony,
            info: $scope.info,
            airCondition: $scope.airCondition,
            elevator: $scope.elevator,
            bars: $scope.bars,
            parking: $scope.parking,
            imgUrl: $scope.imgUrl
        }).then(function () {
            $scope.clearFieldsNew();
            $scope.isSavedNew = true;

            $timeout(function () {
                $scope.isSavedNew = false;
            }, 4000);

        }, function (err) {
            console.log(err);
        })
    }


    $scope.clearFieldsNew = function () {
        $scope.forPurpose = "";
        $scope.price = "";
        $scope.type = "";
        //country : $scope.,
        $scope.city = "";
        //neighborhood : $scope.neighborhood,
        $scope.street = "";
        $scope.building = "";

        $scope.aevacuationDate = "";
        $scope.builtSize = "";
        $scope.size = "";
        $scope.rooms = "";
        $scope.floor = "";
        $scope.balcony = "";
        $scope.info = "";
        $scope.airCondition = "";
        $scope.elevator = "";
        $scope.bars = "";
        $scope.parking = "";
        $scope.imgUrl.length = 0;
        $scope.imgUrl1 = "";
        $scope.imgUrl2 = "";
        $scope.imgUrl3 = "";
        $scope.imgUrl4 = "";
        $scope.imgUrl5 = "";
    };


    $scope.pricefilter = function (obj) {
        if ($scope.toPrice > 0 && $scope.toPrice != null && $scope.toPrice != undefined && $scope.toPrice != "") {
            if (obj.price <= $scope.toPrice) {
                return true;
            }
            return false;
        }

        else { return true; }
    }


    $scope.updateAsset = function (asset) {
        $rootScope.assetId = asset.id;
        $rootScope.assetUpdate = asset;
    }


    $scope.deleteAsset = function (asset) {
        assetSrv.deleteAsset(asset.id);
        sessionStorage.activeTab = 2;
        $timeout(function () {
            $route.reload();
        }, 500);
    }

});