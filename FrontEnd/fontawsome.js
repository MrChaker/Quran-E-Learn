import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export const fontAW = () => {
  library.add(faMoon, faSun, faBars, faTimes, faEnvelope);
};
