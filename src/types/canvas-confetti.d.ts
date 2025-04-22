
declare module 'canvas-confetti' {
  type Options = {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  };

  type CreateTypes = {
    canvas: HTMLCanvasElement;
  }

  type CreateFn = (options?: CreateTypes) => (options?: Options) => void;

  type ConfettiFn = {
    (options?: Options): Promise<void>;
    create: CreateFn;
    reset: () => void;
  }

  const confetti: ConfettiFn;
  export default confetti;
}
