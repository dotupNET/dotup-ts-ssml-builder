import { SsmlBuilder } from '../src/SsmlBuilder';

describe('SsmlBuilder', () => {

  it('should create an instance', () => {
    const sb = new SsmlBuilder();
    sb.AddSentence('Satz 1');
    expect(sb)
      .toBeTruthy();
  });

  it('should add sentence', () => {
    const sb = new SsmlBuilder();
    sb.AddSentence('Satz 1');
    expect(sb.Build())
      .toBe('<s>Satz 1</s>');
  });

});
