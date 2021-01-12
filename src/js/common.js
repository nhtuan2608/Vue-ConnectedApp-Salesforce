const axios = require('axios');

function getCookie(cookie, cname) {
    if(cookie.length != 0) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }
    return null;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getAuthUser(username, password) {
    var portServer = localStorage.getItem("portServer");
    // To Substring username and password on Server
    var pattern = '5$ZxCvbDk$l3';
    var info = username + pattern + password;
    var result = [];
    if(portServer != null) {
        console.log('test js common: ' + info);
        axios.get("http://localhost:" + portServer + "/auth/" + info)
        .then(x => {
            result.push(x.data);
            console.log(JSON.parse(x.data));
        });
        return result;
    }
    return;
}

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length,c.length);
//         }
//     }
//     return "";
// }

// function checkCookie() {
//     var username=getCookie("username");
//     if (username!="") {
//         alert("Welcome again " + username);
//     } else {
//         username = prompt("Please enter your name:", "");
//         if (username != "" && username != null) {
//             setCookie("username", username, 365);
//         }
//     }
// }

export { setCookie, getAuthUser, getCookie };