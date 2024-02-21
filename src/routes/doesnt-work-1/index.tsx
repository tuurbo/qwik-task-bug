import { $, component$, useStore, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { isBrowser } from "@builder.io/qwik/build";

export const apiCall = server$(async () => {
  await new Promise((r) => setTimeout(r, 1000));
  return {
    foo: "bar",
  };
});

export default component$(() => {
  const store = useStore(
    {
      page: 1,
      loading: false,
    },
    {
      reactive: true,
    }
  );

  const increase = $(() => {
    store.page++;
  });

  const setLoading = $((loading: boolean) => {
    store.loading = loading;
  });

  useTask$(async ({ track }) => {
    track(() => store.page);

    if (isBrowser) {
      await apiCall();
      setLoading(false);
    }
  });

  return (
    <>
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; border: 2px solid red; margin: 10px;">
        <div>page: {store.page}</div>
        <div>loading: {store.loading ? "yes" : "no"}</div>
        <button
          type="button"
          disabled={store.loading}
          onClick$={() => {
            setLoading(true);
            increase();
          }}
          style={{
            cursor: "pointer",
            opacity: store.loading ? 0.5 : 1,
          }}
        >
          button
        </button>
      </div>
    </>
  );
});
