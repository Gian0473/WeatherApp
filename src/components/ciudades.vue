<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- banner -->
        <div v-if="route.query.preview" class="text-modal-background p-4 bg-weather-secundary w-full text-center">
            <p>Actualmente estás obteniendo una vista previa de esta ciudad, haz clic en "+"
                icono para comenzar a rastrear esta ciudad.</p>
        </div>
        <!--Info-->
        <div class="flex flex-col text-center text-modal-background py-12 items-center">
            <h1 class="text-4xl mb-2 ">{{ route.params.city }}</h1>
            <p class="text-sm mb-12">
                {{
                new Date(weatherData.currentTime).toLocaleDateString(
                    "es-SE",
                    {
                    weekday: "short",
                    day: "2-digit",
                    month: "long",
                    }
                )
                }}
                {{
                new Date(weatherData.currentTime).toLocaleTimeString(
                    "es-SE",
                    {
                    timeStyle: "short",
                    hour12: true,
                    }
                )
                }}
            </p>
            <!--Temperatura-->
            <p class="text-8xl mb-8">
                {{Math.ceil(celcius) }}&deg;
            </p>
            <p>
                Sensación termica: 
                {{ Math.round(celcius_feels) }} &deg;
            </p>
            <p class="capitalize">
                {{ weatherData.current.weather[0].description }}
            </p>
            <img
                class="w-[150px] h-auto"
                :src="
                `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
                "
                alt=""
            />
        </div>
        <hr class="border-white border-opacity-10 border w-full" />

        <!--Clima por hora-->

        <div class=" w-full py-12">
            <div class="mx-8 text-modal-background">
                <h2 class="mb-4 ">Clima por hora: </h2>
                <div class="flex gap-10 overflow-x-scroll">
                    <div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
                        <p class="whitespace-nowrap text-md">
                            {{
                                new Date(
                                hourData.currentTime
                                ).toLocaleTimeString("en-us", {
                                hour: "numeric",
                                })
                            }}
                        </p>
                        <img
                        class="w-auto h-[50px] object-cover"
                        :src="
                            `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
                        "
                        alt=""
                        />
                        <p class="text-xl">
                        {{ Math.ceil((hourData.temp - 32) * 5 / 9) }}&deg;
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!--Clima por semana-->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-modal-background">
                <h2 class="mb-4 ">Pronóstico de siete días: </h2>
                <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
                    <p class="flex-1">
                        {{
                        new Date(day.dt * 1000).toLocaleDateString(
                            "es",
                            {
                            weekday: "long",
                            }
                        )
                        }}
                    </p>
                    <img
                        class="w-[50px] h-[50px] object-cover"
                        :src="
                        `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
                        "
                        alt=""
                    />
                    <div class="flex gap-2 flex-1 justify-end">
                        <p>Max: {{ Math.ceil((day.temp.max -32)* 5/9) }}</p>
                        <p>Min: {{ Math.round((day.temp.min -32)* 5/9) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
        @click="removeCity">
        <i class="fa-solid fa-trash-can"></i>
        <p>Borrar ciudad</p>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { provide } from 'vue';


const router = useRouter();
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&lang=es&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );

    // calcular la fecha y hora actuales
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // calcular la compensación meteorológica por hora
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });
    console.log(weatherData.data);
    return weatherData.data;
    
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

var Fahrenheit= Math.round(weatherData.current.temp); 
var celcius = (Fahrenheit - 32) * 5 / 9;


var Fahrenheit_feels = Math.round(weatherData.current.feels_like);
var celcius_feels = (Fahrenheit_feels - 32) * 5 / 9;


const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("saveCity"));
  const updatedCities = cities.filter(
    (city) => city.id !== route.query.id
  );
  localStorage.setItem(
    "saveCity",
    JSON.stringify(updatedCities)
  );
  router.push({
    name: "home",
  });
};

provide('weatherData', weatherData);
</script>
