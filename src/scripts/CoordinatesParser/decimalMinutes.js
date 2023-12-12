import Coordinates from "../Coordinates";

export default function decimalMinutes (query) {
    const regex = RegExp([
        '^',

        '(\\d+)', // Latitude degrees
        '[-°\\s]+',
        '(\\d+[.,]\\d+)', // Latitude minutes
        "['‘’]?",
        '\\s*',
        '([NS])', // Latitude direction

        '[\\s,]*',

        '(\\d+)', // Longitude degrees
        '[-°\\s]+',
        '(\\d+[.,]\\d+)', // Longitude minutes
        "['‘’]?",
        '\\s*',
        '([EW])', // Longitude direction

        '$',
    ].join(''));

    const matches = query.toUpperCase().match(regex);

    if (!matches) {
        return null;
    }

    const latDegrees = parseFloat(matches[1]);
    const latMinutes = parseFloat(matches[2].replace(',', '.'));
    const latDirection = matches[3];

    const lonDegrees = parseFloat(matches[4]);
    const lonMinutes = parseFloat(matches[5].replace(',', '.'));
    const lonDirection = matches[6];

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
