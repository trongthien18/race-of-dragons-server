
/**
 * function name: getDataByUserId
 * input: any user id
 * output: data of that user
 */
Parse.Cloud.define("getDataByUserId", function(request, response) {
  var query = new Parse.Query(Parse.User);  

  query.get(request.params.userId, {
    success: function(result) {     
      var userData = result.get("userData");
      userData.fetch({
        success: function(data) {
          console.log("Get Data by UserId success!");
          response.success(data);
        }
      })
    },
    
    error: function(error) {
      response.error("Get Data Pointer by User Id got error: " + error.message);
    }
  });
});

/**
 * function name: mergeData
 * input: data
 * output: data after merge
 */
Parse.Cloud.define("mergeData", function(request, response) {
  var mergeFunc = require('cloud/helper.js').meregeData;
  
  var localData = request.params.data;
  var currentUser = request.user;
  
  currentUser.get("userData").fetch({
    success: function(data) {
      data = mergeFunc(data, localData);
      
      data.save({
        success: function(data) {
          console.log("Merge Data success!");
          response.success(data);
        },
        error: function(data, error) {
          response.error("Save Data after merge fail! Error: " + error.message);
        }
      });
      
    },
    error: function(data, error) {
      response.error("Fetch Data got error: " + error.message);
    }
  })
  
});

/**
 * function name: getLeaderboard
 */
Parse.Cloud.define("getLeaderboard", function(request, responce) {
    var limit = request.params.limit || 30;    
    
    var query = new Parse.Query(Parse.User);
    query.include("userData");
    query.limit(limit);
    
    query.find({
      success: function(results) {
        results.sort(function(a, b) {
          return a.get("userData").get("level") > b.get("userData").get("level"); 
        })
        
        console.log("Get Leaderboard success!");
        responce.success(results);
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
        responce.error(error);
      }
    })    
});

/**
 * function name: getRankOfUser
 * input: userId
 * output: rank of that user
 */
Parse.Cloud.define("getRankOfUser", function(request, responce) {
  var userId = request.params.userId || request.user.id;
  
  var userQuery = new Parse.Query(Parse.User);
  userQuery.include("userData");
  
  var query = new Parse.Query("UserData");
  query.descending("level");
  
  query.find({
    success: function(results) {
      userQuery.get(userId, {
        success: function(user) {
          var dataId = user.get("userData").id;
          
          var resultIdList = [];
          for (var i = 0; i < results.length; i++) {
            var element = results[i];
            resultIdList.push(element.id);
          }
          
          var rank = resultIdList.indexOf(dataId) + 1; 
          console.log("Get Rank of User success! Rank = " + rank);
          responce.success(rank);
        }
      })
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
      responce.error(error);
    }
  })
});

/**
 * Triger
 */

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  var UserData = Parse.Object.extend("UserData");
  var userData = new UserData();
  
  var defaultData = {
    level:  1,
    exp:  0,
    elo:  0,
    gold: 1000,
    dragons:  null,
    items:  null,
    converstation:  {
      hello: "The day is the good day to die, hahaha!",
      win: "I'm the best, ya!",
      lose: "Next time..."
    },
    friends:  null
  };

  userData.save(defaultData, {
    success: function(userData) {
      request.object.set("userData", userData);
      response.success();
    },
    error: function(userData, error) {      
      response.error("Save User Data got error: " + error.message);
    }
  })
});

Parse.Cloud.beforeDelete(Parse.User, function(request, response) {
  var userData = request.object.get("userData");
  userData.destroy({
    success: function(userData) {
      response.success("Delete user data success");
    },
    error: function(userData, error) {
      response.error("Delete user data got error: " + error.message);
    }
  })
});