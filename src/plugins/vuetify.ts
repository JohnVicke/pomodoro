import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import SettingsIcon from '@/components/SettingsIcon.vue';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            custom: {
                component: SettingsIcon,
            },
        },
    },
    breakpoint: {
        thresholds: {
            xs: 376,
        },
    },
});
