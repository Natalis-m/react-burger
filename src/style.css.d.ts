declare module '*.css' {
  const exports: { [exportName: string]: string };
  export = exports;
}
declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
