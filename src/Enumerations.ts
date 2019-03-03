export enum LanguageEnum {
  deDE = 'de-DE',
  enUS = 'en-US'
}

export declare type AllVoices = GermanVoices | AmericanVoices;

export enum GermanVoices {
  // German (de-DE): Hans, Marlene, Vicki
  Hans = 'Hans', Marlene = 'Marlene', Vicki = 'Vicki'
}

export enum AmericanVoices {
  // English, American (en - US): Ivy, Joanna, Joey, Justin, Kendra, Kimberly, Matthew, Salli
  Ivy = 'Ivy', Joanna = 'Joanna', Joey = 'Joey', Justin = 'Justin', Kendra = 'Kendra', Kimberly = 'Kimberly',
  Matthew = 'Matthew', Salli = 'Salli'
}

// English, Australian(en - AU): Nicole, Russell
// English, British(en - GB): Amy, Brian, Emma
// English, Indian(en - IN): Aditi, Raveena
// Spanish, Castilian(es - es): Conchita, Enrique
// Italian(it - IT): Carla, Giorgio
// Japanese(ja - JP): Mizuki, Takumi
// French(fr - FR): Celine, Lea, Mathieu

export enum InterpretAsValues {
  characters = 'characters', //  Spell out each letter.
  spell_out = 'spell-out', //  Spell out each letter.
  cardinal = 'cardinal', // Interpret the value as a cardinal number.
  number = 'number', // Interpret the value as a cardinal number.
  ordinal = 'ordinal', //  Interpret the value as an ordinal number.
  digits = 'digits', // Spell each digit separately .
  //  Interpret the value as a fraction. This works for both common fractions (such as 3/20) and mixed fractions (such as 1+1/2).
  fraction = 'fraction',
  // Interpret a value as a measurement. The value should be either a number or fraction followed by a unit
  // (with no space in between) or just a unit.
  unit = 'unit',
  date = 'date', //  Interpret the value as a date. Specify the format with the format attribute.
  time = 'time', //  Interpret a value such as 1'21" as duration in minutes and seconds.
  // Interpret a value as a 7-digit or 10-digit telephone number. This can also handle extensions (for example, 2025551212x345).
  telephone = 'telephone',
  address = 'address', //  Interpret a value as part of street address.
  // Interpret the value as an interjection. Alexa speaks the text in a more expressive voice.
  // For optimal results, only use the supported interjections and surround each speechcon with a pause.
  // For example: <say-as interpret-as="interjection">Wow.</say-as>. Speechcons are supported for the languages listed below.
  interjection = 'interjection',
  expletive = 'expletive' // "Bleep" out the content inside the tag.
}

export enum BreakStrength {
  none = 'none', // No pause should be outputted. This can be used to remove a pause that would normally occur (such as after a period).
  x_weak = 'x-weak', // No pause should be outputted (same as none).
  weak = 'weak', //  Treat adjacent words as if separated by a single comma (equivalent to medium).
  medium = 'medium', // Treat adjacent words as if separated by a single comma.
  strong = 'strong', // Make a sentence break (equivalent to using the <s> tag).
  x_strong = 'x-strong' // Make a paragraph break (equivalent to using the <p> tag).
}

export enum EmphasisLevel {
  strong = 'strong', // Increase the volume and slow down the speaking rate so the speech is louder and slower.
  // Increase the volume and slow down the speaking rate, but not as much as when set to strong.
  // This is used as a default if level is not provided.
  moderate = 'moderate',
  reduced = 'reduced' // Decrease the volume and speed up the speaking rate. The speech is softer and faster.
}

export enum ProsodyRate {
  x_slow = 'x-slow', slow = 'slow', medium = 'medium', fast = 'fast', x_fast = 'x-fast'
}

export enum ProsodyPitch {
  x_low = 'x-low', low = 'low', medium = 'medium', high = 'high', x_high = 'x-high'
}

export enum ProsodyVolume {
  silent = 'silent', x_soft = 'x-soft', soft = 'soft', medium = 'medium', loud = 'loud', x_loud = 'x-loud'
}
