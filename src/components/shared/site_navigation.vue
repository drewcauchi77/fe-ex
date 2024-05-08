<script setup lang="ts">
import { QToolbar, QSpace, QTabs, QRouteTab } from 'quasar'
</script>

<template>
  <header>
    <q-toolbar class="bg-grey-4 text-bluegrey-10 shadow-2 rounded-borders">
      <q-tabs>
        <q-route-tab :to="{ name: 'Dashboard' }" :class="{ active: $route.name === 'Dashboard' }" label="Dashboard"></q-route-tab>
      </q-tabs>
      <q-space />
      <q-tabs shrink>
        <q-route-tab :to="{ name: 'Projects' }" :class="{ active: $route.name === 'Projects' }" label="Projects"></q-route-tab>
      </q-tabs>
    </q-toolbar>
  </header>
</template>

<style scoped lang="scss"></style>
