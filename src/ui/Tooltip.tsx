import { ReactNode, useRef, useState } from "react";
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  useTransitionStyles,
  FloatingArrow
} from "@floating-ui/react";

import styles from "./Tooltip.module.css";

const ARROW_HEIGHT = 15;

export const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(ARROW_HEIGHT),
      flip({ padding: 5 }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef })
    ],
    whileElementsMounted: autoUpdate
  });

  const hover = useHover(context);

  const {getReferenceProps, getFloatingProps} = useInteractions([
    hover,
  ]);

  const { isMounted, styles: tooltipStyles } = useTransitionStyles(
    context,
  );

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        { children }
      </div>

      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div style={tooltipStyles} className={styles.tooltip}>
            {text}

            <FloatingArrow
              ref={arrowRef}
              context={context}
              height={ARROW_HEIGHT}
            />
          </div>
        </div>
      )}
    </>
  )
};
