export function moveLinkCurvatures(links, dx, dy) {
  links.forEach((link) => {
    if (link.getLinkCurvatureX() != null && link.getLinkCurvatureY() != null) {
      link.setLinkCurvatureX(link.getLinkCurvatureX() + dx);
      link.setLinkCurvatureY(link.getLinkCurvatureY() + dy);
    }
  });
}
