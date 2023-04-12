<template>
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import TableComponent from './TableComponent'; // 자식 컴포넌트 불러오기
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
            }
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