import sh from 'shelljs';
import { execSync } from 'child_process';

import { addShutdownFn } from './lib/shutdownFunc';

const ERROR_EXIT_CODE = 1;

function main() {
    const serverProc = sh.exec('yarn ts-node-dev server/app.ts', { async: true });
    const nginxProc = sh.exec(`nginx -c ${process.cwd()}/nginx/dev.nginx.conf`, { async: true });
    serverProc.on('error', error => {
        process.stderr.write(error.toString());
        process.exit(ERROR_EXIT_CODE);
    });
    nginxProc.on('error', error => {
        process.stderr.write(error.toString());
        process.exit(ERROR_EXIT_CODE);
    });
    addShutdownFn(() => {
        serverProc.kill();
        nginxProc.kill();
    });

    execSync('yarn build-dev', { stdio: 'inherit' });
}

main();
