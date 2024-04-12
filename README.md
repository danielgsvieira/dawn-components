# Dawn Components

## Usage

In your `main.js` file:

```javascript
import 'dawn-conponents/dist/style.css';
import { createApp } from 'vue';

const app = createApp(App);

app.mount('#app');
```

Using on SFC:

```vue
<script setup>
import { DSelect } from 'dawn-components';

const model = ref('');
</script>

<template>
  <form @submit>
    <d-select v-model="model" :options=['foo', 'bar'] />
  </form>
</template>
```
