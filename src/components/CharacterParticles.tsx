import { FC } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { ISourceOptions } from "tsparticles-engine";

type ParticleProps = {
  color: string;
  particleConfig?: {
    number?: number;
    size?: number;
    speed?: number;
    opacity?: number;
    shape?: string;
  };
};

export const CharacterParticles: FC<ParticleProps> = ({ 
  color,
  particleConfig 
}) => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: particleConfig?.number ?? 15 },
      size: { value: particleConfig?.size ?? 3 },
      color: { value: color },
      move: { enable: true, speed: particleConfig?.speed ?? 0.8 },
      opacity: { value: particleConfig?.opacity ?? 0.4 },
      shape: { type: particleConfig?.shape ?? "circle" },
    },
  };

  return (
    <Particles
      init={particlesInit}
      options={options}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};