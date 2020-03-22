declare const NODE_ENV: 'production' | 'development';

declare module '*.css' {
    const content: {[className: string]: string};
    export default content;
}
