# Uppload React

Uppload React is the official React component for [Uppload](https://github.com/elninotech/uppload), the open-source file uploading widget.

## Installation

```bash
yarn add uppload-react
```

## Usage

```jsx
<UpploadReact settings={{
	endpoint: "/example_backend"
    }} onUpload={fileUrl => {
        console.log("Image uploaded", fileUrl);
    }}>
    	<button>Upload new file</button>
</UpploadReact>
```