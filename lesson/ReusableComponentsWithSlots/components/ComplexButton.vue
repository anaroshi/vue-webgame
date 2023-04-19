<template>
    <button 
        class="button"
        :disable="disabled"
        :class="{
            primary: primary,
            secondary: secondary,
            error: error
        }"
    >
        <template v-if="!error">
            <template v-if="!loading">
                <Icon :color="!disabled ? defaultIconColor : loadingIconColor" />
                {{ loadingText }}
            </template>
            <template v-else>
                <Icon v-if="showLeftIcon" :color="!disabled ? defaultIconColor : leftIconColor" :name="leftIconName" />
                {{ text }}
                <Icon v-if="showRightIcon" :color="!disabled ? defaultIconColor : rightIconColor" :name="rightIconName" />
            </template>
        </template>
        <template v-else>
            {{ errorText }}
        </template>
    </button>
</template>

<script>
export default {
    props: [
        "text",
        "loadingText",
        "errorText",
        "primary",
        "secondary",
        "disabled",
        "loading",
        "error",
        "defaultIconColor",
        "loadingIconColor",
        "leftIconColor",
        "leftIconName",
        "rightIconColor",
        "rightIconName",
        "showLeftIcon",
        "showRightIcon"
    ]
};
</script>