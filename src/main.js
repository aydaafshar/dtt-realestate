import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faTrash,
    faCircleXmark,
    faMagnifyingGlass,
    faBath,
    faBed,
    faSquare,
    faPen,
    faPlus,
    faArrowLeft,
    faHome,
    faInfoCircle,
    faLocationDot,
    faEuroSign,
    faExpand,
    faTrowelBricks,
    faWarehouse,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faWarehouse,
    faTrowelBricks,
    faLocationDot,
    faExpand,
    faEuroSign,
    faHome,
    faInfoCircle,
    faArrowLeft,
    faTrash,
    faCircleXmark,
    faMagnifyingGlass,
    faBath,
    faBed,
    faSquare,
    faPen,
    faPlus
)

const app = createApp(App)
// load pinea
app.use(createPinia())
// add font-awesome-icon as a global component
app.component('font-awesome-icon', FontAwesomeIcon)
//add router
app.use(router)
app.mount('#app')
