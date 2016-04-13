angular.module("starter.services",[]).value("serverAddress","http://www.cinemagharhd.com/k-chahiyo/php").service("kchahiyoServices",["$http","$q","serverAddress",function(e,t,o){this.postEdited=!1;var n=[];this.getPostsByCatagory=function(t,r,a){return e.get(o+"/getPosts.php",{params:{catagory:t,locationInfo:r,pageNum:a}}).then(function(e){return n=e.data,e})},this.getPostsBySearchtext=function(t,r,a,i,s){return e.get(o+"/getPosts.php",{params:{catagory:t,locationInfo:r,pageNum:a,searchText:i,selectedOption:s}}).then(function(e){return n=e.data,e})},this.insertPost=function(t){var n=$.param({email:t.email,unique_id:t.uniqueId,title:t.title,content:t.content,catagory:t.catagory,sub_catagory:t.sub_catagory.trim(),post_near_city:t.city,post_location:t.location});return e({url:o+"/insertPost.php",method:"POST",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}})},this.getCitiesByState=function(t){return e.get(o+"/getCitiesByState.php",{params:{stateName:t}})},this.getStatesByCountry=function(t){return e.get(o+"/getCitiesByState.php",{params:{countryName:t}})},this.getCityByZip=function(t){return e.get(o+"/getCityByZip.php",{params:{zip:t}})};var r=[],a=function(e,t){var o=[];e=e.toLowerCase();for(var n=0;n<t.length;n++)t[n].catagory==e&&o.push(t[n]);return o};this.getSubCatagories=function(e){var o=t.defer();return 0===r.length?this.getPostCatagories().then(function(t){o.resolve(a(e,t.data.content))},function(e){}):o.resolve(a(e,r)),o.promise},this.getPostCatagories=function(){return e.get(o+"/getCatagoriesAndSubCatagories.php").then(function(e){return r=e.data.content,e},function(e){console.error("Error while fetching Catagories and Sub Catagories")})},this.getPostById=function(r){if(0===n.length)return e.get(o+"/getPostById.php",{params:{id:r}});for(var a=t.defer(),i=0;i<n.length;i++)if(n[i].id==parseInt(r)){var s={};s.data=n[i],a.resolve(s)}return a.promise},this.getPostsByUserId=function(t){return e.get(o+"/getPostsByUserId.php",{params:{userId:t}}).then(function(e){return myPosts=e.data,e},function(e){})},this.getUserPostById=function(n){if(0===s.length)return e.get(o+"/getPostById.php",{params:{id:n}});for(var r=t.defer(),a=0;a<s.length;a++)if(s[a].id==parseInt(n)){var i={};i.data=s[a],r.resolve(i)}return r.promise;var s},this.savePost=function(t){var n=$.param({operationType:"save",title:t.title,content:t.content,userId:t.userId,postId:t.id});return e({url:o+"/postOperations.php",method:"POST",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}})}}]).service("userAuthServices",["$http","$q","facebookServices","$window","$ionicModal","$ionicPopup","$ionicHistory","serverAddress",function(e,t,o,n,r,a,i,s){function c(o){var n=t.defer();return e({url:s+"/registerUser.php",method:"POST",data:o,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}}).then(function(e){return"success"==e.data.status?(d(e),void n.resolve("user details and post loaded")):void n.reject(e.data.content)},function(e){n.reject(e)}),n.promise}var l={facebookLogin:!1,loggedIn:!1,userPostsChanged:!1};this.setUserPostsChanged=function(e){l.userPostsChanged=e},this.isUserPostsChanged=function(){return l.userPostsChanged};var u=function(e){a.alert({title:e})};this.setStateAndCity=function(e,t){n.localStorage.setItem("stateName",e),n.localStorage.setItem("cityName",t)},this.getStateAndCity=function(){return{state:n.localStorage.getItem("stateName"),city:n.localStorage.getItem("cityName")}},this.isSetStateAndCity=function(){return""!=n.localStorage.getItem("stateName")&&""!=n.localStorage.getItem("cityName")},this.isFacebookLogin=function(){return l.facebookLogin},this.userLoggedIn=function(){l.loggedIn=!0},this.isUserLoggedIn=function(){return l.loggedIn},this.watchThisPost=function(t){var o=n.localStorage.getItem("userId");return t.userId==o?void u("Own posts cannot be watched!"):("undefined"==typeof l.watchedPosts&&(l.watchedPosts=Array()),l.watchedPosts.push(t),void e.get(s+"/postOperations.php",{params:{operationType:"watch",userId:o,postId:t.id}}).then(function(e){u("Posting has been watched")},function(e){u(e)}))},this.getWatchedPosts=function(){var t=n.localStorage.getItem("userId");return e.get(s+"/postOperations.php",{params:{operationType:"getWatchedPosts",userId:t}}).then(function(e){return l.watchedPosts=e.data,e})},this.getWatchedPostDetailsById=function(e){for(var t=l.watchedPosts.length,o=0;t>o;o++)if(l.watchedPosts[o].id==e)return l.watchedPosts[o];return null},this.removeWatchedPost=function(t,o){var r=n.localStorage.getItem("userId"),a=t.id;return e.get(s+"/postOperations.php",{params:{operationType:"removeWatchedPost",postId:a,userId:r}})},this.getUserDetails=function(){return l.data.userDetails},this.getUserPosts=function(){return l.data.posts},this.getPostById=function(e){for(var t=l.data.posts,o=0;o<t.length;o++)if(t[o].id==e)return t[o]},this.deletePost=function(t){var o=l.data.posts,n=$.param({operationType:"delete",userId:t.userId,postId:t.id});return o.splice(o.indexOf(t),1),e({url:s+"/postOperations.php",method:"POST",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}})},this.logUserOut=function(){return n.localStorage.setItem("userId",""),n.localStorage.setItem("unique_id",""),o.logout().then(function(){l.loggedIn=!1,u("You have been logged out!")})},this.authenticateThisUser=function(a){var c=(t.defer(),function(e){var n=t.defer();return e.user={},e.loginModalButtons={},r.fromTemplateUrl("templates/tab-login.html",{scope:e}).then(function(t){e.loginModal=t,e.loginModal.show(),e.$on("loginComplete",function(t,o){e.loginModal.hide(),e.spinnerModal.remove()})}),e.loginModalButtons={closeButton:function(){e.$emit("loginComplete","complete"),n.reject("modal closed")},loginButton:function(){function t(t){e.$emit("loginComplete","complete"),u("You have successfully logged in!"),n.resolve("success, user data loaded")}function o(e){u("User credentials do not match!"),console.log("failure : "+JSON.stringify(e))}p(e.user).then(t,o)},fbLogin:function(){r.fromTemplateUrl("templates/spinner-modal.html",{scope:e}).then(function(t){e.spinnerModal=t,e.spinnerModal.show(),e.$on("loginComplete",function(t,o){e.spinnerModal.hide(),e.spinnerModal.remove()})}),o.init().then(function(t){t.getLoginStatus().then(function(t){var o=t.authResponse.userID,r=t.authResponse.accessToken;return console.log(JSON.stringify(t)),g(o,r).then(function(t){return e.$emit("loginComplete","complete"),d(t),u("You have successfully logged in!"),n.resolve("user successfully logged in")},function(e){return console.log(e+"in validateUniqueIdWithServer"),e})},function(){return console.log("here now in gett loginStatus error cb"),l(t).then(function(t){return f(t,"fbUserRegister").then(function(t){e.$emit("loginComplete","complete"),d(t),n.resolve("user logged in and posts downloaded")})},function(e){u("error acquiring fb data, try again! "+e),console.log("error acquiring fb data, try again! "+e)})})})},signUp:function(){h(e)}},n.promise}),l=function(e){return e.login().then(function(t){var o={accessToken:t.authResponse.accessToken};return e.getPublicProfile().then(function(t){return o.publicProfile=t,e.getProfilePicBig().then(function(e){return o.profilePicBig=e,o})})})},f=function(o,n){var r=t.defer(),a=$.param({operation:n,user:o});return e({url:s+"/registerUser.php",method:"POST",data:a,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}}).then(function(e){console.log(JSON.stringify(e.data));var t=e.data.content;"success"==e.data.status?r.resolve(e):r.reject(t)},function(e){r.reject(e)}),r.promise},h=function(e){e.loginModal.hide(),r.fromTemplateUrl("templates/tab-register.html",{scope:e}).then(function(t){e.registerModal=t,e.registerModal.show(),e.user={},e.notFilled=!0,e.user.firstName={text:"firstName",word:/^\s*\w*\s*$/}}),e.registerModalButtons={closeButton:function(){e.registerModal.hide(),i.goBack()},register:function(){e.notFilled=!1,f(e.user,"createUser").then(function(t){e.registerModal.hide(),u(t),i.goBack()},function(e){u(e)})}}},m=function(){console.log("checkUserLoginStatus");var e={userId:n.localStorage.getItem("userId")||"",unique_id:n.localStorage.getItem("unique_id")||""};if(""===e.userId||""===e.unique_id)return console.log(JSON.stringify(e)),c(a);var t=e.userId,o=n.localStorage.getItem("unique_id");return g(t,o).then(function(e){return"success"},function(e){return console.log(e),c(a)})};return m()};var d=function(e){n.localStorage.setItem("userId",e.data.content.userDetails.uid),n.localStorage.setItem("unique_id",e.data.content.userDetails.unique_id),l.data=e.data.content},g=function(e,t){var o=$.param({operation:"loginStatus",userId:e,unique_id:t});return c(o)},p=function(e){console.log("loginUser called");var t=$.param({operation:"loginUser",username:e.username,password:e.password});return c(t)}}]).factory("googleMapFactory",["$q","$window",function(e,t){var o=!1,n=e.defer(),r=document.createElement("script");r.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZv-6hTAT3JfRWLaWiGvadnYvpsjR3DeU&callback=initMap&libraries=places",r.async=!0;var a=document.getElementsByTagName("script")[0];return a.parentNode.appendChild(r),t.initMap=function(){o||(o=!0,console.log("loaded googleMapFactory"),n.resolve(document.getElementsByClassName("pac-container")))},{load:n.promise}}]).factory("imageUploader",["$cordovaFileTransfer","$ionicActionSheet","$cordovaFile","$cordovaCamera","$cordovaImagePicker","$q","$http","serverAddress",function(e,t,o,n,r,a,i,s){var c={numImageUploadable:0,maxImagesAllowed:0,setMaxImagesAllowed:function(e){this.maxImagesAllowed=e,this.numImageUploadable=e},maxImagesAllowedExceeded:function(){alert("Maximum "+this.maxImagesAllowed+" images can be attached!")},isMaxNoImagesExceeded:function(){return this.numImageUploadable<=0?(this.maxImagesAllowedExceeded(),!0):!1}},l=function(e){return console.log(e.name+" in createFolderIfNotPresent"),o.createDir(cordova.file.dataDirectory,e.name,!0)},u=function(e,t){function o(e){console.log("in copy fileFolder");var o=e.fullPath.substr(e.fullPath.lastIndexOf("/")+1),a=r(5)+o;window.resolveLocalFileSystemURL(cordova.file.dataDirectory+t.name,function(t){e.copyTo(t,a,n,i)},i)}function n(t){c.push(t.nativeURL),c.length===e.length&&(console.log("all files copied"),s.resolve(c))}function r(e){for(var t="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;e>n;n++)t+=o.charAt(Math.floor(Math.random()*o.length));return t}function i(e){s.reject("copying failed")}var s=a.defer(),c=Array();"string"==typeof e&&(e=Array(e));for(var l=0;l<e.length;l++)window.resolveLocalFileSystemURL(e[l],o,i);return s.promise},d=function(){var e={destinationType:Camera.DestinationType.FILE_URI,sourceType:Camera.PictureSourceType.CAMERA,correctOrientation:!0,encodingType:Camera.EncodingType.JPEG,targetHeight:800,targetWidth:800};return n.getPicture(e)},g=function(){var e={maximumImagesCount:c.numImageUploadable,width:800,height:800,quality:80};return r.getPictures(e)},p=function(e){var t=a.defer(),o=Array();return c.isMaxNoImagesExceeded()?void 0:(d().then(function(r){l(e).then(function(a){u(r,e).then(function(e){for(;e.length>0;)o.push(e.pop()),c.numImageUploadable--;n.cleanup(),t.resolve(o),console.log("URI : "+r)})})},function(e){console.log("error capturing pics"),t.reject("capturing pics aborted")}),t.promise)},f=function(e){var t=a.defer(),o=Array();return c.isMaxNoImagesExceeded()?void 0:(g().then(function(n){console.log(JSON.stringify(n)),l(e).then(function(r){u(n,e).then(function(e){for(console.log(JSON.stringify(e));e.length>0;)o.push(e.pop()),c.numImageUploadable--;console.log("done loading"),t.resolve(o)})})},function(e){console.log("error getting pics"),t.reject("error getting pics")}),t.promise)},h=function(t,o,n,r){function i(e){u.reject("error uploading files")}function c(e){o.splice(o.indexOf(e.filePath),1),n.push(e.newFileName),0===o.length&&u.resolve("upload completed")}function l(t,o,n){var r={filePath:o,newFileName:""},i=a.defer(),c="insert",l=s+"/imageUploader.php",u={params:{directory:n,postId:t,operation:c}};return e.upload(l,o,u).then(function(e){console.log(JSON.stringify(e));var t=JSON.parse(e.response);return"success"==t.status?(r.newFileName=t.fileName,i.resolve(r),void console.log("fileName "+r.newFileName)):void i.reject(e.data)},function(e){console.log(e)}),i.promise}var u=a.defer();if(0===o.length)return u.resolve("no image to upload"),u.promise;for(var d=o.length,g=0;d>g;g++)l(t,o[g],r).then(c,i);return u.promise},m=function(e,t){var o="delete",n=$.param({directory:"uploads",fileName:t,postId:e,operation:o});return i({url:s+"/imageUploader.php",method:"POST",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}}).then(function(e){return c.numImageUploadable++,e})},v=function(e,o){var n=(Array(),a.defer()),r={};if("post"==e?r.name="uploads":"profilePic"!=e&&"coverPic"!=e||(r.name="userProfilePics"),console.log(r.name+" value of folderName "+e),!c.isMaxNoImagesExceeded()||o){t.show({buttons:[{text:"Use Camera"},{text:"Select Images From Gallery"}],titleText:"Attach Images",cancelText:"Cancel",cancel:function(){n.reject("operation cancelled")},buttonClicked:function(e){return 0===e?p(r).then(function(e){n.resolve(e)}):1===e&&f(r).then(function(e){n.resolve(e)}),!0}});return n.promise}},y=function(e,t){t.splice(e,1),c.numImageUploadable++},I=function(t,n){function r(e,t){var n=e.substr(e.lastIndexOf("/")+1);return o.removeFile(cordova.file.dataDirectory+t,n).then(function(e){return console.log(n+" uploaded and removed"),e},function(e){return console.log(JSON.stringify(e)),e})}var i=a.defer();c.numImageUploadable=1,c.setMaxImagesAllowed=1;var l=t.pop(),u="userProfilePics",d={filePath:l,newFileName:""},g="profilePic",p=s+"/imageUploader.php",f={params:{directory:u,userId:n,operation:g}};return e.upload(p,l,f).then(function(e){console.log(JSON.stringify(e));var t=JSON.parse(e.response);return"success"==t.status?(d.newFileName=t.fileName,i.resolve(d),r(d.filePath,u),void console.log("fileName "+d.newFileName)):void i.reject(e.data)},function(e){console.log(e)}),i.promise};return{init:c,removeImageFromDevice:y,copyFilesToLocalDirectory:u,uploadImages:h,uploadProfilePic:I,showActionSheet:v,removeFileFromServer:m}}]).service("viewFullScreenModal",["$ionicModal","$ionicScrollDelegate",function(e,t){this.init=function(o,n){return o.slideHasChanged=function(e){t.$getByHandle("scrollHandle"+e).zoomTo(1),o.active=e},o.closeModal=function(){o.viewFullScreenModal.hide()},o.$on("$destory",function(){o.viewFullScreenModal.remove()}),e.fromTemplateUrl("templates/modal-image.html",{scope:o})}}]);