/**
 * mapCoords.ts
 *
 * Approximate lat/lng coordinates for each Oak Glen business.
 * Kept separate from mockData.ts so coordinate updates don't
 * require touching business copy or hours.
 *
 * All points are along Oak Glen Road / South Oak Glen Road,
 * San Bernardino Mountains, CA (~4,800 ft elevation).
 * Center of community: 34.041°N, 116.932°W
 */

export interface LatLng {
  lat: number;
  lng: number;
}

/** slug → [lat, lng] */
export const BUSINESS_COORDS: Record<string, LatLng> = {
  "moms-country-orchards":                    { lat: 34.0418, lng: -116.9338 },
  "snow-line-orchards":                       { lat: 34.0458, lng: -116.9382 },
  "los-rios-rancho":                          { lat: 34.0410, lng: -116.9288 },
  "stone-pantry-orchard":                     { lat: 34.0435, lng: -116.9362 },
  "willowbrook-apple-farm":                   { lat: 34.0446, lng: -116.9348 },
  "stone-soup-farm":                          { lat: 34.0298, lng: -116.9242 },
  "oak-glen-steak-house":                     { lat: 34.0422, lng: -116.9325 },
  "wilshires-apple-shed":                     { lat: 34.0413, lng: -116.9295 },
  "oak-glen-cider-company":                   { lat: 34.0406, lng: -116.9282 },
  "apple-blossom-ranch":                      { lat: 34.0402, lng: -116.9335 },
  "stone-oak-manor":                          { lat: 34.0392, lng: -116.9305 },
  "oak-glen-christian-conference-center":     { lat: 34.0368, lng: -116.9315 },
  "riley-s-farm":                             { lat: 34.0399, lng: -116.9352 },
  "oak-tree-mountain":                        { lat: 34.0388, lng: -116.9318 },
  "the-homestead-at-wilshire-ranch":          { lat: 34.0432, lng: -116.9342 },
  "oak-glen-schoolhouse-museum":              { lat: 34.0409, lng: -116.9322 },
};

// Map center and default zoom are driven by siteConfig.map in lib/config/site.ts.
