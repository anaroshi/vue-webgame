<template>
    <table>
        <tr-component v-for="(rowData, index) in tableData" :row-data="rowData" :rowIndex="index" :key="index"></tr-component>
    </table>    
</template>

<script>
    import TrComponent from './TrComponent'; 
    export default {
        components: {
            'tr-component': TrComponent,
        },
        name: 'TableComponent',
        props: {
            tableData: Array,    
        },
        data() {
            return {

            };
        },
    }
</script>