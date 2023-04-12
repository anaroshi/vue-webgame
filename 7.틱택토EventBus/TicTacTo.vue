<template>
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import TableComponent from './TableComponent'; // 자식 컴포넌트 불러오기
    import EventBus from './EventBus'; // ro

    export default {
        components: { // 자식 컴포넌트 등록
            'table-component': TableComponent,
        },
        data() { // 변수 영역
            return {
                tableData: [
                    ['','',''],
                    ['','',''],
                    ['','',''],
                ],
                turn: 'O',
                winner: '',
            };
        },
        computed: { // 계산 영역

        },
        methods: { // 함수 영역
            onChangeData() {
                // vue 특이점 : 일반값은 정상 작동하나 배열의 경우만은 (위치[][] 지정) 값을 넣어줘도 작동하지 않음. 별도의 표현법(this.$set)을 써야함
                //this.tableData[1][0] = 'X'; 
                this.$set(this.tableData[1], '0', 'X');
            },
            onClickTd(rowIndex, cellIndex) { // 사용자가 만든 이벤트
                console.log(rowIndex, cellIndex);

                // 배열에서 인덱스를 이용시 this.$set(this.items, index, val);
                this.$set(this.tableData[rowIndex], cellIndex,this.turn); // 테이블 안의 td 위치의 값 변경 표현법 사용하기

                let win = false;
                if(this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
                    win = true;
                }
                if(this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
                    win = true;
                }
                if(this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
                    win = true;
                }
                if(this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
                    win = true;
                }
                if(win) { // 이긴 경우
                    this.winner = this.turn;
                    this.turn = 'O';
                    this.tableData = [["","",""],["","",""],["","",""]];
                } else {  // 무승부인 경우
                    let all = true; // all이 true면 무승부라는 뜻
                    this.tableData.forEach((row) => { // 무승부 검사
                        row.forEach((cell) => {
                            if(!cell) {
                                all = false;
                            }
                        });
                    });
                    if(all) { // 무승부
                        this.winner = this.turn;
                        this.turn = 'O';
                        this.tableData = [["","",""],["","",""],["","",""]];
                    } else {
                        this.turn = this.turn === 'O'? 'X':'O'; // 부모 컴포턴트 데이터 조작 가능
                    }
                }
            }
        },
        created() { // 화면에 나타나기 전 (자바스크립내에 값을 가지고 있는거)
            console.log("created");
            EventBus.$on('clickTd', this.onClickTd); // 사용자가 만든 이벤트 등록 => 이벤트를 중앙에서 통제하는 시스템
        }
    };
</script>

<style>
    table {
        border-collapse: collapse;
    }

    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>