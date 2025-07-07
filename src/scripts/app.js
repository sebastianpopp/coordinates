import Alpine from 'alpinejs';
import CoordinatesParser from './CoordinatesParser';

Alpine.data('coordinates', () => ({
    query: '',
    coordinates: null,

    init() {
        this.$nextTick(() => {
            this.$refs.query.focus();
        });

        Alpine.effect(() => {
            const coordinatesParser = new CoordinatesParser(this.query);

            this.coordinates = coordinatesParser.hasCoordinates()
                ? coordinatesParser.getCoordinates()
                : null;

            if (this.query !== '') {
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
