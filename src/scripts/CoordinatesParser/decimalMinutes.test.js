import decimalMinutes from "./decimalMinutes";
import Coordinates from "../Coordinates";

test('return null if query does not match', () => {
    expect(decimalMinutes('')).toBeNull();
    expect(decimalMinutes('xyz')).toBeNull();
});

test('parses decimal minutes formats', () => {
    // No spaces, minutes with '
    expect(decimalMinutes('54°10.698\'N13°38.832\'E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54°10,698\'N13°38,832\'E')).toEqual(new Coordinates(54.178300, 13.647200));

    // No spaces, minutes with ‘
    expect(decimalMinutes('54°10.698‘N13°38.832‘E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54°10,698‘N13°38,832‘E')).toEqual(new Coordinates(54.178300, 13.647200));

    // Single space, minutes with '
    expect(decimalMinutes('54°10.698\' N13°38.832\' E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54°10,698\' N13°38,832\' E')).toEqual(new Coordinates(54.178300, 13.647200));

    // Single space, minutes with ‘
    expect(decimalMinutes('54°10.698‘N 13°38.832‘E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54°10,698‘N 13°38,832‘E')).toEqual(new Coordinates(54.178300, 13.647200));

    // Multiple spaces, minutes with '
    expect(decimalMinutes('54° 10.698\' N  13° 38.832\' E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54° 10,698\' N  13° 38,832\' E')).toEqual(new Coordinates(54.178300, 13.647200));

    // Multiple spaces, minutes with ‘
    expect(decimalMinutes('54° 10.698‘ N  13° 38.832‘ E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54° 10,698‘ N  13° 38,832‘ E')).toEqual(new Coordinates(54.178300, 13.647200));

    // Multiple spaces and a comma, minutes with '
    expect(decimalMinutes('54° 10.698\' N, 13° 38.832\' E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54° 10,698\' N, 13° 38,832\' E')).toEqual(new Coordinates(54.178300, 13.647200));

    // Single space, minutes with ‘, leading zero
    expect(decimalMinutes('54°10.698‘N 013°38.832‘E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54°10,698‘N 013°38,832‘E')).toEqual(new Coordinates(54.178300, 13.647200));
});
