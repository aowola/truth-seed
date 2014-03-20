/* global module:false */
var path = require("path");
module.exports = function(grunt) {

  // Scaffolding configuration.
  var config = {
    srv: "server",
    src: "assets",
    build: ".build",
    vendor: "vendor",
    dist: "dist",
    configfile:"config.json"
  };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    app: config,
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      config: ['./config.*.json'],
      dist: ['<%= app.dist %>/*'],
      build: ['<%= app.build %>/*']
    },
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      build: {
        src: '<%= app.build %>/styles/main.css',
        dest: '<%= app.build %>/styles/main.css'
      }
    },
    copy: {
      resources: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/resources/',
          src:['{,*/}*.*'],
          dest:'<%= app.build %>/resources/'
        }]
      },
      javascript: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/scripts/',
          src:['{,*/}*.{js}'],
          dest:'<%= app.build %>/scripts/'
        }]
      },
      requirejs: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/<%= app.vendor %>/requirejs/',
          src:['require.js'],
          dest:'<%= app.build %>/scripts/<%= app.vendor %>'
        }]
      },
      fonts: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/fonts/',
          src:['{,*/}*.{eot,svg,ttf,woff}'],
          dest:'<%= app.build %>/fonts/'
        }]
      },
      images: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/img/',
          src:['{,*/}*.{png,jpg,jpeg,gif,webp}'],
          dest:'<%= app.build %>/img/'
        },{
          expand:true,
          cwd:'<%= app.src %>/icons/',
          src:['{,*/}*.{png,jpg,jpeg,gif,webp,ico}'],
          dest:'<%= app.build %>/icons/'
        }]
      },
      icons: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/img/',
          src:['{,*/}*.ico'],
          dest:'<%= app.build %>/img/'
        },{
          expand:true,
          cwd:'<%= app.src %>/icons/',
          src:['{,*/}*.ico'],
          dest:'<%= app.build %>/icons/'
        }]
      },
      views: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/views/',
          src:['{,*/}*.{html,xhtml}'],
          dest:'<%= app.build %>/'
        }]
      },
      dist: {
        files: [{
          expand:true,
          cwd:'<%= app.build %>/',
          src:['**'],
          dest:'<%= app.dist %>/static'
        },{
          expand:true,
          cwd:'<%= app.srv %>/',
          src:['{,*/}*.{js,json}'],
          dest:'<%= app.dist %>/server'
        },{
          src:'package.json',
          dest:'<%= app.dist %>/package.json'
        },
        {
          src:'config.production.json',
          dest:'<%= app.dist %>/config.production.json'
        }
        ]
      }
    },
    imagemin: { 
      options: {
        cache:false,
        optimizationLevel: 6,
        pngquant: true
      },
      dist: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/img/',
          src:['{,*/}*.{png,jpg,jpeg,gif,webp}'],
          dest:'<%= app.build %>/img/'
        },{
          expand:true,
          cwd:'<%= app.src %>/icons/',
          src:['{,*/}*.{png,jpg,jpeg,gif,webp}'],
          dest:'<%= app.build %>/icons/'
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false }
        ]
      },
      dist: {
        files: [{
          expand:true,
          cwd:'<%= app.src %>/img/',
          src:['{,*/}*.svg'],
          dest:'<%= app.build %>/img/'
        },{
          expand:true,
          cwd:'<%= app.src %>/icons/',
          src:['{,*/}*.svg'],
          dest:'<%= app.build %>/icons/'
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        debug: true,
        globals: {
          'define':true,
          'require':true,
          'requirejs':true
        },
      },
      gruntfile: {
        src: 'gruntfile.js'
      },
      build:{
        files: [{
          expand:true,
          cwd:'<%= app.src %>/scripts/',
          src:['{,*/}*.js']
        }]
      },
      dist:{ 
        options:{
          debug: false,
        },
        files: [{
          expand:true,
          cwd:'<%= app.src %>/scripts/',
          src:['{,*/}*.js']
        }]
      }
    },
    less: {
      options: {
        paths: ['<%= app.src %>/<%= app.vendor %>/normalize-css/', '<%= app.src %>/styles/'],
        strictImports: true,
        strictMath: true,
        strictUnits: true
      },
      build: { 
      files:[{'<%= app.build %>/styles/main.css':'<%= app.src %>/styles/main.less'}],
      },
      dist: {
        options: {
          compress:true,
          cleancss:true
        },
        files:[{'<%= app.build %>/styles/main.css':'<%= app.src %>/styles/main.less'}],
      }
    },
    csslint: {
      dist: {
        options: {
        },
        src: ['<%= app.build %>/styles/main.css']
      },
      build: {
        options: {
        },
        src: ['<%= app.build %>/styles/main.css']
      }
    },
    requirejs: {
      options: {
        name: 'main',
        baseUrl: "<%= app.src %>/scripts",
        mainConfigFile: "<%= app.src %>/scripts/main.js",
        out: "<%= app.build %>/scripts/main.js"
      },
      compile: {
        options: {
          optimize : 'none'
        }
      },
      dist: {
        options: {
          optimize : 'none'
        }
      }
    },
    express: {
      options: {
        args: ["config-first"],
        node_env: 'development'
      },
      server: {
        options: {
          script: './server/app.js'
        }
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: '<%= app.build %>/',
        src: ['**/*'],
        dest: '<%= app.dist %>/'
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json', 'config.json', '<%= app.dist %>/package.json', '<%= app.dist %>/config.production.json', '<%= app.dist %>/npm-shrinkwrap.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      dist: {
        files: [{
          expand:true,
          cwd:'<%= app.build %>/',
          src:['{,*/}*.{html,xhtml}'],
          dest:'<%= app.build %>/'
        }]
      }
    },
    targethtml: {
      dist: {
        files: {
          '<%= app.build %>/index.html': '<%= app.build %>/index.html'
        }
      },
      build: {
        files: {
          '<%= app.build %>/index.html': '<%= app.build %>/index.html'
        }
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: '<%= app.build %>/',
          network: ['*'],
          fallback: ['offline.html'],
          exclude: ['icons','img', 'partials', 'scripts', 'resources', 'fonts','scripts/vendor', 'styles', 'manifest.appcache', 'index.html'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['index.html']
        },
        src: [
          '**'
        ],
        dest: '<%= app.build %>/manifest.appcache'
      }
    },
    shell: {
      shrinkwrap: {
        options: {
          stdout: true
        },
        command: 'npm shrinkwrap && mv ./npm-shrinkwrap.json ./<%= app.dist %>/npm-shrinkwrap.json'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'default']
      },
      resources: {
        files: ['<%= app.src %>/resources/{,*/}*.*'],
        tasks: ['copy:resources']
      },
      javascript: {
        options: { livereload: true },
        files: ['<%= app.src %>/scripts/{,*/}*.js'],
        tasks: ['jshint:build', 'requirejs:compile']
      },
      less: {
        options: { livereload: true },
        files: ['<%= app.src %>/styles/{,*/}*.less'],
        tasks: ['less:build', 'csslint:build', 'autoprefixer:build']
      },
      views: {
        options: { livereload: true },
        files: ['<%= app.src %>/views/{,*/}*.{html,xhtml}'],
        tasks: ['copy:views', 'targethtml:build']
      },
      images: {
        files: ['<%= app.src %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
        '<%= app.src %>/icons/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}'],
        tasks: ['copy:images']
      },
      svgs: {
        files: ['<%= app.src %>/img/{,*/}*.svg', '<%= app.src %>/icons/{,*/}*.svg'],
        tasks: ['svgmin']
      },
      fonts: {
      files: ['<%= app.src %>/fonts/{,*/}*.{eot,svg,ttf,woff}'],
        tasks: ['copy:fonts']
      },
      express: {
        options: { livereload: true, spawn: false },
        files:  [ '<%= app.srv %>/**/*.js', './config.json' ],
        tasks:  [ 'config:development', 'express:server' ]
      }
    }
  });

  var tf = function(obj, env) {
    var fnc = function(value) { return tf(value, env); };
    for(var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (p.indexOf('${') === 0) {
          if (p === env) { return obj[p]; } 
          else { delete obj[p]; }
          if (Object.getOwnPropertyNames(obj).length === 0) {
            obj = undefined;
          }
        } else if(typeof(obj[p]) === "object") {
          obj[p] = Array.isArray(obj[p])  ? 
          obj[p].map(fnc) : tf(obj[p], env);
        }
      } 
    }
    return obj;
  };

  // Config Task
  grunt.registerTask("config", "Build Configuration File", function(env) {
    if (arguments.length === 0) {
      grunt.log.writeln(this.name + ", no args");
      return;
    } else {
      grunt.log.writeln(this.name + ", " + env);
    }
    var output = path.normalize(config.configfile),
    envConfig = tf(grunt.file.readJSON(output), ["${", env, "}"].join(""));
    output = path.join(path.dirname(output), [path.basename(output).replace('.json',''), env, path.extname(output).replace('.','')].join('.'));
    grunt.file.write(output, JSON.stringify(envConfig, null, "  "));
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bump');


  // Default Configuration is Production Build
  grunt.registerTask('default', [
    'jshint:gruntfile',
    'jshint:dist',
    'clean:build',
    'requirejs:dist',
    'less:dist',
    'autoprefixer',
    'copy:resources',
    'copy:requirejs',
    'copy:fonts',
    'copy:icons',
    'imagemin',
    'svgmin',
    'copy:views',
    'targethtml:dist',
    'htmlmin:dist',
    'manifest'
  ]);

  // Development Build
  grunt.registerTask('development', [
    'jshint:gruntfile',
    'jshint:build',
    'clean:build',
    'requirejs:compile',
    'less:build',
    'csslint:build',
    'autoprefixer',
    'copy:resources',
    'copy:requirejs',
    'copy:fonts',
    'copy:images',
    'svgmin',
    'copy:views',
    'targethtml:build'
  ]);

  // Release Related Tasks
  grunt.registerTask('release-candidate', [
    'clean:dist',
    'clean:config',
    'config:production',
    'copy:dist',
    'shell:shrinkwrap'
  ]);

  // Package Release Candidate
  grunt.registerTask('dist', ['default', 'release-candidate']);

  // Development Build and Watch w/ Livereload
  grunt.registerTask('serve', ['development', 'clean:config', 'config:development', 'express', 'watch']);
};