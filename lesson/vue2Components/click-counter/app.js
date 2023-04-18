Vue.component('click-counter', {
    template: '#click-counter-template',
    data() {
        return {
            count: 0
        }
    }
})

let app = new Vue({
    el: '#app'
});