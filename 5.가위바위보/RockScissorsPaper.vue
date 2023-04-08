<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}} 점</div>
        <lifecycle-example v-if="true" />
    </div>
</template>

<script>
    const resCoords = {
        바위: '0',
        가위: '-142px',
        보: '-284px',
    };

    const scores = {
        가위: 1,
        바위: 0,
        보: -1,
    };

    const computerChoice = (imgCoord) => {
        return Object.entries(resCoords).find(function(v){
            return v[1] === imgCoord;
        })[0];
    };

    let interval = null;

    export default {
        data() { // 변수 영역
            return {
                imgCoord: resCoords.바위,
                result: '',
                score: 0,
            };
        },
        computed: { // 계산 영역 : 캐싱을 자동으로 해주는 구역
            computedStyleObject() {
                return { 
                    background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
                };
            }
        },
        methods: { // 함수 영역
            changeHand() { // 바위가위보 연속 변환
            interval = setInterval(()=>{
                    if (this.imgCoord === resCoords.바위) {
                        this.imgCoord = resCoords.가위;
                    } else if (this.imgCoord === resCoords.가위) {
                        this.imgCoord = resCoords.보;
                    } else {
                        this.imgCoord = resCoords.바위;
                    }
                }, 200);
            },

            onClickButton(choice) {
                // alert(choice + "Button is clicked!!");

                clearInterval(interval); // 멈춰기
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imgCoord)];
                const diff = myScore - cpuScore;

                if (diff === 0) {
                    this.result = '비겼습니다.';
                } else if ([-1,2].includes(diff)) {
                    this.result = '이겼습니다.';
                    this.score += 1;
                } else {
                    this.result = '졌습니다.';
                    this.score -= 1;
                }

                setTimeout(() => {
                    this.changeHand();
                }, 1000);
            }
        },
        beforeCreate() {
            console.log("beforeCreate");
        },
        created() { // 화면에 나타나기 전 (자바스크립내에 값을 가지고 있는거)
            console.log("created");
        },
        beforeMount() {
            console.log("beforeMount");
        },
        mounted() { // 화면에 뿌려지는 것
            console.log("mounted");
            this.changeHand();
        },
        beforeUpdate() {
            console.log("beforeUpdate");
        },
        updated() { // 액션에 의해 데이터가 바뀌어서 화면 다시 그려질때 실행
            console.log("updated");
        },
        beforeDestroy() { // 실행이 끝난후 컴포넌트를 멈춰주어서 메모리 누수 방지
            console.log("beforeDestroy");
            clearInterval(interval);
        },
        destroyed() { // false로 화면에 있다가 없어졌을 때 실행
            console.log("destroyed");
        }
    };
</script>

<style scoped>
    #computer {
        width: 143px;
        height: 200px;
        background-position: 0 0;
    }
</style>