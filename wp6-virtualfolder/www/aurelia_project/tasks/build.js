import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  prepareFontAwesome,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS
  ),
  writeBundles
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}

function prepareFontAwesome() {
  const source = 'node_modules/font-awesome';
  const taskFonts = gulp.src(`${source}/fonts/*`)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(`${project.platform.output}/../fonts`));
  return taskFonts;
}
