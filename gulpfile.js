var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglyfly = require('gulp-uglyfly'),
    cssmin = require('gulp-cssmin'),
    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'),
    path = require('path'),
    rename = require('gulp-rename'),

    //这也是压缩CSS的
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    connect = require('gulp-connect'),
    cleancss = new LessPluginCleanCSS({
      advanced: true
    }),
    autoprefix = new LessPluginAutoPrefix({
      browsers: ["ie >= 8", "ie_mob >= 10", "ff >= 26", "chrome >= 30", "safari >= 6", "opera >= 23", "ios >= 5", "android >= 2.3", "bb >= 10"]
    });
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var svgmin = require('gulp-svgmin');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
 
gulp.task('px', function() {
  var processors = [px2rem({remUnit: 100})];
  return gulp.src('./public/css/style.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/rem/'));
});




gulp.task('svg', function () {
    return gulp.src('./app/svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./public/svg/'));
});

gulp.task('sprite', function () {

  var spriteData = gulp.src('./public/img/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.less',
    imgPath: '../img/sprite.png',
    cssTemplate:"rem.template.handlebars"
  }));
 
  // Pipe image stream through image optimizer and onto disk 
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin` 
    // .pipe(buffer())
    // .pipe(imagemin())
    .pipe(gulp.dest('./public/img/'));
 
  // Pipe CSS stream through CSS optimizer and onto disk 
  var cssStream = spriteData.css
    // .pipe(csso())
    .pipe(gulp.dest('./app/less/'));
 
  // Return a merged stream to handle both `end` events 
  return merge(imgStream, cssStream);
});


gulp.task('pixi', function () {
  var spriteData = gulp.src('./public/img/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.json',
    imgPath: '../img/sprite.png',
    cssFormat: 'json_texture'
  }));
 
  // Pipe image stream through image optimizer and onto disk 
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin` 
    // .pipe(buffer())
    // .pipe(imagemin())
    .pipe(gulp.dest('./public/img/'));
 
  // Pipe CSS stream through CSS optimizer and onto disk 
  var cssStream = spriteData.css
    // .pipe(csso())
    .pipe(gulp.dest('./public/img/'));
 
  // Return a merged stream to handle both `end` events 
  return merge(imgStream, cssStream);
});



gulp.task('less', function() {
    // var processors = [
    //     require('cssgrace')
    // ];

  gulp.src('./app/less/*.less')
    .pipe(less({
      plugins: [autoprefix],
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    
    // .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js',function(){
  gulp.src('./public/js/bundle.min.js')
  .pipe( connect.reload() )
})
gulp.task('html',function(){
  gulp.src('./index.html')
  .pipe( connect.reload() )
});
gulp.task('css',function(){
  gulp.src('./public/css/*.css')
  .pipe( connect.reload() )
});

gulp.task("reload",function(){
   gulp.src(['./public/css/*.css','./index.html','./public/js/bundle.min.js']).pipe(connect.reload);
});

gulp.task('connect',function(){
  connect.server({
    port: 5000,
    livereload: true,
    root: "public"
  });
});


/**
 * notice that stage-2 can handle Rest and Spread Properties
 *
 * such as ... operator
 *
 * transform-decorators-legacy can handle decorator which is new feature
 */
gulp.task('browserify', function() {
  browserify('./app/js/index.js')
    .transform("babelify", {
      presets: ["es2015","react","stage-2"],
      plugins: [
      "transform-decorators-legacy"
      ]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js/'))
    
});

gulp.task('watch', function() {
  gulp.watch('./app/less/*.less', ['less']);
  // gulp.watch('./app/js/*.js',['browserify']);
  gulp.watch('./app/js/**/*.js',['browserify']);
  gulp.watch('./public/js/bundle.min.js',['js']);
  gulp.watch('./index.html',['html']);
  gulp.watch('./public/css/*.css',['css','px']);
  // gulp.watch('./')
  // gulp.watch(['./public/css/*.css','./public/js/bundle.min.js','./index.html'],['reload']);
});

gulp.task("htmlmin",function(){
  gulp.src('./index.html').
  pipe(htmlmin({collapseWhitespace: true})).
  pipe(rename({suffix:'.min'})).
  pipe(gulp.dest('./public'))
});

gulp.task("cssmin",function(){
    gulp.src(['./public/rem/*.css','!./public/rem/*.min.css']).
  // gulp.src(['./public/css/*.css','!./public/css/*.min.css']).
  pipe(cssmin()).
  pipe(rename({suffix: '.min'})).
  pipe(gulp.dest('./public/css'))
});

gulp.task("uglyfly",function(){
  gulp.src(['./public/js/*.js','!./public/js/*.min.js']).
  pipe(uglyfly()).
  pipe(rename({suffix: '.min'})).
  pipe(gulp.dest('./public/js'))
});

gulp.task("onLine",['htmlmin','cssmin','uglyfly']);

gulp.task('serve',['less','browserify','connect','onLine','watch']);

gulp.task('default', ['less','browserify','watch']);
