class Coordinates {
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @constructor
     */
    constructor(latitude, longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
    }

    /**
     * @returns {string}
     */
    toDecimalDegrees() {
        return `${this.latitude.toFixed(6)} ${this.longitude.toFixed(6)}`;
    }

    /**
     * @param {number} decimalDegrees
     * @param {boolean} isLatitude
     * @returns {string}
     * @private
     */
    _toDecimalMinutes(decimalDegrees, isLatitude) {
        const abs = Math.abs(decimalDegrees);
        const degrees = Math.floor(abs);
        const frac = abs - degrees;
        const minutes = (frac * 60).toFixed(3);
        const direction = isLatitude
            ? decimalDegrees > 0 ? 'N' : 'S'
            : decimalDegrees > 0 ? 'E' : 'W';

        return `${degrees}°${minutes}'${direction}`;
    }

    /**
     * @returns {string}
     */
    toDecimalMinutes() {
        return `${this._toDecimalMinutes(this.latitude, true)} ${this._toDecimalMinutes(this.longitude, false)}`
    }

    /**
     * @param {number} decimalDegrees
     * @param {boolean} isLatitude
     * @returns {string}
     * @private
     */
    _toSeconds(decimalDegrees, isLatitude) {
        const abs = Math.abs(decimalDegrees);
        const degrees = Math.floor(abs);
        const frac = abs - degrees;
        const minutes = Math.floor(frac * 60);
        const seconds = (frac * 3600 - minutes * 60).toFixed(2);
        const direction = isLatitude
            ? decimalDegrees > 0 ? 'N' : 'S'
            : decimalDegrees > 0 ? 'E' : 'W';

        return `${degrees}°${minutes}'${seconds}"${direction}`;
    }

    /**
     * @returns {string}
     */
    toSeconds() {
        return `${this._toSeconds(this.latitude, true)} ${this._toSeconds(this.longitude, false)}`
    }

    /**
     * @returns {string}
     */
    toGoogleMapsLink() {
        return `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`;
    }

    /**
     * @returns {string}
     */
    toAppleMapsLink() {
        return `https://maps.apple.com/?q=${this.latitude},${this.longitude}`;
    }

    /**
     * @returns {string}
     */
    toOpenStreetMapLink(zoom = 16) {
        return `https://www.openstreetmap.org/?mlat=${this.latitude}&mlon=${this.longitude}&zoom=${zoom}`;
    }

    /**
     * @returns {Promise<string>}
     */
    async toCity() {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=en_US&lat=${this.latitude}&lon=${this.longitude}`);
        const data = await response.json();

        if (!data.address || !data.address.city) {
            return 'Unknown';
        }

        return `${data.address.city}, ${data.address.country}`;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.latitude.toFixed(6)}, ${this.longitude.toFixed(6)}`;
    }
}

export default Coordinates;
