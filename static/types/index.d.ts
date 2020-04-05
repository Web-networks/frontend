declare const NODE_ENV: 'production' | 'development';
declare const BACKEND_HOST: string | null;

declare module '*.css' {
    const content: {[className: string]: string};
    export default content;
}

declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.webp' {
    const value: any;
    export default value;
}
