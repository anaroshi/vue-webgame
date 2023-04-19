<template>
<!--    <AppLayout>
        <template #default> // # === v-slot:
            <AppButton @click="log">
                <Icon />
                add to favorites
            </AppButton>
        </template>
    </AppLayout> 
--> 
<div class="page">
    <select v-model="selected">
        <option v-for="option in options" :key="option.value" :value="option.value">{{option.label}}</option>
    </select>
    <AppUserList>        
        <template #userlist="{list: users, remove}">
            <AppUserCardsList :list="users">
                <template #[selected]="{text}">
                    <h4>{{ text }}</h4>
                </template>
                <template #secondrow="{item: user}">
                    <button @click="remove(user)">{{ user.name.first }}</button>
                </template>
            </AppUserCardsList>
        </template>
    </AppUserList>
</div>
</template>

<script>
    import AppUserCardsList from './components/AppUserCardsList';
    import AppUserList from './components/AppUserList'
    import AppButton from './components/AppButton'

    export default {
        components: {
            AppUserCardsList,
            AppUserList,
            AppButton
        },
        data() {
            return {
                selected: "first",
                options: [
                    {value: "first", label:"first name"},
                    {value: "last", label:"last name"},
                    {value: "full", label:"full name"},
                    {value: "fullWithTitle", label:"full name with title"}
                ]
            }
        } 
    };
    // import AppLayout from './components/AppLayout'
    // import AppButton from './components/AppButton'
    // import Icon from './components/Icon'
    // export default {
    //     components: {
    //         AppLayout,
    //         AppButton,
    //         Icon
    //     },
    //     methods: {
    //         log() {
    //             console.log("works")
    //         }
    //     }
    // }
    
</script>

<style>
.page {
  padding: 2rem;
}
.page > * + * {
  margin-top: 2rem;
}
</style>