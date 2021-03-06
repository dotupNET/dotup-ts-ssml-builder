const
  spawn = require('cross-spawn'),
  GitWrapper = require('dotup-ts-git-wrapper').GitWrapper
  ;

async function publish() {
  const git = new GitWrapper();
  if (git.hasChanges()) {
    throw new Error('Can not be published with local changes. Commit and push first.');
  }

  spawn.sync('npm', ['publish'], { stdio: 'inherit' });
}
module.exports.publish = publish;
// module.exports.postBuild = publish;
// gulp.task('npm-publish',
//   gulp.series(
//     build.build,
//     publish
//   )
// );
