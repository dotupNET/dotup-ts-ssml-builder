import { SsmlBuilder } from './SsmlBuilder';

export class Sample {

  run(): void {
    const sb = new SsmlBuilder();
    sb.AddSentence('Satz 1');
  }
}

const sample = new Sample();
sample.run();
