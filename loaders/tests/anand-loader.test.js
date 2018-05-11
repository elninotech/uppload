import anandLoader from "../anand-loader";

test("minifies template literals", () => {
	expect(anandLoader(`<div>   three spaces and one tab	</div>`)).toBe("<div> three spaces and one tab</div>");
});
