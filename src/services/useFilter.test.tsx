import { renderHook } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Hub } from "../types";
import useFilters, { GLOBAL_LOCATION } from "./useFilter";

const DEFAULT_FILTER_CONFIG = {
  minKg: "",
  includePortfolio: false,
  location: null,
};

const TEST_DATA: Hub[] = [
  {
    uuid: "uuid-1",
    cardDescription: "",
    displayName: "Something awesome",
    logo: { uuid: "" },
    name: "some name",
    parentHubName: "hub name",
    referenceQuantityUnit: "KG",
    unassignedQuantityTotal: 56,
    formattedTotalRecoveredQuantity: "23123",
    totalRecoveredQuantity: 23123,
    location: null,
    slug: "google.com",
  },
  {
    uuid: "uuid-2",
    cardDescription: "",
    displayName: "Big Bag",
    logo: { uuid: "" },
    name: "name #2",
    parentHubName: "hub 2",
    referenceQuantityUnit: "KG",
    unassignedQuantityTotal: 55,
    totalRecoveredQuantity: 0,
    formattedTotalRecoveredQuantity: "0",
    location: "space",
    slug: null,
  },
  {
    uuid: "uuid-3",
    cardDescription: "",
    displayName: "Green Worms",
    logo: { uuid: "" },
    name: "name #2",
    parentHubName: "",
    referenceQuantityUnit: "KG",
    unassignedQuantityTotal: 0,
    totalRecoveredQuantity: 22,
    formattedTotalRecoveredQuantity: "22",
    location: "india",
    slug: null,
  },
];

describe("useFilter", () => {
  it("returns initialData", () => {
    const { result } = renderHook(() => useFilters(TEST_DATA));
    expect(result.current.filteredData.length).toBe(3);
    expect(result.current.filteredData).toEqual(TEST_DATA);
  });

  it("can return an empty array if initial data is empty", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useFilters(initialValue),
      {
        initialProps: { initialValue: [] },
      }
    );

    rerender({ initialValue: [] });

    expect(result.current.filteredData.length).toBe(0);
    expect(result.current.filteredData).toEqual([]);
  });

  it("filters out items with less than 50kg", () => {
    const minKg = "50";
    const { result } = renderHook(() => useFilters(TEST_DATA));

    // filters by minKg
    act(() => {
      result.current.filterConfig.setFilters({
        ...DEFAULT_FILTER_CONFIG,
        minKg,
      });
    });

    expect(result.current.filteredData.length).toBe(1);
    expect(result.current.filterConfig.filters.minKg).toEqual(minKg);

    // remove applied minKg filter
    act(() => {
      result.current.filterConfig.setFilters({
        ...DEFAULT_FILTER_CONFIG,
        minKg: "0",
      });
    });

    expect(result.current.filteredData.length).toBe(3);
    expect(result.current.filterConfig.filters.minKg).toEqual("0");
  });

  it("can show only portfolio items", () => {
    const { result } = renderHook(() => useFilters(TEST_DATA));

    // filters by portfolio
    act(() => {
      result.current.filterConfig.setFilters({
        ...DEFAULT_FILTER_CONFIG,
        includePortfolio: true,
      });
    });

    expect(result.current.filteredData.length).toBe(2);
    expect(result.current.filterConfig.filters.includePortfolio).toEqual(true);

    // remove applied portfolio filter
    act(() => {
      result.current.filterConfig.setFilters({
        ...DEFAULT_FILTER_CONFIG,
        includePortfolio: false,
      });
    });

    expect(result.current.filteredData.length).toBe(3);
    expect(result.current.filterConfig.filters.includePortfolio).toEqual(false);
  });

  it.each([
    { location: "india", resultLength: 1 },
    { location: null, resultLength: 3 },
  ])(
    "can show and filter $resultLength item(s) by location ($location)",
    ({ location, resultLength }) => {
      const { result } = renderHook(() => useFilters(TEST_DATA));

      // filter by location
      act(() => {
        result.current.filterConfig.setFilters({
          ...DEFAULT_FILTER_CONFIG,
          location,
        });
      });

      expect(result.current.filteredData.length).toBe(resultLength);
      expect(result.current.filteredData[0].location).toEqual(location);
      expect(result.current.filterConfig.filters.location).toEqual(location);

      // remove applied location filter
      act(() => {
        result.current.filterConfig.setFilters({
          ...DEFAULT_FILTER_CONFIG,
          location: null,
        });
      });

      expect(result.current.filteredData.length).toBe(3);
      expect(result.current.filterConfig.filters.location).toEqual(null);
    }
  );

  it("A null location can be filtered via the Global location filter option", () => {
    const { result } = renderHook(() => useFilters(TEST_DATA));

    // filter by location
    act(() => {
      result.current.filterConfig.setFilters({
        ...DEFAULT_FILTER_CONFIG,
        location: GLOBAL_LOCATION,
      });
    });

    expect(result.current.filteredData.length).toBe(1);
    expect(result.current.filteredData[0].location).toEqual(null);
    expect(result.current.filterConfig.filters.location).toEqual(
      GLOBAL_LOCATION
    );

    // remove applied location filter
    act(() => {
      result.current.filterConfig.setFilters({
        ...DEFAULT_FILTER_CONFIG,
        location: null,
      });
    });

    expect(result.current.filteredData.length).toBe(3);
    expect(result.current.filterConfig.filters.location).toEqual(null);
  });

  it("an outrageous filter criteria may return no result", () => {
    const { result } = renderHook(() => useFilters(TEST_DATA));

    act(() => {
      result.current.filterConfig.setFilters({
        minKg: "5000000000",
        includePortfolio: true,
        location: "kkk",
      });
    });
    expect(result.current.filteredData.length).toBe(0);
  });

  it("a combination of filters may return a specific result", () => {
    const config = {
      minKg: "20000",
      includePortfolio: true,
      location: GLOBAL_LOCATION,
    };
    const { result } = renderHook(() => useFilters(TEST_DATA));

    act(() => {
      result.current.filterConfig.setFilters(config);
    });
    expect(result.current.filteredData.length).toBe(1);
    expect(
      result.current.filteredData[0].totalRecoveredQuantity
    ).toBeGreaterThanOrEqual(parseInt(config.minKg));
    expect(result.current.filteredData[0].location).toBeNull();
    expect(result.current.filteredData[0].parentHubName).toBeTruthy();
  });
});
