import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class Screenshot extends MicrolinkBaseClass {
  name = "screenshot";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M189 256h-25v-54h39v-38h53v92h-67zM0 210v-46h53v38h40v54H0v-46zm151-34h-10v-20h15v-15h20v35h-25zm-71-17v-18h20v15h15v20H80v-17zm0-62V80h35v20h-15v15H80V97zm76 10v-7h-15V80h35v35h-20v-8zM0 46V0h93v53H53v39H0V46zm203 27V53h-39V0h92v92h-53V73z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#e67e22";
}
