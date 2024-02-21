import { component$ } from "@builder.io/qwik";
import DoesntWork1 from "./doesnt-work-1";
import DoesntWork2 from "./doesnt-work-2";
import Works from "./works";

export default component$(() => {
  return (
    <>
      <div style="padding: 20px; margin: 10px 0; font-weight: bold; font-size: 20px;">
        Click the buttons below multiple times to increase the page value by 1
        and to show the loading indicator.
      </div>
      <DoesntWork1 />
      <DoesntWork2 />
      <Works />
    </>
  );
});
