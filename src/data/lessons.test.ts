import { describe, expect, it } from 'vitest';
import { LESSONS } from './lessons';

describe('lesson content', () => {
  it('distinguishes main-verb do/does from auxiliary do/does', () => {
    expect(LESSONS[0].slides[0].coreRule).toContain('kata kerja utama');
    expect(LESSONS[0].slides[1].coreRule).toContain('kata bantu');
    expect(LESSONS[0].slides[1].coreRule).toContain('pertanyaan');
  });

  it('uses natural beginner-friendly English examples', () => {
    const examples = LESSONS.flatMap((module) => module.slides.flatMap((slide) => slide.examples));
    const exampleSentences = examples.map((example) => example.en);

    expect(exampleSentences).toContain('He does his chores carefully.');
    expect(exampleSentences).toContain('She plays the piano.');
    expect(exampleSentences).not.toContain('He does his chore diligently.');
    expect(LESSONS[3].slides[0].pronouns[1].verb).toBe('Does she play the piano?');
    expect(LESSONS[3].slides[0].pronouns[2].verb).toBe('She doesn\'t play the piano.');
    expect(LESSONS[2].slides[1].subtitle).not.toContain('Who');
  });
});
