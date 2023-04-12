<template>
    <div>
        <div id="screen">{{}}</div>
        <div>
            <div>평균 시간 : {{}}</div>
            <button @click.prevent="onReset">리셋</button>
        </div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    </div>
</template>

<script>
    import LottoBall from './LottoBall'; // 자식 컴포넌트 불러오기

    export default {
        components: { // 자식 컴포넌트 등록
            'lotto-ball': LottoBall,
        },
        data() { // 변수 영역
            return {
            }
        },
        computed: { // 계산 영역

        },
        methods: { // 함수 영역
            onReset() {     
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
         },
        beforeUpdate() {
            console.log("beforeUpdate");
        },
        updated() { // 액션에 의해 데이터가 바뀌어서 화면 다시 그려질때 실행
            console.log("updated");
        },
        beforeDestroy() { // 실행이 끝난후 컴포넌트를 멈춰주어서 메모리 누수 방지
            console.log("beforeDestroy");
        },
        destroyed() { // false로 화면에 있다가 없어졌을 때 실행
            console.log("destroyed");
        }
    };
</script>

<style scoped>
</style>