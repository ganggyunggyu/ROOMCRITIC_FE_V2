// declare module '*.svg' {
//   const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//   export default value;
// }
// declare module '*.svg' {
//   import React = require('react');

//   export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export default src;
// }
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
