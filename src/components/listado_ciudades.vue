<template>
    <div class="hover:bg-weather-primary" v-for="city in saveCity" :key="city.id">
        <ciudad_card :city="city" @click="go_to_city_view(city)"/>
    </div>
    <p class="text-modal-background font-bold" v-if="saveCity.length === 0">
    No se agregaron ubicaciones. Para comenzar a rastrear una ubicación, busque en
    el campo de arriba.
    </p>
</template>

<script setup>
import { ref } from 'vue';
import ciudad_card from './ciudad_card.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const saveCity = ref([]);
const getCity = async() => { //Recuperar y procesar datos 
    if(localStorage.getItem("saveCity")){ //verifica si hay una dato guardado
        saveCity.value = JSON.parse(localStorage.getItem("saveCity")); //Este paso convierte la cadena JSON almacenada en localStorage en un arreglo de objetos,

        const requests = []; //se crea un array para las solicitudes HTTP
        saveCity.value.forEach((city) => { //itera en cada ciudad guardada
        requests.push(
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lng}&appid=bd5e378503939ddaee76f12ad7a97608&units=imperial`));
        });

        const weatherData = await Promise.all(requests); //toma un array con las solicitudes y 
                                                        //crea una sola para todas ellas
        weatherData.forEach((value,index) => { //se procesa todo los datos del clima
            saveCity.value[index].weather = value.data;
        });
    }
};

await getCity();

const go_to_city_view = (city) => {
    router.push({
        name: "cityView",
        params: { state: city.state ,city: city.city},
        query: {id : city.id,
                lat : city.coord.lat,
                lng : city.coord.lng,
        },
    });
}
</script>
