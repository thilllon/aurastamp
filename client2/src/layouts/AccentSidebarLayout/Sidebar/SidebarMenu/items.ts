import { SmartToyTwoTone } from '@mui/icons-material';
import type { ReactNode } from 'react';

export interface MenuItem {
  link?: string;
  icon?: ReactNode & any;
  badge?: string;
  badgeTooltip?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

export const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Overview',
        icon: SmartToyTwoTone,
        items: [
          {
            name: 'Challenge List',
            link: '/challenges',
            // badge: '',
            // badgeTooltip: '',
          },
        ],
      },
      {
        name: '챌린지 관리',
        icon: SmartToyTwoTone,
        items: [
          {
            name: 'Challenge List',
            link: '/challenges',
            // badge: '',
            // badgeTooltip: '',
          },
        ],
      },
      {
        name: '계정 설정',
        icon: SmartToyTwoTone,
        items: [
          {
            name: '비밀번호 변경',
            link: '/account/password',
            // badge: '',
            // badgeTooltip: '',
          },
        ],
      },
      {
        name: '시스템 관리',
        icon: SmartToyTwoTone,
        items: [
          {
            name: 'Challenge List',
            link: '/challenges',
            // badge: '',
            // badgeTooltip: '',
          },
        ],
      },
    ],
  },
  // {
  //   heading: 'General',
  //   items: [
  //     {
  //       name: 'Blueprints',
  //       icon: BackupTableTwoTone,
  //       items: [
  //         {
  //           name: 'Extended Sidebar',
  //           link: '/dashboards/reports',
  //           badge: 'v3.0',
  //           badgeTooltip: 'Added in version 3.0',
  //         },
  //         {
  //           name: 'Accent Header',
  //           link: '/dashboards/reports',
  //           badge: '',
  //           badgeTooltip: 'Updated',
  //         },
  //         {
  //           name: 'Accent Sidebar',
  //           link: '/dashboards/reports',
  //         },
  //         {
  //           name: 'Boxed Sidebar',
  //           link: '/dashboards/reports',
  //         },
  //         {
  //           name: 'Collapsed Sidebar',
  //           link: '/dashboards/reports',
  //         },
  //         {
  //           name: 'Bottom Navigation',
  //           link: '/dashboards/reports',
  //         },
  //         {
  //           name: 'Top Navigation',
  //           link: '/dashboards/reports',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Dashboards',
  //       icon: SmartToyTwoTone,
  //       link: '/dashboards',
  //       items: [
  //         {
  //           name: 'Reports',
  //           link: '/dashboards/reports',
  //           badge: '',
  //           badgeTooltip: 'Reports Dashboard',
  //         },
  //         {
  //           name: 'Expenses',
  //           link: '/dashboards/expenses',
  //           badge: '',
  //           badgeTooltip: 'Expenses Dashboard',
  //         },
  //         {
  //           name: 'Products',
  //           link: '/dashboards/products',
  //           badge: '',
  //           badgeTooltip: 'Products Dashboard',
  //         },
  //         {
  //           name: 'Statistics',
  //           link: '/dashboards/statistics',
  //           badge: '',
  //           badgeTooltip: 'Statistics Dashboard',
  //         },
  //         {
  //           name: 'Automation',
  //           link: '/dashboards/automation',
  //         },
  //         {
  //           name: 'Analytics',
  //           link: '/dashboards/analytics',
  //         },
  //         {
  //           name: 'Banking',
  //           link: '/dashboards/banking',
  //         },
  //         {
  //           name: 'Commerce',
  //           link: '/dashboards/commerce',
  //         },
  //         {
  //           name: 'Crypto',
  //           link: '/dashboards/crypto',
  //         },
  //         {
  //           name: 'Finance',
  //           link: '/dashboards/finance',
  //         },
  //         {
  //           name: 'Fitness',
  //           link: '/dashboards/fitness',
  //         },
  //         {
  //           name: 'Healthcare',
  //           link: '/dashboards/healthcare',
  //           items: [
  //             {
  //               name: 'Doctors',
  //               link: '/dashboards/healthcare/doctor',
  //             },
  //             {
  //               name: 'Hospital',
  //               link: '/dashboards/healthcare/hospital',
  //             },
  //           ],
  //         },
  //         {
  //           name: 'Helpdesk',
  //           link: '/dashboards/helpdesk',
  //         },
  //         {
  //           name: 'Learning',
  //           link: '/dashboards/learning',
  //         },
  //         {
  //           name: 'Monitoring',
  //           link: '/dashboards/monitoring',
  //         },
  //         {
  //           name: 'Tasks',
  //           link: '/dashboards/tasks',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Data Display',
  //       icon: HealthAndSafetyTwoTone,
  //       badge: '',
  //       link: '/blocks',
  //       badgeTooltip: 'Tokyo 3.0 contains over 250 new data display blocks',
  //       items: [
  //         {
  //           name: 'Charts large',
  //           link: '/blocks/charts-large',
  //         },
  //         {
  //           name: 'Charts small',
  //           link: '/blocks/charts-small',
  //         },
  //         {
  //           name: 'Composed cards',
  //           link: '/blocks/composed-cards',
  //         },
  //         {
  //           name: 'Grids',
  //           link: '/blocks/grids',
  //         },
  //         {
  //           name: 'Icon cards',
  //           link: '/blocks/icon-cards',
  //         },
  //         {
  //           name: 'Image cards',
  //           link: '/blocks/image-cards',
  //         },
  //         {
  //           name: 'Lists large',
  //           link: '/blocks/lists-large',
  //         },
  //         {
  //           name: 'Lists small',
  //           link: '/blocks/lists-small',
  //         },
  //         {
  //           name: 'Navigation',
  //           link: '/blocks/navigation',
  //         },
  //         {
  //           name: 'Profile cards',
  //           link: '/blocks/profile-cards',
  //         },
  //         {
  //           name: 'Progress circular',
  //           link: '/blocks/progress-circular',
  //         },
  //         {
  //           name: 'Progress horizontal',
  //           link: '/blocks/progress-horizontal',
  //         },
  //         {
  //           name: 'Sparklines large',
  //           link: '/blocks/sparklines-large',
  //         },
  //         {
  //           name: 'Sparklines small',
  //           link: '/blocks/sparklines-small',
  //         },
  //         {
  //           name: 'Statistics',
  //           link: '/blocks/statistics',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Applications',
  //       link: '/applications',
  //       icon: AnalyticsTwoTone,
  //       items: [
  //         {
  //           name: 'Calendar',
  //           link: '/apps/calendar',
  //         },
  //         {
  //           name: 'File Manager',
  //           link: '/apps/file-manager',
  //         },
  //         {
  //           name: 'Jobs Platform',
  //           link: '/apps/jobs-platform',
  //         },
  //         {
  //           name: 'Mailbox',
  //           link: '/apps/mailbox',
  //         },
  //         {
  //           name: 'Messenger',
  //           link: '/apps/messenger',
  //         },
  //         {
  //           name: 'Projects Board',
  //           link: '/apps/projects-board',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   heading: 'Management',
  //   items: [
  //     {
  //       name: 'Users',
  //       icon: AssignmentIndTwoTone,
  //       link: '/management/users',
  //       items: [
  //         {
  //           name: 'List',
  //           link: '/management/users',
  //         },
  //         {
  //           name: 'User Profile',
  //           link: '/management/users/single/1',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Projects',
  //       link: '/management/projects',
  //       icon: AccountTreeTwoTone,
  //     },
  //     {
  //       name: 'Commerce',
  //       icon: StorefrontTwoTone,
  //       link: '/management/commerce',
  //       items: [
  //         {
  //           name: 'Shop',
  //           link: '/management/commerce/shop',
  //         },
  //         {
  //           name: 'List',
  //           link: '/management/commerce/products',
  //         },
  //         {
  //           name: 'Details',
  //           link: '/management/commerce/products/single/1',
  //         },
  //         {
  //           name: 'Create',
  //           link: '/management/commerce/products/create',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Invoices',
  //       link: '/management/invoices',
  //       icon: ReceiptTwoTone,
  //       items: [
  //         {
  //           name: 'List',
  //           link: '/management/invoices',
  //         },
  //         {
  //           name: 'Details',
  //           link: '/management/invoices/single/1',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   heading: 'Extra Pages',
  //   items: [
  //     {
  //       name: 'Auth Pages',
  //       icon: VpnKeyTwoTone,
  //       items: [
  //         {
  //           name: 'Login',
  //           items: [
  //             {
  //               name: 'Basic',
  //               link: '/auth/login/basic',
  //             },
  //             {
  //               name: 'Cover',
  //               link: '/auth/login',
  //             },
  //           ],
  //         },
  //         {
  //           name: 'Register',
  //           items: [
  //             {
  //               name: 'Basic',
  //               link: '/auth/register/basic',
  //             },
  //             {
  //               name: 'Cover',
  //               link: '/auth/register/cover',
  //             },
  //             {
  //               name: 'Wizard',
  //               link: '/auth/register/wizard',
  //             },
  //           ],
  //         },
  //         {
  //           name: 'Reset Password',
  //           link: '/auth/reset-password/request',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Status',
  //       icon: ErrorTwoTone,
  //       items: [
  //         {
  //           name: 'Error 404',
  //           link: '/status/404',
  //         },
  //         {
  //           name: 'Error 500',
  //           link: '/status/500',
  //         },
  //         {
  //           name: 'Maintenance',
  //           link: '/status/maintenance',
  //         },
  //         {
  //           name: 'Coming Soon',
  //           link: '/status/coming-soon',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   heading: 'Foundation',
  //   items: [
  //     {
  //       name: 'Overview',
  //       link: '/',
  //       icon: DesignServicesTwoTone,
  //     },
  //     {
  //       name: 'Documentation',
  //       icon: SupportTwoTone,
  //       link: '/docs',
  //     },
  //   ],
  // },
];
