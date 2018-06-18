export const coords = actives => {
  return actives.map(location => {
    return {
      longitude: location.GEOJSON.COORDINATES[0],
      latitude: location.GEOJSON.COORDINATES[1]
    };
  });
};

export const getRegionForCoordinates = points => {
  let minX, maxX, minY, maxY;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
};

export function weatherIcon (weather) {
  switch (weather) {
    case 'clear-day':
      return 'weather-sunny';
    case 'clear-night':
    case 'partly-cloudy-night':
      return 'weather-night';
    case 'rain':
      return 'weather-rainy';
    case 'snow':
      return 'weather-snowy';
    case 'sleet' || 'hail':
      return 'weather-hail';
    case 'wind':
      return 'weather-windy';
    case 'fog':
      return 'weather-fog';
    case 'cloudy':
      return 'weather-cloudy';
    case 'thunderstorm':
      return 'weather-lightning-rainy';
    case 'tornado':
      return 'weather-hurricane';
    default:
      return 'weather-cloudy';
  }
}
