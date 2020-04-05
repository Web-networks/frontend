export function addShutdownFn(shutdown: any, proc = process) {
    proc.on('exit', shutdown);
    proc.on('SIGINT', shutdown);
    proc.on('SIGTERM', shutdown);
}
