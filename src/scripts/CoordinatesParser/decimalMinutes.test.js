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

    // Single space, minutes with ’, leading zero
    expect(decimalMinutes('54°10.698’N 013°38.832’E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54°10,698’N 013°38,832’E')).toEqual(new Coordinates(54.178300, 13.647200));

    // Minutes separated by dash
    expect(decimalMinutes('54-10.698N 013-38.832E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54-10.698 N / 013-38.832 E')).toEqual(new Coordinates(54.178300, 13.647200));
    expect(decimalMinutes('54-11 N / 013-39 E')).toEqual(new Coordinates(54.18333333333333, 13.65));

    // Minutes separated by star
    expect(decimalMinutes('54*10.698 N , 13*38.832 E')).toEqual(new Coordinates(54.178300, 13.647200));

    // Leading direction
    expect(decimalMinutes('N 54°10.698\' E 13°38.832\'')).toEqual(new Coordinates(54.178300, 13.647200));
});
