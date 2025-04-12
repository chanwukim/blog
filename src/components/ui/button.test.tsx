import { render, screen } from "@testing-library/react";

import { Button } from "./button";

describe("Button", () => {
  it("should render", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("should polyfill the component", () => {
    render(
      <Button as="a" href="/">
        Click me
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Click me" })).toBeInTheDocument();
  });
});
