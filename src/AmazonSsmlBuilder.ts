// tslint:disable:newline-before-return
import { AllVoices, AmericanVoices, GermanVoices, InterpretAsValues, LanguageEnum } from './Enumerations';
import { SsmlBuilder } from './SsmlBuilder';

// TODO add this languages
// English, Australian(en - AU): Nicole, Russell
// English, British(en - GB): Amy, Brian, Emma
// English, Indian(en - IN): Aditi, Raveena
// Spanish, Castilian(es - es): Conchita, Enrique
// Italian(it - IT): Carla, Giorgio
// Japanese(ja - JP): Mizuki, Takumi
// French(fr - FR): Celine, Lea, Mathieu

export class AmazonSsmlBuilder extends SsmlBuilder {
  get [Symbol.toStringTag]() {
    return 'AmazonSsmlBuilder';
  }

  constructor() {
    super();
  }

  AddWhisper(text: string): this {
    this.textToSpeak.push(this.GetWhisper(text));
    return this;
  }

  GetWhisper(text: string): string {
    return `<amazon:effect name=\"whispered\">${text}</amazon:effect>`;
  }

  StartWhisper(): this {
    this.textToSpeak.push('<amazon:effect name="whispered">');
    this.stack.push('</amazon:effect>');
    return this;
  }

  AddAmerican(text: string, voice: AmericanVoices = AmericanVoices.Kendra): this {
    this.textToSpeak.push(this.GetAmerican(text, voice));
    return this;
  }

  GetAmerican(text: string, voice: AmericanVoices = AmericanVoices.Kendra): string {
    const lang = this.GetLanguage(text, LanguageEnum.enUS);
    return this.GetVoice(lang, voice);
  }

  AddSpellAmerican(text: string, voice: AmericanVoices = AmericanVoices.Salli): this {
    this.textToSpeak.push(this.GetSpellAmerican(text, voice));
    return this;
  }

  GetSpellAmerican(text: string, voice: AmericanVoices = AmericanVoices.Salli): string {
    return this.GetAmerican(this.GetInterpretAs(text, InterpretAsValues.spell_out), voice);
  }

  AddGerman(text: string, voice: GermanVoices): this {
    const lang = this.GetLanguage(text, LanguageEnum.deDE);
    this.textToSpeak.push(this.GetVoice(lang, voice));
    return this;
  }

  AddLanguage(text: string, language: LanguageEnum): this {
    this.textToSpeak.push(this.GetLanguage(text, language));
    return this;
  }

  GetLanguage(text: string, language: LanguageEnum): string {
    return `<lang xml:lang="${language}">${text}</lang>`;
  }

  // StartLanguage(text: string, language: LanguageEnum) {
  // }
  AddVoice(text: string, voice: AllVoices): this {
    this.textToSpeak.push(this.GetVoice(text, voice));
    return this;
  }

  GetVoice(text: string, voice: AllVoices): string {
    return `<voice name="${voice}">${text}</voice>`;
  }

  StartVoice(text: string, voice: AllVoices): this {
    this.textToSpeak.push(`<voice name="${voice}">${text}`);
    this.stack.push('</voice>');
    return this;
  }

}
