import { isExportDeclaration } from "typescript";
import { InvalidMinutesError, InvalidTimeError, Time } from "../../src/01/time";

describe("Time", () => {
  it("can parse time from string", () => {
    const time = Time.parse("12:23");

    expect(time.hours).toEqual(12);
    expect(time.minutes).toEqual(23);
  });

  it("throws an error if a string in invalid format is passed", () => {
    expect(() => Time.parse("12-23")).toThrow(InvalidTimeError);
  });

  it("throws an error if non existent hours is passed", () => {
    expect(() => Time.parse("45:23")).toThrow(InvalidTimeError);
  });
  it("throws an error if non existent minutes is passed", () => {
    expect(() => Time.parse("12:66")).toThrow(InvalidMinutesError);
  });

  it("can add minutes", () => {
    const time = Time.parse("12:23");
    const newTime = time.addMinutes(1);
    expect(newTime.hours).toEqual(12);
    expect(newTime.minutes).toEqual(24);
  });
  it("it can handle overflowing minutes", () => {
    const time = Time.parse("12:23");
    const newTime = time.addMinutes(59);
    expect(newTime.hours).toEqual(13);
    expect(newTime.minutes).toEqual(22);
  });
  it("it can handle overflowing hours", () => {
    const time = Time.parse("23:59");
    const newTime = time.addMinutes(1);
    expect(newTime.hours).toEqual(0);
    expect(newTime.minutes).toEqual(0);
  });

  it("throws an error if negative minutes are passed", () => {
    const time = Time.parse("12:23");

    expect(() => time.addMinutes(-2)).toThrow(InvalidMinutesError);
  });

  it("can format into a string", () => {
    const time = Time.parse("12:23");

    expect(time.toString()).toEqual("12:23");

    console.log(time.toString());
  });
  it("can pad zeroes at the start of minutes", () => {
    const time = Time.parse("12:03");

    expect(time.hours).toEqual(12);
    expect(time.minutes).toEqual(3);

    expect(time.toString()).toEqual("12:03");
  });
  it("can pad zeroes at the start of hours", () => {
    const time = Time.parse("02:13");

    expect(time.hours).toEqual(2);
    expect(time.minutes).toEqual(13);

    expect(time.toString()).toEqual("02:13");
  });
});
