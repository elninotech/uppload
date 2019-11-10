import { UpploadService } from "../service";
import { UpploadEffect } from "../effect";

export const colorSVG = (
  svg: string,
  service: UpploadService | UpploadEffect
) => (service.noRecolor ? svg : svg.replace(/#000/g, service.color || "#000"));
