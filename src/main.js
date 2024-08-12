import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faTrash, faCircleXmark, faMagnifyingGlass,
    faBath, faBed, faSquare, faPen, faPlus,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons"
library.add(faArrowLeft, faTrash, faCircleXmark, faMagnifyingGlass, faBath, faBed, faSquare, faPen, faPlus)

const app = createApp(App)
app.use(createPinia())
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router)
app.mount('#app')
