import { AdminCab } from "./index";
import { WorkerCab } from "./index";
import { PositionList } from "./index";


export default {
  path: '',
  childRoutes: [
      { path: 'admin', component: AdminCab, isIndex: true},
      {path: 'worker', component: WorkerCab},
      {path: 'positions', component: PositionList}

  ],
};
