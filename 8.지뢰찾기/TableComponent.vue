<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td 
                v-for="(cellData, cellIndex) in rowData" 
                :key="cellIndex" 
                :style="cellDataStyle(rowIndex, cellIndex)" 
                @click="onClickTd(rowIndex, cellIndex)" 
                @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
            >
                {{cellDataText(rowIndex, cellIndex)}}
            </td>
        </tr>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import { CODE, OPEN_CELL, FLAG_CELL, NORMALIZE_CELL, QUESTION_CELL } from './store';
import { CLICK_MINE } from './store';

export default {    
    computed: {
        ...mapState(['tableData', 'halted']),
        cellDataStyle(state) {
            return (row, cell) => {
                switch(this.$store.state.tableData[row][cell]) {
                    case CODE.NORMAL:
                    case CODE.MINE:
                        return {
                            background: '#444',
                        };
                    case CODE.CLICKED_MINE:
                    case CODE.OPENED:
                        return {
                            background: 'white',
                        };
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return {
                            background: 'red',
                        };
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return {
                            background: 'yellow',
                        };
                    default:
                        return {};
                };
            };    
        },
        cellDataText() {
            return function(row, cell) {
                switch(this.$store.state.tableData[row][cell]) {
                    case CODE.NORMAL:
                        return '';
                    case CODE.MINE:
                        return 'X';
                    case CODE.CLICKED_MINE:
                        return '펑!';                
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return '!';
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return '?';
                    default:
                        return this.$store.state.tableData[row][cell] || ''; // 지뢰 갯수가 0이면 빈칸으로 나오게
                };
            };
        },        
    },
    methods: {
        onClickTd(row, cell) {
            // 마우스 왼쪽 클릭
            if(this.halted) { // 게임이 중단된 경우
                return; // 칸 클릭이 안되게
            }
            
            switch(this.tableData[row][cell]) {
                case CODE.NORMAL:
                    this.$store.commit(OPEN_CELL, {row, cell});
                    return;
                case CODE.MINE:
                    this.$store.commit(CLICK_MINE, {row, cell});
                    return;
                default:
                    return;
            }
        },
        onRightClickTd(row, cell) {
            // 마우스 오른쪽 클릭
            if(this.halted) { // 게임이 중단된 경우
                return; // 칸 클릭이 안되게
            }
            
            switch(this.tableData[row][cell]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    this.$store.commit(FLAG_CELL, {row, cell});
                    return;
                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    this.$store.commit(QUESTION_CELL, {row, cell});
                    return;
                case CODE.QUESTION_MINE:
                case CODE.QUESTION:
                    this.$store.commit(NORMALIZE_CELL, {row, cell});
                    return;    
            }
        },
    }
};
</script>