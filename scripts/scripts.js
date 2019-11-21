module.exports = function(context) {
    var fs = context.requireCordovaModule('fs');
    var path = context.requireCordovaModule('path');
    var cordova_util = context.requireCordovaModule('cordova-lib/src/cordova/util.js');
    var projectRoot = context.opts.projectRoot;
    console.log("OI");


    var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
    var stringsPath = path.join(platformRoot, 'app/src/main/res/values/strings.xml');
    var strings = fs.readFileSync(stringsPath).toString();

    var appNameRegexp = new RegExp('<string name="app_name_non_scaped">([^<]+?)</string>');
    var appName = appNameRegexp.exec(appNameRegexp);
    appName = appName[1];

    strings = strings.replace(new RegExp('<string name="app_name">([^<]+?)</string>', "i"), '<string name="app_name">' + appName + '</string>');

    fs.writeFileSync(stringsPath, strings);

};