<template>
    <div>
        <div id="screen">{{}}</div>
        <div>
            <div>평균 시간 : {{}}</div>
            <button @click.prevent="onReset">리셋</button>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            onReset() {     
            }
        }
    };
</script>

<style>
</style>