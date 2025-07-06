declare module 'vanta/dist/vanta.topology.min' {
  const value: any
  export default value
}

declare module 'vanta/dist/vanta.trunk.min' {
  const value: any
  export default value
}

declare module 'vanta/dist/vanta.net.min' {
  const value: any
  export default value
}

declare module 'vanta/dist/vanta.fog.min' {
  const value: any
  export default value
}



// Declare the module 'vanta'
declare module 'vanta' {
  // This is a minimal declaration to satisfy TypeScript for the direct import.
  // It declares that 'vanta' has a default export which is an object.
  // We know from debugging that this object will then have properties like .TOPOLOGY.

  interface VantaEffectOptions {
    el: HTMLElement | null;
    THREE?: any; // THREE.js dependency
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    // Add other common options you use for various Vanta effects
    // e.g., points?: number; speed?: number;
  }

  interface VantaEffect {
    (options: VantaEffectOptions): any; // The constructor function signature
    destroy(): void; // The destroy method
    // You might need to add other methods if you call them directly
    // e.g., resize(): void;
  }

  // This declares the global VANTA object or the default export
  interface VantaObject {
    // Index signature to allow any string property, useful for dynamically added effects
    [key: string]: VantaEffect | any; // Allows VANTA.TOPOLOGY, VANTA.WAVES, etc.
    // You can also explicitly define them if you only use a few:
    // TOPOLOGY: VantaEffect;
    // WAVES: VantaEffect;
    // FOG: VantaEffect;

    // If 'vanta' also exports a default function, uncomment this (less common for the main lib)
    // default: VantaObject;
  }

  // This is the declaration for the 'import VANTA from "vanta";' line
  const VANTA: VantaObject;
  export default VANTA;
}

// Also, declare the specific effect modules if you import them directly
// This is for `import 'vanta/dist/vanta.topology.min';` for its side effects
declare module 'vanta/dist/vanta.topology.min' {
  // This module primarily has side effects (registers with the global VANTA object)
  // You don't usually import a value from it for direct use.
  // So, a simple empty module declaration is often enough.
}

// If you were importing the effect constructor directly, you'd do this:
// declare module 'vanta/src/vanta.topology' {
//   import { VantaEffect } from 'vanta'; // Reference the interface from the main Vanta module
//   const TopologyEffect: VantaEffect;
//   export default TopologyEffect;
// }