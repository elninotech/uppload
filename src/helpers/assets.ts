import { UpploadService } from "../service";
import { UpploadEffect } from "../effect";

/**
 * Colors an SVG icon with the brand color for a service or effect
 * @param svg - SVG template string
 * @param service - Uppload service object
 */
export const colorSVG = (
  svg: string,
  service: UpploadService | UpploadEffect
) => (service.noRecolor ? svg : svg.replace(/#000/g, service.color || "#000"));
