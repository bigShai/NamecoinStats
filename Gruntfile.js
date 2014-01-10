module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        "phonegap-build": {
            release: {
                options: {
                    "archive" : "",
                    "isRepository": "true",
                    "appId": "706104",
                    "user": {
                        "token":"sen6VfutU9y4Fi4EpHN1"
                    }
                }
            },
            debug: {
                options: {
                    archive: "app.zip",
                    "appId": "706104",
                    "user": {
                        "token":"sen6VfutU9y4Fi4EpHN1"
                    }
                }
            }
        },

        zip: {
            app: {
                file: {
                    src: ["index.html", "js/**/*.js", "css/**/*.js", "icon.png", "images/background.jpg"],
                    dest: "app.zip"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-zipstream');

    grunt.loadNpmTasks('grunt-phonegap-build');


    grunt.registerTask('default', 'phonegap-build:release');


};