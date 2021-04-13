<template>
  <div>
    <lsf-planel></lsf-planel>
    <router-view></router-view>
  </div>
</template>

<script>
import panel from '@/components/Panel'
export default {
  name: 'Home',
  components: {
    'lsf-planel': panel
  }

}
</script>
