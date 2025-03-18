<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'openAgain'])
const props = defineProps<{
  tab: {
    id: number;
    icon: string;
    color: string;
    custom: boolean;
  }
  modelValue: number,
  color: string
}>()

const OpenCurrentTab = ():void => {
  if (props.tab.id === props.modelValue) {
    emit('openAgain', props.tab.id)
  } else {
    emit('update:modelValue', props.tab.id)
  }
}

</script>

<template>
  <UButton
           variant="outline"
           @click="OpenCurrentTab"
           class="transition-all duration-200 relative"
           :class="{activeTab: modelValue === tab.id}"
           :ui="{variant: {outline: `ring-2 ${modelValue === tab.id ? 'dark:bg-transparent' : 'dark:bg-zinc-800'} w-[calc(21%-0.375rem)] h-16 flex items-center justify-center dark:text-zinc-800`},
                      icon: {base: `${tab.color} ${modelValue === tab.id ? 'dark:text-white' : 'dark:text-white/50'}`},}"
           :icon="`${!tab.custom ? tab.icon : ''}`">
    <UIcon :class="modelValue === tab.id ? 'opacity-0' : 'opacity-1'" class="absolute top-0 dark:text-white/50 transition-opacity duration-500" name="i-line-md-chevron-small-up" />
    <template v-if="tab.custom" #trailing>
      <div :style="`background-color: rgba(${color})`" class="w-6 h-6 border rounded-full "></div>
    </template>
  </UButton>
</template>

<style scoped>

</style>