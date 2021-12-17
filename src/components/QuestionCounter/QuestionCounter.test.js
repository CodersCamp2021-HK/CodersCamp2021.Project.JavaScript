import { getByText } from '@testing-library/dom';
import { QuestionCounter } from './QuestionCounter';

describe('QuestionCounter tests', () => {
  it('should display initial count', () => {
    // Given
    const { element } = QuestionCounter({ initialCount: 5 });

    // Then
    expect(getByText(element, /5/)).toBeDefined();
  });

  it('should update UI on increment', async () => {
    // Given
    const { element, increment } = QuestionCounter();
    expect(getByText(element, /1/)).toBeDefined();

    // When
    increment();

    // Then
    expect(getByText(element, /2/)).toBeDefined();
  });

  it('should return correct count from getCount', () => {
    // Given
    const { increment, getCount } = QuestionCounter();

    // When
    increment();
    increment();

    // Then
    expect(getCount()).toBe(3);
  });
});
