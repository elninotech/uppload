<template>
    <div @click.prevent="openUppload">
        <slot />
    </div>
</template>

<script>
import Uppload from "uppload";
export default {
	props: {
		settings: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			value: "",
			uppload: null
		};
	},
	mounted() {
		this.uppload = new Uppload(this.settings);
		this.uppload.on("fileUploaded", url => {
			this.$emit("uploaded", url);
		});
	},
	methods: {
		openUppload() {
			this.uppload.openModal();
		}
	}
};
</script>
