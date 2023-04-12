<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key ="ball" :number="ball" ></lotto-ball>
        </div>
        <div>보너스!</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click.prevent="onClickRedo">한 번 더!</button>
    </div>
</template>

<script>
    import LottoBall from './LottoBall'; // 자식 컴포넌트 불러오기

    function getWinNumbers() {
        console.log('getWinNumbers');
        const candidate = Array(45).fill().map((v,i)=>i+1);
        const shuffle = [];
        while(candidate.length>0) {
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length-1];
        const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
        return [...winNumbers, bonusNumber];
    }    

    const timeouts = [];

    export default {
        components: { // 자식 컴포넌트 등록
            'lotto-ball': LottoBall,
        },
        data() { // 변수 영역
            return {
                winNumbers: getWinNumbers(),
                winBalls: [],
                bonus: null,
                redo: false,
            };
        },
        computed: { // 계산 영역

        },
        methods: { // 함수 영역
            onClickRedo() {
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
                // this.showBalls();             
            },
            showBalls() {
                for (let i=0; i<this.winNumbers.length - 1; i++) {
                    timeouts[i] = setTimeout(()=> {
                        this.winBalls.push(this.winNumbers[i]);
                    }, (i+1)*1000);
                }
                
                timeouts[6] = setTimeout(() => {
                    this.bonus = this.winNumbers[6];
                    this.redo = true;
                }, 7000);
            }
        },
        mounted() { // 화면에 뿌려지는 것
            console.log("mounted");
            this.showBalls();
        },
        beforeDestroy() { // 실행이 끝난후 (화면이 사라지면) 컴포넌트를 멈춰주어서 메모리 누수 방지(clearTimeout() or clearInterval())
            console.log("beforeDestroy");
            timeouts.forEach((t) => {
                clearTimeout();
            });            
        },
        watch: { // 감시를 원하는 데이터를 지정하여 감시하는 기능(되도록 안쓰는 방향으로)
            // winBalls(value, oldValue) {
            //     console.log(value, oldValue);
            //     if(value.length === 0) {
            //         this.showBalls();
            //     }
            // }
            bonus(value, oldValue) {
                console.log(value, oldValue);
                if(value === null) {
                    this.showBalls();
                }
            }

        }
    };
</script>

<style scoped>
</style>