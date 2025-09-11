import { getByRole, render } from "@testing-library/react";
import Button from ".";

describe("Button", () => {
  describe("Button text", () => {
    test("Button text should be some as children", () => {
      const { getByRole, container } = render(<Button>Click me</Button>);
      expect(getByRole("button").textContent).toBe("Click me");
      expect(container.querySelector("button")?.textContent).toBe("Click me");
    });
  });

  describe("Button loading", () => {
    it("Loading button text should include same as children", () => {
      const { getByRole } = render(<Button loading>Click me</Button>);
      expect(getByRole("button").textContent?.includes("Loading")).toBe(true);
    });

    it("Not loading button text should include same as children", () => {
      const { getByRole } = render(<Button loading={false}>Click me</Button>);
      expect(getByRole("button").textContent?.includes("Loading")).toBe(false);
    });

    it("Loading button should have loading classname", () => {
      const animClassName = "anim-breath";
      const { getByRole } = render(
        <Button loading spinnerClassName={animClassName}>
          Click me
        </Button>
      );
      expect(
        getByRole("button").getElementsByClassName("animate-spin")[0].className
      ).toContain(animClassName);
    });
  });
});
