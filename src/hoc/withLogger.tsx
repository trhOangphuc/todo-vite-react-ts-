import { ComponentType, useEffect } from "react";

// Ràng buộc T để nó hợp lệ với React component props
function withLogger<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  const ComponentWithLogger = (props: T) => {
    useEffect(() => {
      console.log("Component mounted with props:", props);

      return () => {
        console.log("Component unmounted");
      };
    }, [props]); // Thêm props vào mảng phụ thuộc

    return <WrappedComponent {...props} />;
  };

  return ComponentWithLogger;
}

export default withLogger;
