import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
  faEnvelope,
  faCare,
  faCaretDown,
  faCamera,
  faCircleNotch,
  faSpinner,
  faMicrophone,
  faUserGraduate,
  faDownload,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

export const fontAW = () => {
  library.add(
    faMoon,
    faSun,
    faBars,
    faTimes,
    faEnvelope,
    faCaretDown,
    faCamera,
    faCircleNotch,
    faSpinner,
    faMicrophone,
    faUserGraduate,
    faDownload,
    faUpload
  );
};
