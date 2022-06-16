

export default (paths) => {
  //route 형식 만들기
  const routes = []
  for (const { menuName, menuComponent, menuGroup, menuPath } of paths) {
      routes.push({
        path: `${menuPath}`,
        name: `${menuName}`,
        component: `${menuGroup}/${menuComponent}.vue`
      });
    }
  return routes
}