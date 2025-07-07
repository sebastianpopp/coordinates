import Coordinates from "../Coordinates";

export default function decimalMinutes (query) {
    const regex = RegExp([
        '^',

        '([NS])?', // Latitude direction
        '\\s*',
        '(\\d+)', // Latitude degrees
        '[-°*\\s]+',
        '(\\d+([.,]\\d+)?)', // Latitude minutes
        "['‘’]?",
        '\\s*',
        '([NS])?', // Latitude direction

        '[\\s,/]*',

        '([EW])?', // Longitude direction
        '\\s*',
        '(\\d+)', // Longitude degrees
        '[-°*\\s]+',
        '(\\d+([.,]\\d+)?)', // Longitude minutes
        "['‘’]?",
        '\\s*',
        '([EW])?', // Longitude direction

        '$',
    ].join(''));

    const matches = query.toUpperCase().match(regex);

    if (!matches) {
        return null;
    }

    const latDegrees = parseFloat(matches[2]);
    const latMinutes = parseFloat(matches[3].replace(',', '.'));
    const latDirection = matches[1] ?? matches[5];

    const lonDegrees = parseFloat(matches[7]);
    const lonMinutes = parseFloat(matches[8].replace(',', '.'));
    const lonDirection = matches[6] ?? matches[10];

    let latDecimalDegrees = latDegrees + (latMinutes / 60);
    let lonDecimalDegrees = lonDegrees + (lonMinutes / 60);

    if (latDirection === 'S') {
        latDecimalDegrees *= -1;
    }

    if (lonDirection === 'W') {
        lonDecimalDegrees *= -1;
    }

    return new Coordinates(latDecimalDegrees, lonDecimalDegrees);
}
