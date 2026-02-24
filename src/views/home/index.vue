<template>
  <div>
    
    <HomeTodo></HomeTodo>
    <YearStatus></YearStatus>
    <HomeMessage></HomeMessage>

  </div>
</template>
<script>
import HomeTodo from './components/homeTodo.vue';
import YearStatus from './components/yearStatus.vue';
import HomeMessage from './components/homeMessage.vue';

export default {
  name: 'HomePage', // 多单词
  components: {
    HomeTodo,
    YearStatus,
    HomeMessage,
  },
  data() {
    return {
     
    }
  },
  async mounted () {
   
  },
  methods: {

  }
}
</script>
