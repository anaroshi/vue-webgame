<template>
    <div class="ball" :style="styleObject">{{number}}</div>
</template>

<script>
    export default {
        name: 'LottoBall',
        props: { // 부모 컴포넌트에서 받은 값으로 임의로 변경할수 없음
            number: Number,
        },
        computed: {
            styleObject() {
                let background;
                if (this.number <=10) {
                    background = "red";
                } else if (this.number <=20) {
                    background = "orange";
                } else if (this.number <=30) {
                    background = "yellow";
                } else if (this.number <=40) {
                    background = "blue";
                } else {
                    background = "green";
                }
                return {
                    background,
                }
            }
        }
    };
</script>
<style scoped>
    .ball {
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px
    }
</style>