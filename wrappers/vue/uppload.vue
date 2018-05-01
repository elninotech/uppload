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
		this.uppload.on("uploadStarted", () => {
			console.log("upload started");
		});
		setInterval(() => {
			console.log(this.uppload.value);
		}, 1000);
		this.uppload.on("fileUploaded", url => {
			console.log("upload successful");
			this.updateUrl(url);
			this.$emit("uploaded", url);
		});
	},
	methods: {
		openUppload() {
			this.uppload.openModal();
		},
		updateUrl(url) {
			console.log("UPDATE URL", url);
		}
	}
};
</script>
