// tslint:disable: no-implicit-dependencies
// tslint:disable: newline-per-chained-call
import { expect } from 'chai';
import { describe } from 'mocha';
import { SsmlBuilder } from '../src/SsmlBuilder';

describe('SsmlBuilder', () => {

  it('should create an instance', () => {
    const sb = new SsmlBuilder();
    sb.AddSentence('Satz 1');
    expect(sb).to.be.instanceOf(SsmlBuilder);
  });

  it('should add sentence', () => {
    const sb = new SsmlBuilder();
    sb.AddSentence('Satz 1');
    expect(sb.Build()).to.equals('<s>Satz 1</s>');
  });

});
