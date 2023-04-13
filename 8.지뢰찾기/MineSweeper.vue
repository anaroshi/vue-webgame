<template>
    <div>
        <mine-form />
        <div>{{timer}}</div>
        <table-component />
        <div>{{result}}</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import store, {OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, INCREMENT_TIMER} from './store';
    import TableComponent from './TableComponent'; // 자식 컴포넌트 불러오기
    import MineForm from './MineForm';

    let interval;

    export default {
        store,
        components: { // 자식 컴포넌트 등록
            'table-component': TableComponent,
            'mine-form': MineForm,
        },
        data() { // 변수 영역
            return {
            }
        },
        computed: { // 계산 영역
            ...mapState(['timer', 'result', 'halted']),
        },
        methods: { // 함수 영역
        },
        watch: {
            halted(value, oldValue) {
                if(value === false) { // false 일 때 게임 시작
                    interval = setInterval(() => {
                        this.$store.commit(INCREMENT_TIMER);
                    }, 1000);
                } else { // true 게임 중단
                    clearInterval(interval);
                }
            },
        },
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