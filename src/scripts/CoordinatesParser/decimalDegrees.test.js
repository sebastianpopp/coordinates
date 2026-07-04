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
    expect(decimalDegrees('58.20705 N / 8.33808 E')).toEqual(new Coordinates(58.20705, 8.33808));
    expect(decimalDegrees('58.20705 n / 8.33808 e')).toEqual(new Coordinates(58.20705, 8.33808));
});
