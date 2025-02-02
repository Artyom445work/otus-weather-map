import { getCurrentWeather, getCityCoords } from "./openweather.js";

test("getCurrentWeather must return mocked weather object", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          cord: "123",
          main: {
            temp: "456",
          },
          weather: [
            {
              icon: "weatherIcon",
            },
          ],
          name: "testName",
        }),
    }),
  );
  expect(await getCurrentWeather()).toStrictEqual({
    location: "123",
    temp: "456",
    icon: "weatherIcon",
    name: "testName",
  });
});

test("getCityCoords must return mocked city string coords", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          coord: {
            lon: "123",
            lat: "456",
          },
        }),
    }),
  );
  expect(await getCityCoords()).toBe("123,456");
});
