import Catalog from 'page/Catalog';
import SubCate01 from 'page/Catalog/SubCate01';
import SubCate02 from 'page/Catalog/SubCate02';

export default [{
    path: 'cata01',
    component: Catalog,
    indexRoute: Catalog,
    onEnter: () => {},
    childRoutes: [
        {
            path: 'subCate01',
            component: SubCate01
        },
        {
            path: 'subCate02',
            component: SubCate02
        }
    ]
}];