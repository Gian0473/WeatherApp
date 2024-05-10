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
const getCity = async() => {
    if(localStorage.getItem("saveCity")){
        saveCity.value = JSON.parse(localStorage.getItem("saveCity"));

        const requests = [];
        saveCity.value.forEach((city) => {
        requests.push(
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`));
        });

        const weatherData = await Promise.all(requests);
        weatherData.forEach((value,index) => {
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
