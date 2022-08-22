interface IRoute {
  [key: string]: { path: string };
}

export const routes = Object.freeze<IRoute>({
  home: {
    path: '/'
  },
  commits: {
    path: '/commits'
  }
});
