<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :row-index="rowIndex" :cell-data="cellData" :cell-index="index" :key="index"></td-component>
    </tr>    
</template>

<script>
    import TdComponent from './TdComponent';
    export default {
        components: {
            'td-component': TdComponent,
        },
        name: 'TrComponent',
        props: {
            rowData: Array,
            rowIndex: Number,
        },
        data() {
            return {
                parent: "'I'm your father!",
            }
        }
    }
</script>