const HELSINKI_AREA = {
    north:  61.4755,
    south: 59.1792,
    east: 25.56,
    west: 24.0608
  };
  export const HELSINKI = { "lat": 60.19, "lng": 24.95 }
  export const MAP_OPTIONS = {
      center: HELSINKI,
      streetViewControl: false,
      zoom: 12,
      restriction: {
          latLngBounds: HELSINKI_AREA,
          strictBounds: false
        }
  }