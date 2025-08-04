const { exec } = require('child_process');

exec('ping -c 4 google.com', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Resultado:\n${stdout}`);
});
