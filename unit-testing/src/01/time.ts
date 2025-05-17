export class InvalidTimeError extends Error {}
export class InvalidMinutesError extends Error {}

export class Time {
  static parse(str: string): Time {
    if (str.length !== 5 || str[2] !== ":") {
      throw new InvalidTimeError();
    }
    const [hoursStr, minutesStr] = str.split(":");

    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      throw new InvalidTimeError();
    }

    return new Time(hours, minutes);
  }

  constructor(public readonly hours: number, public readonly minutes: number) {}

  addMinutes(minutes: number) {}
}
