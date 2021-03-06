import { addParameters, configure } from '@storybook/react';
// import { themes } from '@storybook/theming';

// addParameters({
//   options: {
//     theme: themes.dark,
//   },
// });

const comps = require.context('@merninator/lib/src', true, /.stories.tsx$/);

configure(() => {
  comps.keys().forEach(filename => comps(filename));
}, module);

import '@merninator/lib/src/themes/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSignOutAlt,
  faPlusSquare,
  faLockOpen,
  faLock,
  faTimesCircle,
  faFilePdf,
  faSearch,
  faArrowCircleRight,
  faArrowCircleLeft,
  faSearchPlus,
  faSearchMinus,
  faFileAlt,
  faTools,
  faBook,
  faUserEdit,
  faBible,
  faStream,
  faEdit,
  faTrashAlt,
  faUserPlus,
  faFlag,
  faMinusCircle,
  faPlusCircle,
  faInfinity,
} from '@fortawesome/free-solid-svg-icons';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';

library.add(
  faGoogle,
  faSignOutAlt,
  faPlusSquare,
  faLockOpen,
  faLock,
  faTimesCircle,
  faFilePdf,
  faSearch,
  faArrowCircleRight,
  faArrowCircleLeft,
  faSearchPlus,
  faSearchMinus,
  faFileAlt,
  faTools,
  faBook,
  faUserEdit,
  faBible,
  faStream,
  faEdit,
  faTrashAlt,
  faUserPlus,
  faFlag,
  faMinusCircle,
  faPlusCircle,
  faInfinity,
);
