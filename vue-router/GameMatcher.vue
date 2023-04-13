<template>
    <div v-if="currentGame === 'number-baseball'">
        <number-baseball></number-baseball>
    </div>
    <div v-else-if="currentGame === 'response-check'">
        <response-check></response-check>
    </div>
    <div v-else-if="currentGame === 'rock-scissors-paper'">
        <rock-scissors-paper></rock-scissors-paper>
    </div>
    <div v-else-if="currentGame === 'lotto-generator'">
        <lotto-generator></lotto-generator>
    </div>
    <div v-else-if="currentGame === 'tik-tac-to'">
        <tik-tac-to></tik-tac-to>
    </div>
    <div v-else-if="currentGame === 'mine-sweeper'">
        <mine-sweeper></mine-sweeper>
    </div>
    <div v-else>일치하는 게임이 없습니다</div>
</template>

<script>
    import NumberBaseball   from '../3.숫자야구/NumberBaseball';
    import ResponseCheck    from '../4.반응속도체크/ResponseCheck';
    import RockScissorsPaper from '../5.가위바위보/RockScissorsPaper';
    import LottoGenerator   from '../6.로또/LottoGenerator';
    import TicTacTo         from '../7.틱택토/TicTacTo';
    import MineSweeper      from '../8.지뢰찾기/MineSweeper';
    
    export default {
        render() {            
        },
        components: {
            'number-baseball':      NumberBaseball,
            'response-check':       ResponseCheck,
            'rock-scissors-paper':  RockScissorsPaper,
            'lotto-generator':      LottoGenerator,
            'tik-tac-to':           TicTacTo,
            'mine-sweeper':         MineSweeper,
        },
        mounted() {
            console.log("router : ", this.$router);
            console.log("route : ", this.$route);
        },
        computed: {
            currentGame() {
                return this.$route.params.name;
            },
        },
    };
</script>