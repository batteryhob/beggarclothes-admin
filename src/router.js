import Vue from 'vue'
import VueRouter from 'vue-router'

import FeedList from './views/FeedList.vue'
import Feed from './views/Feed.vue'
import FeedMod from './views/FeedMod.vue'
import DesignerList from './views/DesignerList.vue'
import Designer from './views/Designer.vue'
import DesignerMod from './views/DesignerMod.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/feed',
            name: 'FeedList',
            component: FeedList
        },
        {
            path: '/feed/add',
            name: 'Feed',
            component: Feed
        },
        {
            path: '/feed/:seq',
            name: 'FeedMod',
            component: FeedMod
        },
        {
            path: '/designer',
            name: 'DesignerList',
            component: DesignerList
        },
        {
            path: '/designer/add',
            name: 'Designer',
            component: Designer
        },
        {
            path: '/designer/:seq',
            name: 'DesignerMod',
            component: DesignerMod
        }
    ]
})
