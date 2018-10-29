app.controller("gmapCtrl", function($scope,$rootScope, userSrv, $location) {
//    var q="ben yehuda 100 tel aviv";$sce,
$scope.query ="https://www.google.com/maps/embed/v1/place?key=AIzaSyCXtNI7RL0FN5jAvjs0fbCwMntma1wY0i4&q=";
// $scope.query="alenby 100 tel aviv";
//$scope.query="";
// if($scope.query!="")
// $scope.query = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCXtNI7RL0FN5jAvjs0fbCwMntma1wY0i4&q="+$scope.query) ;

// $scope.getTemplateUrl = function () {
//     $scope.query ="https://www.google.com/maps/embed/v1/place?key=AIzaSyCXtNI7RL0FN5jAvjs0fbCwMntma1wY0i4&q=";
//     if ($scope.qUrl!="")   {
//         console.log($scope.qUrl);
//     return $sce.trustAsResourceUrl($scope.query+$scope.qUrl) ;
// }
// }
});