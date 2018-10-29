
app.factory("userSrv", function ($http, $q) {

    var activeUser = null;

    function User(plainUser) {
        this.id = plainUser.id;
        this.email = plainUser.email;
        this.password = plainUser.password;
        this.agency = plainUser.agency;
        this.tel = plainUser.tel;
        this.city = plainUser.city;
        this.street = plainUser.street;
        this.building = plainUser.building;
        this.postal = plainUser.postal;
        this.imgUrl = plainUser.imgUrl;
    }



    function createUser(user) {

        return new User(user);
    }



    async function getUsers() {
        var apiURL = jsonSrvUrl + "/users";
        var response = await $http.get(apiURL);
        var users = [];
        response.data.forEach(function (user) {
            users.push(new User(user));
        })

        return users;
    }



    // LOG THE USER IN AUTO AFTER SIGNUP
    function signUp(userObj) {
        var async = $q.defer();

        var apiUrl = jsonSrvUrl + "/users";

        $http.post(apiUrl, userObj).then(function (response) {
            activeUser = new User(response.data);
            async.resolve(activeUser);
        }, function (err) {
            async.reject(err);
        });

        return async.promise;

    }



    function isLoggedIn() {
        return activeUser ? true : false;
    }



    function logout() {
        activeUser = null;
    }



    function login(email, password) {
        var async = $q.defer();

        var apiURL = jsonSrvUrl + "/users?email=" + email + "&password=" + password;

        $http.get(apiURL).then(function (response) {
            if (response.data.length > 0) {
                activeUser = new User(response.data[0]);
                async.resolve(activeUser);
            } else {
                async.reject("invalid credentials");
            }
        }, function (err) {
            async.reject(err);
        });

        return async.promise;
    }



    function getActiveUser() {
        return activeUser;
    }



    function updateUser(user, userId) {

        var async = $q.defer();
        var apiURL = jsonSrvUrl + "/users/" + userId;

        $http.patch(apiURL, user).then(function (response) {

            async.resolve(response);

        }, function (err) {
            async.reject(err);
        });
        return async.promise;
    }



    async function deleteUser(userId) {
        var apiURL = jsonSrvUrl + "/users/" + userId;
        var response = await $http.delete(apiURL);
        return;
    }




    return {
        getUsers: getUsers,
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        signUp: signUp
    }


})