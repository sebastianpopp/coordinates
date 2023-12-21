import Alpine from 'alpinejs';
import CoordinatesParser from './CoordinatesParser';
import Coordinates from './Coordinates';

Alpine.data('coordinates', () => ({
    query: '',
    coordinates: null,

    init() {
        const coordinates = [
            new Coordinates(53.56643, 10.01484), // Hamburg
            new Coordinates(34.05598, -118.32655), // Los Angeles
            new Coordinates(-33.85758, 151.17868), // Sydney
            new Coordinates(-22.89435, -43.39272), // Rio de Janeiro
        ];

        this.query = coordinates[Math.floor(Math.random() * coordinates.length)].toDecimalMinutes();

        this.$nextTick(() => {
            this.$refs.query.focus();
            this.$refs.query.setSelectionRange(0, this.$refs.query.value.length);
        });

        Alpine.effect(() => {
            const coordinatesParser = new CoordinatesParser(this.query);

            this.coordinates = coordinatesParser.hasCoordinates()
                ? coordinatesParser.getCoordinates()
                : null;

            if (this.query !== '' && !coordinates.some(c => c.toDecimalMinutes() === this.query)) {
                window._paq = window._paq || [];
                _paq.push(['trackSiteSearch',
                    this.query,
                    false,
                    this.coordinates === null ? 0 : 1
                ]);
            }
        });
    },

    copy() {
        const value = this.$el.innerText;

        navigator.clipboard.writeText(value);

        this.$el.setAttribute('tooltip', 'Copied!');
        setTimeout(() => {
            this.$el.setAttribute('tooltip', 'Click to copy');
        }, 2000);
    },

    reportErrorUrl() {
        if (!this.query) {
            return null;
        }

        const body = `**Query:** ${this.query}  \n**Result:** ${this.coordinates?.toString() ?? 'null'}`;

        return `https://github.com/sebastianpopp/coordinates/issues/new?title=Error%20report&body=${encodeURIComponent(body)}`;
    },
}));

Alpine.start();
