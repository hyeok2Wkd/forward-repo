import { getCanonicalShapeType } from './shapeFactoryRegistry';

const SVG_SOURCE_BY_TYPE = Object.freeze({
  stocker: {
    label: 'Stocker',
    fileName: 'stocker.svg',
    url: new URL('../../svg/stocker.svg', import.meta.url).href,
  },
  conveyor: {
    label: 'Conveyor',
    fileName: 'conveyor.svg',
    url: new URL('../../svg/conveyor.svg', import.meta.url).href,
  },
  port: {
    label: 'Port',
    fileName: 'port.svg',
    url: new URL('../../svg/port.svg', import.meta.url).href,
  },
  process: {
    label: 'Process',
    fileName: 'process.svg',
    url: new URL('../../svg/process.svg', import.meta.url).href,
  },
  crane: {
    label: 'Crane',
    fileName: 'crane.svg',
    url: new URL('../../svg/crane.svg', import.meta.url).href,
  },
  agvLine: {
    label: 'AGV Line',
    fileName: 'AGV line.svg',
    url: new URL('../../svg/AGV line.svg', import.meta.url).href,
  },
  ohsLine: {
    label: 'OHS Line',
    fileName: 'OHS line.svg',
    url: new URL('../../svg/OHS line.svg', import.meta.url).href,
  },
  ohtLine: {
    label: 'OHT Line',
    fileName: 'OHT line.svg',
    url: new URL('../../svg/OHT line.svg', import.meta.url).href,
  },
  bridge: {
    label: 'Bridge',
    fileName: 'bridge.svg',
    url: new URL('../../svg/bridge.svg', import.meta.url).href,
  },
  lifter: {
    label: 'Lifter',
    fileName: 'lifter.svg',
    url: new URL('../../svg/lifter.svg', import.meta.url).href,
  },
  mic: {
    label: 'MIC',
    fileName: 'MIC.svg',
    url: new URL('../../svg/MIC.svg', import.meta.url).href,
  },
  railBuffer: {
    label: 'Rail Buffer',
    fileName: 'rail buffer.svg',
    url: new URL('../../svg/rail buffer.svg', import.meta.url).href,
  },
  fullRate: {
    label: 'Full Rate',
    fileName: 'full rate.svg',
    url: new URL('../../svg/full rate.svg', import.meta.url).href,
  },
  stb: {
    label: 'STB',
    fileName: 'STB.svg',
    url: new URL('../../svg/STB.svg', import.meta.url).href,
  },
  vehicle1: {
    label: 'Vehicle 1',
    fileName: 'vehicle1.svg',
    url: new URL('../../svg/vehicle1.svg', import.meta.url).href,
  },
  vehicle2: {
    label: 'Vehicle 2',
    fileName: 'vehicle2.svg',
    url: new URL('../../svg/vehicle2.svg', import.meta.url).href,
  },
  vehicle3: {
    label: 'Vehicle 3',
    fileName: 'vehicle3.svg',
    url: new URL('../../svg/vehicle3.svg', import.meta.url).href,
  },
  zone: {
    label: 'Zone',
    fileName: 'zone.svg',
    url: new URL('../../svg/zone.svg', import.meta.url).href,
  },
  zoneContainer: {
    label: 'Zone Container',
    fileName: 'zone container.svg',
    url: new URL('../../svg/zone container.svg', import.meta.url).href,
  },
});

export function getSvgSourceForShapeType(type) {
  const canonicalType = getCanonicalShapeType(type);
  if (!canonicalType || !SVG_SOURCE_BY_TYPE[canonicalType]) return null;

  return {
    type: canonicalType,
    ...SVG_SOURCE_BY_TYPE[canonicalType],
  };
}
