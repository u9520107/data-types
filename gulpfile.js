import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import git from 'nodegit';
import fs from 'fs-promise';
import path from 'path';
import semver from 'semver';
import rm from 'gulp-rm';
import cp from 'child_process';

gulp.task('pre-coverage', () => (
  gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: babelIstanbul.Instrumenter,
    }))
    .pipe(istanbul.hookRequire())
));

gulp.task('coverage', ['pre-coverage'], () => (
  gulp.src('test/**/*.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports())
));

gulp.task('test', () => (
  gulp.src('test/**/*.js')
    .pipe(mocha())
));
gulp.task('clean', () => (
  gulp.src('build/**')
    .pipe(rm())
));
gulp.task('build', ['clean'], () => (
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
));

gulp.task('publish', ['build'], async () => {
  if (!await fs.exists(path.resolve(__dirname, 'release'))) {
    await git.Clone('https://github.com/u9520107/data-types.git', 'release', {
      checkoutBranch: 'release',
    });
  }
  await new Promise(resolve => {
    gulp.src(['build/*'])
      .pipe(gulp.dest('release'))
      .on('end', resolve);
  });
  const packageInfo = JSON.parse(await fs.readFile(path.resolve(__dirname, 'package.json')));
  const repo = await git.Repository.open('release');
  const origin = await git.Remote.lookup(repo, 'origin');
  const files = (await repo.getStatus()).map(f => f.path());
  if (files.length > 0) {
    const versions = semver.sort(await git.Tag.list(repo));
    const latest = versions.pop();
    const newVersion = latest ? semver.inc(latest, 'patch') : '1.0.0';
    packageInfo.version = newVersion;
    await fs.writeFile(
      path.resolve(__dirname, 'release/package.json'),
      JSON.stringify(packageInfo, null, 2),
    );
    if (files.indexOf('package.json') === -1) files.push('package.json');

    const oid = await repo.createCommitOnHead(
      files,
      git.Signature.default(repo),
      git.Signature.default(repo),
      `release version: ${newVersion}`
    );
    const tag = await repo.createLightweightTag(oid, newVersion);
    cp.execSync('git push origin release --tags', {
      cwd: path.resolve(__dirname, 'release'),
    });
    console.log(`release version: ${newVersion}`);
  } else {
    console.log('no changes found...');
  }
});
