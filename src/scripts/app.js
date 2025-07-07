import Alpine from 'alpinejs';
import CoordinatesParser from './CoordinatesParser';

Alpine.data('coordinates', () => ({
    query: '',
    coordinates: null,

    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('q') && params.get('q') !== null) {
            this.query = params.get('q');
        }

        this.$nextTick(() => {
            this.$refs.query.focus();
            this.$refs.query.setSelectionRange(0, this.$refs.query.value.length);
        });

        Alpine.effect(() => {
            const url = new URL(window.location);
            if (this.query) {
                url.searchParams.set('q', this.query);
            } else {
                url.searchParams.delete('q');
            }
            window.history.replaceState({}, '', url);

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
