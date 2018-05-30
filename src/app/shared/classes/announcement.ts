import { Menu } from './menu';
export class Breadcrumb {
    label: string;
    url: Array<any>;
}
export class Announcement {
    breadcrumbs?: Array<Breadcrumb>;
    sidemenus?: Array<Menu>;
}
