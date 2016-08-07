var shell = require('shelljs');

shell.echo('\n#################################################################');
shell.echo('# npm run build');
if (shell.exec('npm run build').code !== 0) {
  shell.echo('error: npm run build');
  process.exit(1);
}

shell.echo('\n#################################################################');
shell.echo('# cd test');
shell.cd('test');

shell.echo('\n#################################################################');
shell.echo('# npm install');
if (shell.exec('npm install').code !== 0) {
  shell.echo('error: npm install');
  process.exit(1);
}

shell.echo('\n#################################################################');
if (!shell.exec('netstat -atp tcp | grep -i "listen" | grep ".8099"', {silent: true}).stdout) {
  shell.echo('# detox-server is not running, run it');
  if (shell.exec('../node_modules/.bin/ttab -w node ./node_modules/.bin/detox-server').code !== 0) {
    shell.echo('# error: cannot run detox-server in a new tab');
    process.exit(1);
  }
} else {
  shell.echo('# detox-server is already running');
}

shell.echo('\n#################################################################');
shell.echo('# killing any running react-native packagers');
shell.exec('pkill -f "react-native/packager"');

shell.echo('\n#################################################################');
shell.echo('# react-native run-ios');
if (shell.exec('react-native run-ios').code !== 0) {
  shell.echo('error: react-native run-ios');
  process.exit(1);
}

shell.echo('\n#################################################################');
shell.echo('# killing ios simulator');
shell.exec('killall "Simulator"');

shell.echo('\n');