var Gruntfile = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ["*.js", "src/**/*.js"],
        },
        regenerator: {
            default: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: ["*.js"],
                    dest: "tmp/",
                }],
            },
            client: {
                files: {
                    "tmp/client.js": "src/client.js",
                },
                options: {
                    includeRuntime: true,
                },
            },
            server: {
                files: {
                    "tmp/server.js": "src/server.js",
                },
                options: {
                    includeRuntime: true,
                },
            },
        },
        react: {
            default: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: ["**/*.jsx"],
                    ext: ".js",
                }],
            },
        },
        browserify: {
            default: {
                options: {
                    browserifyOptions: {
                        debug: true,
                    },
                },
                files: {
                    "dist/client.js": "tmp/client.js",
                },
            },
        },
        uglify: {
            default: {
                options: {
                    mangle: true,
                    compress: true,
                    sourceMap: false,
                },
                files: {
                    "dist/client.min.js": "dist/client.js",
                },
            },
        },
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-react");
    grunt.loadNpmTasks("grunt-regenerator");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.registerTask("default", ["react", "jshint", "regenerator", "browserify", "uglify"]);
};

module.exports = Gruntfile;
