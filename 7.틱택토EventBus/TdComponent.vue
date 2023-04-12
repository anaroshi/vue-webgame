<template>
    <td @click.prevent="onClickTd">{{cellData}}</td>
</template>

<script>
    import EventBus from './EventBus';

    export default {
        name: 'TdComponent',
        props: {            
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {
            onClickTd() {
                if(this.cellData) return; // cell 안에 값이 있는 경우 변경 못하게함.
                
                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
            },
        }
    };
</script>