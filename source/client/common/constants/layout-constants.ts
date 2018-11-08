export const HEADER_MENU_ITEMS: IMenuItem[] = [
  { title: 'События', to: '/events' },
  { title: 'Сводка', to: '/summary' },
  { title: 'Видеонаблюдение', to: '/video-monitoring' }
];

export const FOOTER_MENU_ITEMS: IMenuItem[] = [
  { title: 'Помощь', to: '/#' },
  { title: 'Обратная связь', to: '/#' },
  { title: 'Разработчикам', to: '/#' },
  { title: 'Условия использования', to: '/#' }
];

export interface IMenuItem {
  title: string;
  to: string;
}
