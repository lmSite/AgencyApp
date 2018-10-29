app.controller('adminCtrl', function ($scope, userSrv, $location, $rootScope) {
    $rootScope.isNavBAr = true;
    $scope.activeTab=sessionStorage.activeTab;
    $scope.isAgencySaved=false;

    $scope.isPwd=false;
    $scope.modal=""; //" empty => error don't close window , modal => close window"
    $scope.isUpdate=false;
    
    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.activeUser = userSrv.getActiveUser();

 
    $scope.closeAccount = function(pwd){
        
        if ($scope.activeUser.password == pwd) {         
            userSrv.deleteUser($scope.activeUser.id);
            userSrv.logout();
            $scope.isPwd=false;
            
            alert("Your Accont has been deleted !");
            $scope.modal="modal";
            $location.path("/");
        }
        else{
            $scope.isPwd=true;
        }
      
    }

$scope.saveAgencyUpdate=function(){
    console.log(" $scope.activeUser =" + $scope.activeUser.email );
    userSrv.updateUser($scope.activeUser,$scope.activeUser.id);
    $scope.isAgencySaved=true;  
    $timeout(function() {
      $scope.isAgencySaved = false;
    }, 4000);
}

   
});