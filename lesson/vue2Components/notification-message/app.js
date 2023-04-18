Vue.component('notification-message', {
    template: '#notification-message-template',
    props: {
        type: {
            type: String,
            default: 'info'
        },
        header: {
            type: String,
            default: 'information'
        }
    },
    data() {
        return {
            hidden: false
        }
    },
    methods: {
        hide () {
            this.hidden = true
        }
    }
})

const app = new Vue({
    el: '#app'
})