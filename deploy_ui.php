<?php
/*
  Deploy ui to production
  build: ng build --prod
  run: php deploy.php
*/

date_default_timezone_set('UTC');

$ts = date('YmdHis');
$base = '~/live/txt';
$builds = $base . '/ui';
$server = 'stenvala@mathcodingclub.com';
$ssh = 'ssh ' . $server;

// Copy build files
$cmd = $ssh . ' "mkdir ' . $builds . '/' . $ts . '"';
shell_exec($cmd);
$cmd = 'rsync -r ui/dist/txt/* ' . $server . ':' . $builds . '/' . $ts;
shell_exec($cmd);
// Copy .htaccess
$cmd = 'rsync -r tnn-conf/.htaccess ' . $server . ':' . $builds . '/' . $ts;
shell_exec($cmd);
print "Released to $ts\n";

// Change link
$symlink = 'current-ui';
$cmd = $ssh . ' "rm ' . $base . '/' . $symlink . '"';
shell_exec($cmd);
$cmd = $ssh . ' "ln -s ' . $builds . '/' . $ts . ' ' . $base . '/' . $symlink . '"';
shell_exec($cmd);
print "Changed symlink to $ts\n";

// Remove old builds
$cmd = $ssh . ' "cd ' . $builds . '; ls"';
$ls = shell_exec($cmd);
$dirs = explode(PHP_EOL, $ls);
while (count($dirs) > 10){  
  $build = array_shift($dirs);
  $cmd = $ssh . ' "rm -rf ' . $builds . '/' . $build . '"';
  shell_exec($cmd);  
  print "Removed old release $build\n";
}

// Copy .htaccess
$cmd = 'rsync -r tnn-conf/.htaccess ' . $server . ':' . $builds . '/' . $build;
shell_exec($cmd);
print ".htaccess synced\n";