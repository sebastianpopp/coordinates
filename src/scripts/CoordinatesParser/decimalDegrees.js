import Coordinates from "../Coordinates";

export default function decimalDegrees (query) {
    const regex = RegExp([
        '^',
        '(-?\\d+([\\.,]\\d+)?)',
        '[°]?',
        '\\s*',
        '[ns]?',
        '[\\s,]*',
        '(-?\\d+([\\.,]\\d+)?)',
        '[°]?',
        '\\s*',
        '[ew]?',
        '$'
    ].join(''));

    const matches = query.match(regex);

    if (matches === null) {
        return null;
    }

    const latitude = parseFloat(matches[1].replace(',', '.'));
    const longitude = parseFloat(matches[3].replace(',', '.'));

    return new Coordinates(latitude, longitude);
}
