import { Robot, debounce, memoize } from "./index";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("robot", () => {
  it("robot test", () => {
    const robot = new Robot(10, 10);
    expect(robot.getCurrentPosition()).toEqual({
      x: 10,
      y: 10
    });
    robot.go("N");
    expect(robot.getCurrentPosition()).toEqual({
      x: 10,
      y: 11
    });

    robot.go("E");
    expect(robot.getCurrentPosition()).toEqual({
      x: 11,
      y: 11
    });

    robot.go("S");
    expect(robot.getCurrentPosition()).toEqual({
      x: 11,
      y: 10
    });

    robot.go("W");
    expect(robot.getCurrentPosition()).toEqual({
      x: 10,
      y: 10
    });
  });
});

describe("debounce", () => {
  it("should trigger function after certain delay", async () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 250);
    debouncedFn(10);

    // 不應該直接被呼叫到
    expect(fn).not.toHaveBeenCalledWith();

    // 過 250 毫秒才應該被呼叫到
    await sleep(250);
    expect(fn).toHaveBeenCalledWith(10);
    expect(fn.mock.calls.length).toBe(1);

    // 短時間內多次呼叫，應該只算一次
    debouncedFn("b", "a");
    debouncedFn("d", "e");
    debouncedFn("a", "b", "c");
    expect(fn.mock.calls.length).toBe(1);

    await sleep(250);
    expect(fn.mock.calls.length).toBe(2);
    expect(fn).toHaveBeenCalledWith("a", "b", "c");
  });
});

describe("memoize", () => {
  it("function should be called only at first time", () => {
    const complex = jest.fn().mockImplementation((x) => x + 1);
    const memoizedFn = memoize(complex);

    // 先呼叫第一次，function 應該被正確呼叫
    const first9 = memoizedFn(9);
    expect(complex).toHaveBeenCalledWith(9);

    // 呼叫第二次帶入不同參數，應該要呼叫到
    const first10 = memoizedFn(10);
    expect(complex).toHaveBeenCalledWith(10);

    // 呼叫第三次但帶入已經傳入過的參數，原本的 function 不應該被呼叫
    // 而是應該直接回傳計算過的值
    const second9 = memoizedFn(9);
    expect(complex.mock.calls.length).toBe(2);
    expect(second9).toEqual(first9);

    // 再呼叫一次新的值
    memoizedFn(100);

    // 再呼叫一次但傳入計算過的值
    // 不應該再次呼叫 function，而是回傳計算過的值
    const second10 = memoizedFn(10);
    expect(complex.mock.calls.length).toBe(3);
    expect(second10).toEqual(first10);
  });
});
