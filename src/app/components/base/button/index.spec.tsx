import { fireEvent, render } from "@testing-library/react";
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
        getByRole("button").getElementsByClassName("animate-spin")[0].classList
      ).toContain(animClassName);
    });
  });

  describe("Button style", () => {
    it("Button should have default variant", () => {
      const { getByRole } = render(<Button>Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-secondary")
    })

    it("Button should have primary variant", () => {
      const { getByRole } = render(<Button variant="primary">Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-primary")
    })

    it("Button should have warning variant", () => {
      const { getByRole } = render(<Button variant={"warning"}>Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-warning")
    })

    it("Button should have secondary-accent variant", () => {
      const { getByRole } = render(<Button variant={"secondary-accent"}>Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-secondary-accent")
    })

    it("Button should have tertiary variant", () => {
      const { getByRole } = render(<Button variant={"tertiary"}>Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-tertiary")
    })

    it("Button should have ghost variant", () => {
      const { getByRole } = render(<Button variant={"ghost"}>Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-ghost")
    })

    it("Button should have ghost-accent variant", () => {
      const { getByRole } = render(<Button variant={"ghost-accent"}>Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-ghost-accent")
    })

    it("Button disabled should have disabled variant", () => {
      const { getByRole } = render(<Button disabled>Click me</Button>)
      expect(getByRole("button").classList).toContain("disabled:btn-disabled")
    })
  })

  describe("Button size", () => {
    it("Button should have default size", () => {
      const { getByRole } = render(<Button>Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-medium")
    })

    it("Button should have small size", () => {
      const { getByRole } = render(<Button size="small">Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-small")
    })

    it("Button should have medium size", () => {
      const { getByRole } = render(<Button size="medium">Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-medium")
    })

    it("Button should have large size", () => {
      const { getByRole } = render(<Button size="large">Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-large")
    })
  })

  describe("Button destructive", () => {
    it("Button should have destructive classname", () => {
      const {getByRole} = render(<Button destructive>Click me</Button>)
      expect(getByRole("button").classList).toContain("btn-destructive")
    })
  })

  describe("Button event", () => {
    it("Button should been call after click", () => {
      const click = jest.fn()
      const {getByRole} = render(<Button onClick={click}>Click me</Button>)
      fireEvent.click(getByRole("button"))
      expect(click).toHaveBeenCalledTimes(1)
    })
  })
});
