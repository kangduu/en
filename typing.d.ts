declare global {
  interface ComponentCssProps {
    style?: React.CSSProperties;
    className?: string;
  }

  interface LinkStore {
    title: string;
    url: string;
  }

  interface BookLink extends LinkStore {
    id: NewConceptBookKey; // Book key for the book
    description?: string; // Optional description for the book
  }

  type OnClickEvent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export {};
