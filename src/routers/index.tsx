import type { RouteObject } from 'react-router-dom';

type ConfigureType = {
    verifToken?: boolean,
    title?: string
}

export interface RouteOptions extends Omit<Omit<RouteObject, 'children'>,'index'> {
    index?: boolean;
    children?: RouteOptions[];
    configure?: ConfigureType;
}

import ChatPage from '@/pages/chat';
import DrawPage from '@/pages/draw';

const routes: RouteOptions[] = [
    {
        id: 'ChatPage',
        path: '/',
        element: <ChatPage />,
        children:[],
        configure: {
            verifToken: false
        },
    },
    {
        id: 'DrawPage',
        path: '/draw',
        element: <DrawPage />,
        children:[],
        configure: {
            verifToken: false
        },
    },
    {
        id: 'ShopPage',
        path: '/shop',
        element: <ChatPage />,
        children:[],
        configure: {
            verifToken: true
        },
    }
];

export function searchRouteDetail(
    path: string,
    routes: RouteOptions[]
): RouteOptions | null {
    let detail = null;

    const forRouter = (
        path: string,
        routes: RouteOptions[]
    )=>{
        for (const item of routes) {
            if (item.path === path) {
                detail = item;
            }
            if (item.children) {
                forRouter(path, item.children);
            }
        }
    };

    forRouter(path,routes);

    return detail;
}

export default routes as RouteObject[];
