var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');
var istanbul = require('gulp-istanbul');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var del = require('del');
var mkdirp = require('mkdirp');
var concat = require("gulp-concat");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var typescript = require('gulp-typescript');
var ghPages = require('gulp-gh-pages');
var bump = require('gulp-bump');
var fs = require('fs');
var through = require('through2');
var git = require('gulp-git');
var typings = require("gulp-typings");
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var tsProject = typescript.createProject('tsconfig.json', function () {
    // typescriptのオブジェクトと、tsconfig.jsonを読み込んだプロジェクトオブジェクト作成。
    typescript: require('typescript')
});

// 定数群
const TEST_BUILD_DIR = './test-build/';

// タスク群。

gulp.task("download-typings", function () {
    return gulp.src("./src/typings.json")
        .pipe(typings());
});

gulp.task('test-clean', function (cb) {
    return del([TEST_BUILD_DIR, './coverage'], cb);
});

gulp.task('test-src-copy', ['test-clean'], function () {
    mkdirp(TEST_BUILD_DIR);
    return gulp.src(['./src/**'])
        .pipe(gulp.dest(TEST_BUILD_DIR));
});

// FIXME 以下、苦肉の策で「sourcemap取るために二回コンパイルして」いる。こんなの絶対おかしいからなおすこと。

// gulp.task('test-transpile' , ['test-src-copy'], function() {
//     // 対象となるファイルを全部指定
//     return gulp.src([TEST_BUILD_DIR + '**/*.ts','!' + TEST_BUILD_DIR + '/typings/**'] )
//         .pipe(sourcemaps.init())
//         .pipe(typescript(tsProject))
//         // jsプロパティを参照
//         .js
//         // ちょいカスタム。ソースのありか（のトップ）を指定。
//         .pipe(sourcemaps.write('./' , {includeContent: false, sourceRoot: '\/'}))
//         .pipe(gulp.dest(TEST_BUILD_DIR));
// });

gulp.task('test-transpile', ['test-src-copy'], function () {
    // 対象となるファイルを全部指定
    return gulp.src([TEST_BUILD_DIR + '**/*.ts', '!' + TEST_BUILD_DIR + '/typings/**'])
        .pipe(typescript(tsProject))
    // jsプロパティを参照
        .js
        .pipe(gulp.dest(TEST_BUILD_DIR));
});

gulp.task('test-retranspile-main', ['test-transpile'], function () {
    // 対象となるファイルを全部指定
    return gulp.src([TEST_BUILD_DIR + 'main/ts/*.ts'], { base: TEST_BUILD_DIR + 'main/ts/' })
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
    // jsプロパティを参照
        .js
    // ちょいカスタム。ソースのありか（のトップ）を指定。
        .pipe(sourcemaps.write('./', { includeContent: false, sourceRoot: '' }))
        .pipe(gulp.dest(TEST_BUILD_DIR + 'main/ts/'));
});

gulp.task('pre-test', ['test-retranspile-main'], function () {
    return gulp.src([TEST_BUILD_DIR + 'main/ts/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src([TEST_BUILD_DIR + 'test/ts/*Test.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log)
        .pipe(istanbul.writeReports())
        .on('end', function () {
            // remap-istanbul(TypeScrptへのカバレッジの付け替え)
            return gulp.src('./coverage/coverage-final.json')
                .pipe(remapIstanbul({
                    reports: {
                        'json': './coverage/coverage.json',
                        'html': './coverage/html-report'
                    }
                }));
        })
    // アウトの基準は"75%"くらいにしとく？
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 75 } }));
});

gulp.task('build', function () {
    return browserify()
        .add('./src/main/ts/ZundokoButtonViewModel.ts')
        .plugin('tsify', {
            target: 'ES6',
            removeComments: true
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./src/main/resources/static/js'));
});
