<template>
    
  <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav class="container flex sm:flex-row items-center gap-4 text-white py-6">
            <router-link :to="{name: 'home'}" >
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-cloud-sun text-2xl"></i>
                    <p class="text-2xl">Clima Local</p>
                </div>
            </router-link>
            <div class="flex gap-3 flex-1 justify-end">
                <i class="fa-solid fa-circle-info text-xl hover:text-weather-secundary duration-150 cursor-pointer" @click="toggle_modal"></i>
                <i class="fa-solid fa-plus text-xl hover:text-weather-secundary duration-150 cursor-pointer" @click="add_city" v-if="route.query.preview"></i>
            </div>
            <base_modales :modal_active='modal_active'
                        @cerrar_modal="toggle_modal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">Sobre la web:</h1>
                    <p class="mb-4">
                        Esta web te permite rastrear el clima actual y futuro de las ciudades que elijas.
                    </p>
                    <h2 class="text-2xl">Como funciona:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Busca tu ciudad ingresando el nombre en la barra de búsqueda.
                        </li>
                        <li>
                            Selecciona una ciudad dentro de los resultados, esto te llevará al clima actual de tu selección.
                        </li>
                        <li>
                            Rastrea la ciudad haciendo clic en el icono "+" en la parte superior derecha. Esto guardará la ciudad para verla más adelante en la página de inicio.
                        </li>

                    </ol>
                </div>
            </base_modales>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { uid } from 'uid';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import base_modales from './base_modales.vue';

const route = useRoute();
const router = useRouter();
const saveCity = ref ([]);
const add_city = () => { 
    if (localStorage.getItem("saveCity")){
        saveCity.value = JSON.parse(localStorage.getItem("saveCity"));
    };
    
    const locationObj = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coord: {
            lat: route.query.lat,
            lng: route.query.lng,
        },

    };

    saveCity.value.push(locationObj);
    localStorage.setItem("saveCity",JSON.stringify(saveCity.value));

    let query = Object.assign({}, route.query);
    delete query.preview; 
    query.id = locationObj.id;
    router.replace({ query });
};

//activa el modal.
const modal_active = ref(null); 
const toggle_modal = () => {
    modal_active.value = !modal_active.value;
};
</script>
