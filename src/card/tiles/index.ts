import type { TileRenderer } from '../types';
import { BATTERY_TILE } from './battery-tile';
import { GRID_TILE } from './grid-tile';
import { LOAD_TILE } from './load-tile';
import { SOLAR_TILE } from './solar-tile';

export const TILE_RENDERERS: readonly TileRenderer[] = [
  SOLAR_TILE,
  BATTERY_TILE,
  GRID_TILE,
  LOAD_TILE,
];
