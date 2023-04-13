import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // this.$store
// Vue.use(axios); // this.$axios

// import {SET_WINNER, CLICK_CELL, CHANGE_TURN, RESET_GAME, NO_WINNER} from './store';
export const START_GAME     = 'START_GAME';     // 게임시작
export const OPEN_CELL      = 'OPEN_CELL';      // 한칸 한칸 셀열기
export const CLICK_MINE     = 'CLICK_MINE';     // 지뢰클릭
export const FLAG_CELL      = 'FLAG_CELL';      // 지뢰칸에 깃발꽂기
export const QUESTION_CELL  = 'QUESTION_CELL';  // 지뢰가 있는지 없는지 의심
export const NORMALIZE_CELL = 'NORMALIZE_CELL'; // 깃발이나 물음표를 꽂았던 곳 해제
export const INCREMENT_TIMER = 'INCREMENT_TIMER'; // 타이머

// 상태
export const CODE = {
    MINE:       -7,
    NORMAL:     -1,
    QUESTION:   -2,
    FLAG:       -3,
    QUESTION_MINE: -4,
    FLAG_MINE:  -5,
    CLICKED_MINE: -6,
    OPENED:     0, // 0 이상이면 다 opened
};

// [
//     ['-1','2','-7'],
//     ['-3','-7','-1'],
//     ['-1','-1','-1'],
// ]

const plantMine = (row, cell, mine) => {
    //console.log(row, cell, mine);
    const candidate = Array(row*cell).fill().map((arr, i) => {
        return i;
    });
    
    const shuffle = [];
    while(candidate.length > (row * cell - mine)) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    
    // 초기화(지뢰밭 만들기)
    const data = [];
    for(let i=0;i<row;i++) {
        const rowData = [];
        data.push(rowData);
        for(let j=0;j<cell;j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 지뢰 심기
    for(let k=0;k<shuffle.length;k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;

};

export default new Vuex.Store({ // import store from './store';
    state: {
        tableData: [
        ],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true, // 게임 중단
        result: '',
        openedCount: 0,
    }, // vue의 data와 비슷
    getters: {
        
    }, // vue의 computed와 비슷
    mutations: {
        [START_GAME](state,{row, cell, mine}){ 
            // 지뢰밭 초기화
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
            state.result = '';
        },
        [OPEN_CELL](state, {row, cell}){
            let openedCount = 0; // 칸을 열때마다 카운팅

            const checked = []; // cashing memorization
            
            function checkAround(row, cell) { // 자기 주변 8칸에 지뢰가 있는지 검색하기 위함
                
                // undefined 체크
                let checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if (checkRowOrCellIsUndefined) {
                    return;
                }

                // 주변칸이 이미 열렸거나, 지뢰가 있거나 하면 검사하지 않게
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
                    return;
                }

                // 한번 체크한(연) 칸은 열지 않기. 미체크시 stack overflow 발생
                if (checked.includes(row+'/'+cell)) {
                    return;
                } else {
                    checked.push(row+'/'+cell);
                }

                let around = []; 
                if (state.tableData[row-1]) {
                    around = around.concat([
                        state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]
                    ]);
                }
    
                around = around.concat([
                    state.tableData[row][cell-1], state.tableData[row][cell+1]
                ]);
    
                if (state.tableData[row+1]) {
                    around = around.concat([
                        state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]
                    ]);
                }
    
                // 주변칸에 지뢰 검색
                const counted = around.filter( function(v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });
                // 주변칸에 지뢰가 하나도 없으면 주변 8칸 열어보기, 있으면 지뢰 갯수 적어주기
                if(counted.length === 0 && row > -1) {
                    
                    const near = [];
                    if (row -1 > -1) {
                        near.push([row-1, cell-1]);
                        near.push([row-1, cell]);
                        near.push([row-1, cell+1]);
                    }
                    near.push([row, cell-1]);
                    near.push([row, cell+1]);
                    if (row +1 < state.tableData.length) {
                        near.push([row+1, cell-1]);
                        near.push([row+1, cell]);
                        near.push([row+1, cell+1]);
                    }

                    near.forEach((n)=> {
                        // 열려저 있는 칸이 아닐 경우
                        if(state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0],n[1]); // (재귀호출) 스스로 칸열기
                        }
                    });
                }
                if (state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }
                Vue.set(state.tableData[row], cell, counted.length); // 주변 지뢰 갯수
            }
            checkAround(row, cell);

            // 지뢰를 제외한 모든 칸이 열렸으면            
            let halted = false;
            let result = '';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리하였습니다.`;
            }
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state, {row, cell}){
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, {row, cell}){
            if (state.tableData[row][cell] === CODE.MINE) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, {row, cell}){
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, {row, cell}){
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state){
            state.timer += 1;
        },
    }, // state를 수정할 때 사용. 동기적으로
    actions: {
        
    }, // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
});