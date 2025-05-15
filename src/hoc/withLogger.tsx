import React, { useEffect, useRef } from "react";

const withLogger = (WrappedComponent: React.ComponentType<any>) => {
  const WithLoggerComponent = (props: any) => {
    const isFirstRender = useRef(true);
    const previousProps = useRef<any>({});

    useEffect(() => {
      console.log("Component mounted with props:", props);

      return () => {
        console.log("Component unmounted");
      };
    }, []);

    useEffect(() => {
      if (!isFirstRender.current) {
        console.log("Component updated");
        if (JSON.stringify(previousProps.current) !== JSON.stringify(props)) {
          console.log("Props changed:", {
            previous: previousProps.current,
            current: props,
          });
        }
      } else {
        isFirstRender.current = false;
      }
      previousProps.current = props;
    });

    return <WrappedComponent {...props} />;
  };

  return WithLoggerComponent;
};

export default withLogger;
