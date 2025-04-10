import type { ComponentType, FC, PropsWithChildren } from "react";
import Muted from "./muted";
import Pause from "./pause";
import Play from "./play";
import Sound from "./sound";

interface TriggerProps {
  onClick?: () => void;
}

const Trigger: FC<PropsWithChildren<TriggerProps>> = ({
  children,
  onClick,
}) => {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

function withIconTriggerHOC<P extends TriggerProps>(
  WrappedComponent: ComponentType
): FC<P> {
  return function Icon(props: P) {
    return (
      <Trigger {...props}>
        <WrappedComponent />
      </Trigger>
    );
  };
}

// media controls
export const Media = {
  Play: withIconTriggerHOC(Play),
  Pause: withIconTriggerHOC(Pause),
  Sound: withIconTriggerHOC(Sound),
  Muted: withIconTriggerHOC(Muted),
};
