<template>
    <div>
        <div>
            <router-link to="/game/index">게임매쳐</router-link>
            <router-link to="/game/number-baseball?pages=3&offset=10&sort=createdAt">숫자야구</router-link>
            <router-link to="/game/response-check">반응속도체크</router-link>
            <router-link to="/game/rock-scissors-paper">가위바위보</router-link>
            <router-link to="/game/lotto-generator">로또</router-link>
            <router-link to="/game/tik-tac-to">택택토</router-link>
            <router-link to="/game/mine-sweeper">지뢰찾기</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import router from './routes';
    
    export default {
        router,        
    };
</script>

<style>
</style>