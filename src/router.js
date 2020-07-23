import Vue from 'vue'
import VueRouter from 'vue-router'

import FeedList from './views/FeedList.vue'
import Feed from './views/Feed.vue'
import DesignerList from './views/DesignerList.vue'
import Designer from './views/Designer.vue'

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
            path: '/designer',
            name: 'DesignerList',
            component: DesignerList
        },
        {
            path: '/designer/add',
            name: 'Designer',
            component: Designer
        }
    ]
})
