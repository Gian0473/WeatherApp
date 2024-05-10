<template>
  <main class="container text-modal-background">
    <div class="pt-4 mb-8 relative">
      <input v-model="search_query" @input="get_result_search" type="text" placeholder="Buscar ciudad" class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secundary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
      <ul class="absolute bg-weather-secundary text-modal-background w-full shadow-md py-2 px-1 top-[66px]"
      v-if="map_box_search_result">
          <p class="py-2" v-if="search_error">
            UUPS ¡Algo salio mal!
          </p>
          <p class="py-2" v-if="!search_error && map_box_search_result.length === 0">
            No hay resultador, prueba con un termino diferente. 
          </p>
          <template v-else>
            <li v-for="search_result in map_box_search_result" :key="search_result.id" class="py-2 cursor-pointer"
            @click="previewCity(search_result)">{{ search_result.place_name }}</li>
          </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <listado_ciudades/>
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
  </main>
</template>


<script setup>
import listado_ciudades from '@/components/listado_ciudades.vue';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";

const router = useRouter();
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true, 
    },
  });
};
const map_box_api_key = "pk.eyJ1IjoiZ2lhbjA2MTgiLCJhIjoiY2x2cmo3OWIzMGg4ejJqbnVxajhkZnVoMCJ9.UmJ4fHjjbkhIOAP17J7J2Q";
console.log("key: ",map_box_api_key);
const search_query= ref("");
const query_timeout= ref(null);
const map_box_search_result = ref(null); 
const search_error = ref(null);

const get_result_search = () => {
  clearTimeout(query_timeout.value);
  query_timeout.value = setTimeout(async () => {
    if (search_query.value !== ""){
      try{
          const result =await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search_query.value}.json?access_token=${map_box_api_key}&types=place`);
          map_box_search_result.value = result.data.features; 
          console.log(map_box_search_result.value);
      } catch{
        search_error.value = true;
        console.log("error:",error);
      }
      return; 
    }
    map_box_search_result.value = null; 
  },300)
};
</script>