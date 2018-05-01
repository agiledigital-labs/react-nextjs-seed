
const nextRoutes = require('next-routes');
const _routes = nextRoutes();

export interface IRoute {
    route: string;
    params: { [key: string]: string };
}
export const Link = _routes.Link;
export const Route = _routes.Route;
export default _routes;

