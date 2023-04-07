<template>
    <div>
        <h1>{{result}}</h1>
        <form v-on:submit="onSubmitForm">
            <input ref="answer" maxlength="4" minlength="4" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for (let i=0; i<4; i +=1) {
            const chosen = candidates.splice(Math.floor(Math.random() * (9-i)), 1)[0];
            array.push(chosen);
        }
        return array;
    }

    export default {
        data() {
            return {
                answer: getNumbers(), // ex)[1,5,3,4]
                tries: [], // 시도 수
                value: '', // 입력값
                result: '', // 결과
            }
        },    
        methods: {
            onSubmitForm(e) {
                e.preventDefault(); // = @submit.prevent
                // console.log(this.tries);                
                
                if(this.value === this.answer.join('')) {
                    this.tries.push({
                        try: this.value,
                        result: '홈런',
                    });

                    this.result = '홈런';
                    alert("홈런~~~ 게임을 재시작합니다.");
                    this.answer = getNumbers();
                    this.tries = [];
                    this.value = '';
                    this.$refs.answer.focus();
                } else { // 정답 틀렸을 때
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v=>parseInt(v));
                    for(let i=0;i<4;i+=1) {
                        if(answerArray[i]===this.answer[i]) { // 숫자 & 자릿수 모두 일치
                            strike ++;
                        } else if(this.answer.includes(answerArray[i])) { // 숫자만 일치
                            ball ++;
                        }
                    }
                    
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크, ${ball} 볼입니다.`,                        
                    });
                    
                    if (this.tries.length >= 10) { // 10번째 시도
                        alert(`"실패!!! 10번 넘게 틀려서 게임을 재시작합니다. [${this.answer.join(',')}] 였습니다.`);
                        this.result = '실패';
                        this.answer = getNumbers();
                        this.tries = [];
                    }
                    this.value = '';
                    this.$refs.answer.focus();

                }                
            }
        }    
    };
</script>

<style>
</style>