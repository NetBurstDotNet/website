var ghpages = require('gh-pages');
var glob = require('glob');
var fs = require('fs');

const allFiles = glob.sync('_dist/**/*').filter((file) => /\.(js|html)$/ig.test(file));
//console.log(allFiles);

const pathMatcher = /(?<=['"])(\/[\w\/_\-]+\.(js|html|png|jpg|gif|css))(?=['"])/igm;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, {encoding: 'utf8'});
  //let matches = content.match(pathMatcher);
  //console.log(matches);

  content = content.replace(pathMatcher, '/website$1')
  
  // matches = content.match(pathMatcher);
  console.log(content);
  fs.writeFileSync(file, content, {encoding: 'utf8'});
});

ghpages.publish('_dist', {}, function(err) {});
