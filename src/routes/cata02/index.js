import Cata02 from 'page/Cata02';
import SubCata002 from 'page/Cata02/SubCata002';

export default [{
    path: '/cata02',
    component: Cata02,
    childRoutes: [
        {
            path: 'subCate02',
            component: SubCata002
        }
    ]
}];