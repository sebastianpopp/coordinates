import decimalDegrees from "./decimalDegrees";
import Coordinates from "../Coordinates";

test('return null if query does not match', () => {
    expect(decimalDegrees('')).toBeNull();
    expect(decimalDegrees('xyz')).toBeNull();
});

test('parses decimal degrees formats', () => {
    expect(decimalDegrees('54.178300, 13.647200')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalDegrees('54,178300, 13,647200')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalDegrees('54.178300 13.647200')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalDegrees('54,178300 13,647200')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalDegrees('54.178300  13.647200')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalDegrees('54,178300  13,647200')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalDegrees('54  13.647200')).toEqual(new Coordinates(54.0, 13.647200));
    expect(decimalDegrees('54,178300  13')).toEqual(new Coordinates(54.178300, 13.0));
});
