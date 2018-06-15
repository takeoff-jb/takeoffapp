export const avgLatLong = obj => {
  const latitude =
    obj.reduce((acc, cv) => acc + cv.GEOJSON.COORDINATES[1], 0) / obj.length;
  const longitude =
    obj.reduce((acc, cv) => acc + cv.GEOJSON.COORDINATES[0], 0) / obj.length;
  return { latitude, longitude };
};

export const coords = actives => {
  actives.map(location => {
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
