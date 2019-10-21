import { mount } from "@vue/test-utils";
import Table from "./Table.vue";

describe("Test suite for Table component.", () => {
  it("Should render all the body rows.", () => {
    const wrapper = mount(Table, {
      propsData: {
        tbody: [
          [{ value: "First" }, { value: "Second" }, { value: "Third" }],
          [{ value: "First" }, { value: "Second" }, { value: "Third" }]
        ]
      }
    });

    expect(wrapper.findAll("tr").length).toBe(2);
    expect(wrapper.findAll("td").length).toBe(2 * 3);
  });

  it("Should render thead row.", () => {
    const wrapper = mount(Table, {
      propsData: {
        thead: [{ value: "First" }, { value: "Second" }, { value: "Third" }],
        tbody: [
          [{ value: "First" }, { value: "Second" }, { value: "Third" }],
          [{ value: "First" }, { value: "Second" }, { value: "Third" }]
        ]
      }
    });

    expect(wrapper.findAll("tr").length).toBe(3);
    expect(wrapper.findAll("td").length).toBe(3 * 3);
  });

  it("Should render default emptyBodyMsg if the body provided is empty.", () => {
    const wrapper = mount(Table, {
      propsData: {
        tbody: []
      }
    });

    expect(wrapper.find(".table__empty-body-msg").text()).toBe(
      "There is no data to display!"
    );
  });

  it("Should render provided emptyBodyMsg if the body provided is empty.", () => {
    const wrapper = mount(Table, {
      propsData: {
        tbody: [],
        emptyBodyMsg: "Magic people, vodoo people!"
      }
    });

    expect(wrapper.find(".table__empty-body-msg").text()).toBe(
      "Magic people, vodoo people!"
    );
  });
});
