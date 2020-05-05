import React from "react";

interface MyComponentProps {
  name?: string;
}

const MyComponent = ({ name }: MyComponentProps) => <div>Hello, {name}</div>;

export default MyComponent;
