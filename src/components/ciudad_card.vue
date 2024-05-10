<template>
    <div class="hover:bg-weather-primary flex py-6 px-3 bg-weather-secundary rounded-md shadow-md cursor-pointer border-solid border-2 border-modal-background">
        <div class="flex flex-col flex-1 intems-center">
            <h2 class="text-2xl"> {{ city.city }}</h2>
            <h3> {{ city.state }}</h3>
        </div>
        <div class="flex flex-1 justify-end"> 
                <img
                        class="w-[60px] h-[60px] object-cover"
                        :src="
                        `http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`
                        "
                        alt=""
                    />
            </div>
        <div class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.ceil((city.weather.main.temp - 32) / 1.8) }}&deg;
            </p>
            <div class="flex gap-2 ">
                <span class="text-xs">
                MAX:
                {{ Math.ceil((city.weather.main.temp_max -32)/1.8) }}&deg;
                </span>
                <span class="text-xs">
                MIN:
                {{ Math.ceil((city.weather.main.temp_min -32)/1.8) }}&deg;
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  city:{
    type: Object,
    default: () => ({}),
  },
});

onMounted(() => {
  console.log('city:', props.city);
});

</script>

