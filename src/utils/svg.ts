export type Point = readonly [number, number];

export interface Scale {
  readonly max: number;
  readonly step: number;
}

const NICE_STEPS = [1, 2, 2.5, 5, 10] as const;

function fixed(value: number): string {
  return value.toFixed(2);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function smoothPath(points: readonly Point[], minY: number, maxY: number): string {
  const [first] = points;

  if (!first) {
    return '';
  }

  let path = `M${fixed(first[0])} ${fixed(first[1])}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index];
    const current = points[index];
    const next = points[index + 1];
    const after = points[index + 2] ?? next;
    const c1x = current[0] + (next[0] - previous[0]) / 6;
    const c1y = clamp(current[1] + (next[1] - previous[1]) / 6, minY, maxY);
    const c2x = next[0] - (after[0] - current[0]) / 6;
    const c2y = clamp(next[1] - (after[1] - current[1]) / 6, minY, maxY);

    path += ` C${fixed(c1x)} ${fixed(c1y)} ${fixed(c2x)} ${fixed(c2y)} ${fixed(next[0])} ${fixed(next[1])}`;
  }

  return path;
}

export function areaPath(points: readonly Point[], baseY: number, minY: number): string {
  const first = points[0];
  const last = points.at(-1);

  if (!first || !last) {
    return '';
  }

  return `${smoothPath(points, minY, baseY)} L${fixed(last[0])} ${baseY} L${fixed(first[0])} ${baseY} Z`;
}

export function niceScale(maxValue: number, divisions: number, minimum = 1): Scale {
  const raw = Math.max(maxValue, minimum) / divisions;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = (NICE_STEPS.find((candidate) => candidate * magnitude >= raw) ?? 10) * magnitude;

  return { max: step * divisions, step };
}

export function seriesToPoints(
  series: readonly (number | undefined)[],
  toX: (index: number) => number,
  toY: (value: number) => number,
): Point[] {
  return series.flatMap((value, index) =>
    value === undefined ? [] : [[toX(index), toY(value)] as const],
  );
}
