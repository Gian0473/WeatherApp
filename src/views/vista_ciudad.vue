<template>
    <div class="items-center">
        <Suspense>
            <ciudades/>
            <template #fallback>
                <div class="flex gap-3 justify-between items-center text-modal-background" style="margin-top: 30vh;">
                    <div class="flex-1 flex justify-end">
                        <p class="text-3xl text-center">Cargando...</p>
                    </div>
                    <div class="flex-1 flex justify-start">
                        <i class="fa-solid fa-circle-notch animate-spin text-3xl"></i>
                    </div>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import ciudades from '../components/ciudades.vue';

</script>

<style>
::-webkit-scrollbar {
    -webkit-appearance: none;
}

    ::-webkit-scrollbar:vertical {
        width: 10px;
    }

::-webkit-scrollbar-button:increment, .contenedor::-webkit-scrollbar-button {
    display: none;
}

::-webkit-scrollbar:horizontal {
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: #004E71;
    border-radius: 20px;
    border: 2px solid #E5EDF0;
}

::-webkit-scrollbar-track {
    border-radius: 10px;
}
</style>