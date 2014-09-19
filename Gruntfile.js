var Gruntfile = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                esnext: true,
                globals: {
                    Promise: true,
                },
            },
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
                options: {
                    includeRuntime: false,
                },
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
                    src: ["*.jsx"],
                    dest: "src/",
                    ext: ".js",
                }],
            },
        },
        browserify: {
            default: {
                options: {
                    browserifyOptions: {
                        debug: true,
                        deps: true,
                    },
                },
                files: {
                    "dist/public/client.js": "tmp/client.js",
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
                    "dist/public/client.min.js": "dist/public/client.js",
                },
            },
        },
        clean: {
            dist: ["dist"],
            tmp: ["tmp"],
        },
        copy: {
            tmpToDistServer: {
                files: [{
                    expand: true,
                    cwd: "tmp",
                    src: ["**", "!client.js"],
                    dest: "dist/",
                }],
            },
            normalizeToPublic: {
                files: {
                    "dist/public/normalize.css": "node_modules/normalize.css/normalize.css",
                },
            },
        },
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-react");
    grunt.loadNpmTasks("grunt-regenerator");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.registerTask("begin", ["clean", "react", "jshint", "regenerator"]);
    grunt.registerTask("end", ["clean:tmp"]);
    grunt.registerTask("make-client", ["browserify", "copy:normalizeToPublic"]);
    grunt.registerTask("make-server", ["copy:tmpToDistServer"]);
    grunt.registerTask("min-client", ["uglify"]);
    grunt.registerTask("default", ["begin", "make-client", "make-server", "end"]);
    grunt.registerTask("client", ["begin", "make-client", "end"]);
    grunt.registerTask("server", ["begin", "make-server", "end"]);
};

module.exports = Gruntfile;
