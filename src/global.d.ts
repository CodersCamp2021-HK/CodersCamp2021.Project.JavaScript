declare interface ClassNames {
    [className: string]: string;
}

declare module '*.css' {
    const classNames: ClassNames;
    export default classNames;
}