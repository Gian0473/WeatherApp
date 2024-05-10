<template>
    <teleport to='body'>
    <transition name="modal-outer">
    <div v-show="modal_active" class=" absolute w-full bg-balck bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
        <transition name="modal-inner">
        <div v-if="modal_active" class=" rounded-lg p-4 bg-modal-background self-start mt-32 max-w-screen-md">
            <slot />
            <button class=" rounded-lg text-white mt-8 bg-weather-secundary py-2 px-6 hover:text-weather-primary duration-150 " @click="$emit('cerrar_modal')">Cerrar</button>
        </div>
    </transition>
    </div>
    </transition>
    </teleport>
</template>

<script setup>
defineEmits(["cerrar_modal"]);
defineProps({
    modal_active:{
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.modal-outer-enter-active, 
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52,0.02,0.19,1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>