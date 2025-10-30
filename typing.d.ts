declare global {
  interface ComponentCssProps {
    style?: React.CSSProperties;
    className?: string;
  }

  type OnClickEvent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export {};
