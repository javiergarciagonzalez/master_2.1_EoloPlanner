const { spawnSync } = require('child_process');

function exec(action, serviceName, command){

  console.log(`${action} for [${serviceName}]`);
  console.log(`Folder: ${serviceName} Command: ${command}`);

  spawnSync(command, [], { 
    cwd: serviceName,
    shell: true,
    stdio: 'inherit'
  });
}
const starting = 'Starting docker image';
const installing = 'Installing dependencies';
exec(starting, 'toposervice', 'docker run --rm -d -p 27017-27019:27017-27019 --name mongodb mongo');
exec(starting, 'server', 'docker run --rm -d -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=eoloplantsDB -p 3306:3306 --name mysql mysql:8.0.22');
exec(starting, 'planner', 'docker run --rm -d -p 5672:5672 -p 15672:15672 --name rabbitmq rabbitmq:3-management');

exec(installing, 'weatherservice', 'npm install');
exec(installing, 'toposervice', 'mvn install');
exec(installing, 'server','npm install');
exec(installing, 'planner','mvn install');
