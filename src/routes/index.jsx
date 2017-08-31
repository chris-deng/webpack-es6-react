/**
 * 配置路由
 */
import App from 'page/App.jsx';
import Dashboard from 'page/Dashboard';
import Catalog from './Catalog/catarouter';
import Cata02 from './cata02';


const routes = [
    {
        path: '/',
        IndexRoute: Dashboard,
        component: App,
        childRoutes: [
            ...Catalog,
            ...Cata02
        ]
    }
];

export default routes;
