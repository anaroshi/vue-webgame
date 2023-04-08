<template>
    <div>
        <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>   <!-- v-bind: => : 축약형 -->
        <template v-if = "result.length">            
            <div>평균 시간 : {{average}} ms</div>
            <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;

    export default {
        data() { // 변수 영역
            return {
                result: [],
                state: 'waiting',
                message: "클릭해서 시작하세요.",
            }
        },
        computed: { // 계산 영역
            average() {
                // result.reduce((a,b)=>a+b,0) 배열의 값 모두 더하기, || 0 기본값 주기
                return this.result.reduce((a,b)=>a+b,0) / this.result.length || 0;
            }
        },
        methods: { // 함수 영역
            onReset() {                
                this.result = [];
            },
            onClickScreen() {                
                if(this.state === 'waiting') {
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요.';
                    timeout = setTimeout(()=> {
                        this.state = 'now';
                        this.message = '지금 클릭';
                        startTime = new Date();
                    }, Math.floor(Math.random()*1000)+2000); // 2~3초
                } else if(this.state === 'ready') {
                    clearTimeout(timeout);
                    this.state = 'waiting';
                    this.message = '너무 성급하시군요! 초록색이 되면 클릭하세요.';
                } else {
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하세요.';
                    this.result.push(endTime - startTime);
                }
            }
        }
    };
</script>

<style scoped>
/* scoped 옵션은 이화면에서만 적용시킴 */
#screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
}
#screen.waiting {
    background-color: aqua;
}
#screen.ready {
    background-color: red;
}
#screen.now {
    background-color: greenyellow;
}
</style>