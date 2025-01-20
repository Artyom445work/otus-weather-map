import { getCurrentCity } from "./geo";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        city: "Moscow",
        longitude: "123",
        latitude: "456",
      }),
  }),
);

test("getCurrentCity must return mocked city object", async () => {
  expect(await getCurrentCity()).toStrictEqual({
    cityName: "Moscow",
    ll: "123,456",
  });
});
