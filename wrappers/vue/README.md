# Uppload Vue

Uppload Vue is the official Vue.js component for [Uppload](https://github.com/elninotech/uppload), the open-source file uploading widget.

## Installation

```bash
yarn add uppload-vue
```

## Usage

```html
<template>
    <uppload @uploaded="onUpload">
        <button>Upload</button>
    </uppload>
</template>

<script>
    import UpploadVue from "uppload-vue";
    export default {
        methods: {
            onUpload(fileUrl) {
                console.log("File uploaded!", fileUrl);
            }
        },
        components: {
            "uppload": UpploadVue
        }
    }
</script>
```

In this example, the `onUpload` function would get the URL of the uploaded file as a parameter. It can then be used as a `v-model`, Vuex state, and so on.

A  complete working demo is available in the [example folder](https://github.com/elninotech/uppload/tree/master/wrappers/vue/example).