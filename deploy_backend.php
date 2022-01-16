<?php
/*
  Deploy txt rest
  build: dotnet publish -c Release -p:PublishSingleFile=true
  run: php deploy.php
*/

date_default_timezone_set('UTC');

$ts = date('YmdHis');
$base = '~/live/txt';
$builds = $base . '/back';
$server = 'stenvala@mathcodingclub.com';
$ssh = 'ssh ' . $server;

// Copy build files
$cmd = $ssh . ' "mkdir ' . $builds . '/' . $ts . '"';
shell_exec($cmd);
$cmd = 'rsync -r bin/Release/netcoreapp3.1/publish/* ' . $server . ':' . $builds . '/' . $ts;
shell_exec($cmd);
print "Released to $ts\n";

// Change link
$symlink = 'current-back';
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

// Restart
$cmd = 'ssh -tt ' . $server . ' "sudo /bin/systemctl restart dotnet-txt.service"';
shell_exec($cmd);
print "Restarted service\n";
