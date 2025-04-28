import type { ComponentType, FC, PropsWithChildren } from "react";

export interface CommonIconProps {
  active?: boolean;
}

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

type TriggerHocProps = TriggerProps & CommonIconProps;

export default function withIconTriggerHOC<P extends TriggerHocProps>(
  WrappedComponent: ComponentType<CommonIconProps>
): FC<P> {
  return function Icon({ onClick, ...restProps }: P) {
    return (
      <Trigger onClick={onClick}>
        <WrappedComponent {...restProps} />
      </Trigger>
    );
  };
}
