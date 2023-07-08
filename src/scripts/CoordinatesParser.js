import decimalDegrees from './CoordinatesParser/decimalDegrees';
import decimalMinutes from './CoordinatesParser/decimalMinutes';

class CoordinatesParser {
    parsers = [
        decimalDegrees,
        decimalMinutes,
    ];

    constructor(query) {
        this.query = query;
        this.coordinates = null;

        this._parse();
    }

    hasCoordinates() {
        return this.coordinates !== null;
    }

    getCoordinates() {
        return this.coordinates;
    }

    _parse() {
        for (const parser of this.parsers) {
            const coordinates = parser(this.query);

            if (coordinates !== null) {
                this.coordinates = coordinates;
                break;
            }
        }
    }
}

export default CoordinatesParser;
