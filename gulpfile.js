const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const del = require("del");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const modifyCssUrls = require('gulp-modify-css-urls');

const project_folder = "dist";
const source_folder = "src";

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/assets/",
		fonts: project_folder + "/assets/fonts/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/scss/main.scss",
		js: source_folder + "/js/script.js",
		img: source_folder + "/assets/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/assets/fonts/*",
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/assets/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + project_folder + "/"
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
	return src(path.src.html)
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(scss({outputStyle: "expanded"}))
		.pipe(group_media())
		.pipe(autoprefixer({overrideBrowserslist: ["last 5 versions"], cascade: true}))
		.pipe(modifyCssUrls({modify: function (url, filePath) {return url.substr(6)}}))
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(rename({extname: ".min.css"}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function watchFiles() {
	gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.img], images);
}

function clean() {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(fonts, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;