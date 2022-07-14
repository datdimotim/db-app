import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/folder',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'rootFolder', path: '', component: () => import('pages/IndexPage.vue') },
      { name: 'folderWithId', path: ':folderId', component: () => import('pages/IndexPage.vue'), props: true },
      { name: 'mediaPlayer', path: 'media/player/:fileId', component: () => import('pages/Player.vue'), props: true },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
