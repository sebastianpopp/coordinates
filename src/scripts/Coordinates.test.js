import Coordinates from "./Coordinates";

test('constructor', () => {
    const coordinates = new Coordinates(54.178300, 13.647200);

    expect(coordinates.latitude).toBe(54.178300);
    expect(coordinates.longitude).toBe(13.647200);
});

test('toDecimalDegrees', () => {
    expect(new Coordinates(54.178300, 13.647200).toDecimalDegrees()).toBe('54.178300 13.647200');
    expect(new Coordinates(54, 13).toDecimalDegrees()).toBe('54.000000 13.000000');
});

test('toDecimalMinutes', () => {
    expect(new Coordinates(54.178300, 13.647200).toDecimalMinutes()).toBe('54°10.698\'N 13°38.832\'E');
    expect(new Coordinates(54, 13).toDecimalMinutes()).toBe('54°0.000\'N 13°0.000\'E');
    expect(new Coordinates(-54.178300, -13.647200).toDecimalMinutes()).toBe('54°10.698\'S 13°38.832\'W');
    expect(new Coordinates(-54, -13).toDecimalMinutes()).toBe('54°0.000\'S 13°0.000\'W');
});

test('toSeconds', () => {
    expect(new Coordinates(54.178300, 13.647200).toSeconds()).toBe('54°10\'41.88"N 13°38\'49.92"E');
    expect(new Coordinates(54, 13).toSeconds()).toBe('54°0\'0.00"N 13°0\'0.00"E');
    expect(new Coordinates(-54.178300, -13.647200).toSeconds()).toBe('54°10\'41.88"S 13°38\'49.92"W');
    expect(new Coordinates(-54, -13).toSeconds()).toBe('54°0\'0.00"S 13°0\'0.00"W');
});

test('toGoogleMapsLink', () => {
    expect(new Coordinates(54.178300, 13.647200).toGoogleMapsLink()).toBe('https://www.google.com/maps/search/?api=1&query=54.1783,13.6472');
    expect(new Coordinates(54, 13).toGoogleMapsLink()).toBe('https://www.google.com/maps/search/?api=1&query=54,13');
});

test('toAppleMapsLink', () => {
    expect(new Coordinates(54.178300, 13.647200).toAppleMapsLink()).toBe('https://maps.apple.com/?q=54.1783,13.6472');
    expect(new Coordinates(54, 13).toAppleMapsLink()).toBe('https://maps.apple.com/?q=54,13');
});

test('toOpenStreetMapLink', () => {
    expect(new Coordinates(54.178300, 13.647200).toOpenStreetMapLink()).toBe('https://www.openstreetmap.org/?mlat=54.1783&mlon=13.6472&zoom=16');
    expect(new Coordinates(54, 13).toOpenStreetMapLink()).toBe('https://www.openstreetmap.org/?mlat=54&mlon=13&zoom=16');
});

test('toString', () => {
    expect(new Coordinates(54.178300, 13.647200).toString()).toBe('54.178300, 13.647200');
    expect(new Coordinates(54, 13).toString()).toBe('54.000000, 13.000000');
});
