import Vue from 'vue';
import VueRouter from 'vue-router';

//import NumberBaseball   from '../3.숫자야구/NumberBaseball';
// import ResponseCheck    from '../4.반응속도체크/ResponseCheck';
// import RockScissorsPaper from '../5.가위바위보/RockScissorsPaper';
// import LottoGenerator   from '../6.로또/LottoGenerator';
// import TicTacTo         from '../7.틱택토/TicTacTo';
// import MineSweeper      from '../8.지뢰찾기/MineSweeper';
// import GameMatcher      from './GameMatcher';
// import시 모든 import를 읽어와서 화면에 뿌려주지만 아래와 같이 하면 해당화면만 읽어와서 보여준다. (처리속도개선)

const GameMatcher = () => import("./GameMatcher");
const NumberBaseball = () => import("../3.숫자야구/NumberBaseball");
const ResponseCheck = () => import("../4.반응속도체크/ResponseCheck");
const RockScissorsPaper = () => import("../5.가위바위보/RockScissorsPaper");
const LottoGenerator = () => import("../6.로또/LottoGenerator");
const TicTacTo = () => import("../7.틱택토/TicTacTo");
const MineSweeper = () => import("../8.지뢰찾기/MineSweeper");

Vue.use(VueRouter);

export default new VueRouter ({
    mode: 'history', // 해시태크 안나옴
    routes: [
        { path: '/game/:name',          name: 'game',                   component: GameMatcher }, // /game/number-baseball
        { path: '/number-baseball',     name: 'number-baseball',        component: NumberBaseball },
        { path: '/response-check',      name: 'response-check',         component: ResponseCheck },
        { path: '/rock-scissors-paper', name: 'rock-scissors-paper',    component: RockScissorsPaper },
        { path: '/lotto-generator',     name: 'lotto-generator',        component: LottoGenerator },
        { path: '/tik-tac-to',          name: 'tik-tac-to',             component: TicTacTo },
        { path: '/mine-sweeper',        name: 'mine-sweeper',           component: MineSweeper },
    ],
});