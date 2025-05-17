import { time } from "console";

export class InvalidTimeError extends Error {}
export class InvalidMinutesError extends Error {}

export class Time {
  static parse(str: string): Time {
    if (str.length !== 5 || str[2] !== ":") {
      throw new InvalidTimeError("Does not match time format");
    }
    const [hoursStr, minutesStr] = str.split(":");

    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      throw new InvalidTimeError();
    }

    if (!(hours >= 0 && hours <= 23)) {
      throw new InvalidTimeError();
    }

    if (!(minutes >= 0 && minutes <= 59)) {
      throw new InvalidMinutesError();
    }

    return new Time(hours, minutes);
  }

  constructor(public readonly hours: number, public readonly minutes: number) {}

  addMinutes(minutes: number) {
    if (minutes < 0) {
      throw new InvalidMinutesError();
    }

    const newMinutes = this.minutes + minutes;
    const newHours = this.hours + Math.floor(newMinutes / 60);

    const finalMinutes = newMinutes % 60;
    const finalHours = newHours % 24;

    return new Time(finalHours, finalMinutes);
  }

  toString() {
    const minutesStr =
      this.minutes < 10
        ? "0".concat(this.minutes.toString())
        : this.minutes.toString();

    const hoursStr =
      this.hours < 10
        ? "0".concat(this.hours.toString())
        : this.hours.toString();

    return "".concat(hoursStr, ":", minutesStr);
  }
}
