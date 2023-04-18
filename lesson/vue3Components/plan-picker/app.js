let PlanPickerItemComponent  = {
    template: '#plan-picker-item-template',
    props: {
        name: {type: String, default: 'The Single', required: true},
        selected: {type: Boolean, default: false}
    },
    methods:{
        select(){
            this.$emit('select', this.name)
        }
    }
}

let PlanPickerComponent = {
    components: {
        'plan-item': PlanPickerItemComponent,
    },
    template: '#plan-picker-template',
    data() {
        return{
            plans: [
                'The Single',
                'The Curious',
                'The Addict'
            ],
            selectedPlan: null
        }
    },
    methods: {
        selectPlan(plan){
            this.selectedPlan = plan
        }
    }
}

Vue.createApp({
    components: {
        'plan-picker': PlanPickerComponent
    }
})
.mount('#app')