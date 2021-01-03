const {spawn} = require('child_process');

function exec(serviceName, command) {

  console.log(`Started service [${serviceName}]`);

  let cmd = spawn(command, [], {cwd: './' + serviceName, shell: true});

  cmd.stdout.on('data', function (data) {
    process.stdout.write(`[${serviceName}] ${data}`);
  });

  cmd.stderr.on('data', function (data) {
    process.stderr.write(`[${serviceName}] ${data}`);
  });

  return cmd;
}

const services = new Set();

services.add(exec('weatherservice', 'node src/server.js'));
services.add(exec('toposervice', 'mvn spring-boot:run'));
services.add(exec('server', 'node src/server.js'));
services.add(exec('planner', 'mvn spring-boot:run'));

process.on('exit', async () => {
  for (let service of services) {
    service.stdin.pause();
    service.kill();
  }
});