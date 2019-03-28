import { BreakStrength, EmphasisLevel, InterpretAsValues, ProsodyPitch, ProsodyRate, ProsodyVolume } from './Enumerations';

// tslint:disable:newline-before-return

export class SsmlBuilder {
  get [Symbol.toStringTag]() {
    return 'SsmlBuilder';
  }

  protected stack: string[];
  protected textToSpeak: string[];

  constructor() {
    this.stack = [];
    this.textToSpeak = [];
  }

  AddText(text: string): this {
    this.textToSpeak.push(text);

    return this;
  }

  AddSsml(ssml: string): this {
    this.textToSpeak.push(ssml);
    return this;
  }

  AddSentence(text: string | string[]): this {
    if (Array.isArray(text)) {
      text.forEach(item => this.textToSpeak.push(this.GetSentence(item)));
    } else {
      this.textToSpeak.push(this.GetSentence(text));
    }
    return this;
  }

  GetSentence(text: string): string {
    return `<s>${text}</s>`;
  }

  AddParagraph(text: string): this {
    this.textToSpeak.push(`<p>${text}</p>`);
    return this;
  }

  GetParagraph(text: string): string {
    return `<p>${text}</p>`;
  }

  AddAlias(text: string, alias: string): this {
    this.textToSpeak.push(this.GetAlias(text, alias));
    return this;
  }

  GetAlias(text: string, alias: string): string {
    return `<sub alias="${alias}">${text}</sub>`;
  }

  AddBreak(strength: BreakStrength): this {
    this.textToSpeak.push(this.GetBreak(strength));
    return this;
  }

  GetBreak(strength: BreakStrength): string {
    return `<break strength=\"${strength}\"/>`;
  }

  AddBreakMs(milliseconds: number): this {
    this.textToSpeak.push(this.GetBreakMs(milliseconds));
    return this;
  }

  GetBreakMs(milliseconds: number): string {
    if (milliseconds > 10000) {
      throw new Error('milliseconds > 10000');
    }

    return `<break time=\"${milliseconds}ms\"/>`;
  }

  AddEmphasis(text: string, level: EmphasisLevel): this {
    this.textToSpeak.push(this.GetEmphasis(text, level));
    return this;
  }

  GetEmphasis(text: string, level: EmphasisLevel): string {
    return `<emphasis level="${level}">{text}</emphasis>`;
  }

  StartEmphasis(level: EmphasisLevel): this {
    this.textToSpeak.push(`<emphasis level="${level}">`);
    this.stack.push('</emphasis>');
    return this;
  }

  AddRate(text: string, rate: ProsodyRate): this {
    this.textToSpeak.push(this.GetProsody('rate', rate, text));
    return this;
  }

  StartRate(rate: ProsodyRate): this {
    this.textToSpeak.push(this.GetProsodyStart('rate', rate));
    this.stack.push('</prosody>');
    return this;
  }

  AddPitch(text: string, pitch: ProsodyPitch): this {
    this.textToSpeak.push(this.GetProsody('pitch', pitch, text));
    return this;
  }

  StartPitch(pitch: ProsodyPitch): this {
    this.textToSpeak.push(this.GetProsodyStart('pitch', pitch));
    this.stack.push('</prosody>');
    return this;
  }

  AddVolume(text: string, volume: ProsodyVolume): this {
    this.textToSpeak.push(this.GetProsody('volume', volume, text));
    return this;
  }

  StartVolume(volume: ProsodyVolume): this {
    this.textToSpeak.push(this.GetProsodyStart('volume', volume));
    this.stack.push('</prosody>');
    return this;
  }

  AddSayAs(text: string, interpretAs: InterpretAsValues): this {
    return this.AddInterpretAs(text, interpretAs);
  }

  AddInterpretAs(text: string, interpretAs: InterpretAsValues): this {
    this.textToSpeak.push(this.GetInterpretAs(text, interpretAs));
    return this;
  }

  GetInterpretAs(text: string, interpretAs: InterpretAsValues): string {
    return `<say-as interpret-as="${interpretAs}">${text}</say-as>`;
  }

  GetProsody(key: string, value: string, text: string): string {
    // 		value = value.ToString().Replace("_", "-");
    return `<prosody ${key}="${value}">${text}</prosody>`;
  }

  AddSpell(text: string): this {
    this.textToSpeak.push(this.GetSpell(text));
    return this;
  }

  GetSpell(text: string): string {
    return this.GetInterpretAs(text, InterpretAsValues.spell_out);
  }

  CloseAllEffects(): this {
    while (this.stack.length > 0) {
      this.CloseEffect();
    }
    return this;
  }

  CloseEffect(): this {
    if (this.stack.length < 1) {
      return this;
    }

    const closingProsody = this.stack.pop();
    if (closingProsody !== undefined) {
      this.textToSpeak.push(closingProsody);
    }
    return this;
  }

  GetProsodyStart(key: string, value: string): string {
    // value = value.ToString().Replace("_", "-");
    return `<prosody ${key}="${value}">`;
  }

  // GetText(separator: string = ' '): string {
  // 	return this.textToSpeak.join(separator);
  // }

  escape(text: string): string {
    let result: string;
    result = text.replace(/&/g, '&amp;');
    result = text.replace(/</g, '&lt;');
    result = text.replace(/>/g, '&gt;');
    result = text.replace(/"/g, '&quot;');
    result = text.replace(/'/g, '&apos;');

    return result;
  }

  Build(): string {
    this.CloseAllEffects();
    return this.textToSpeak.join(' ');
    // return {
    // 	type: 'SSML',
    // 	ssml: `<speak>${result}</speak>`
    // };
  }

}
