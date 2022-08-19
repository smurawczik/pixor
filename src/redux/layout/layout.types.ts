export enum PaneLayout {
  LEFT = 1,
  CENTER,
  RIGHT,
  TOP,
  BOTTOM,
}

export interface PaneBaseProps {
  visible: boolean;
  layout: PaneLayout;
}

export interface LayoutSliceState {
  toolsPane: PaneBaseProps;
  helpersPane: PaneBaseProps;
  animationPane: PaneBaseProps;
}
