import React from "react";

export class Label extends React.Component {
  render() {
    const { className, asChild = false, ...props } = this.props;
    const Comp = asChild ? React.Fragment : "label";

    return (
      <Comp
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
        {...props}
      />
    );
  }
}
