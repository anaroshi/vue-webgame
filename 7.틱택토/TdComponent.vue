<template>
    <td @click.prevent="onClickTd">{{cellData}}</td>
</template>

<script>
    export default {
        name: 'TdComponent',
        props: {            
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {
            onClickTd() {
                // console.log("root data : "+this.$root.$data);
                // console.log("root data(turn) : "+this.$root.$data.turn);
                // console.log("parent data : "+this.$parent.$data);
                // console.log("parent data(parent) : "+this.$parent.$data.parent);

                if(this.cellData) return; // cell 안에 값이 있는 경우 변경 못하게함.

                const rootData = this.$root.$data;
                // 배열에서 인덱스를 이용시 this.$set(this.items, index, val);
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex,rootData.turn); // 테이블 안의 td 위치의 값 변경 표현법 사용하기

                let win = false;
                if(rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
                    win = true;
                }
                if(rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
                    win = true;
                }
                if(rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
                    win = true;
                }
                if(rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
                    win = true;
                }
                if(win) { // 이긴 경우
                    rootData.winner = rootData.turn;
                    rootData.turn = 'O';
                    rootData.tableData = [["","",""],["","",""],["","",""]];
                } else {  // 무승부인 경우
                    let all = true; // all이 true면 무승부라는 뜻
                    rootData.tableData.forEach((row) => { // 무승부 검사
                        row.forEach((cell) => {
                            if(!cell) {
                                all = false;
                            }
                        });
                    });
                    if(all) { // 무승부
                        rootData.winner = rootData.turn;
                        rootData.turn = 'O';
                        rootData.tableData = [["","",""],["","",""],["","",""]];
                    } else {
                        rootData.turn = rootData.turn === 'O'? 'X':'O'; // 부모 컴포턴트 데이터 조작 가능
                    }
                }
            },
        }
    };
</script>