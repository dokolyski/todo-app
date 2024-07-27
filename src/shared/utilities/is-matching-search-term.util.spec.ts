import { isMatchingSearchTerm } from './is-matching-search-term.util';

describe('isMatchingSearchTerm', () => {
  it('should return true if all search terms match at least one value in the object', () => {
    const object = { date: '2023-10-01', location: 'New York', content: 'Meeting' };
    const searchTerms = ['2023', 'New', 'Meeting'];
    const result = isMatchingSearchTerm(searchTerms, object, ['date', 'location', 'content']);
    expect(result).toBe(true);
  });

  it('should return false if some search terms do not match any value in the object', () => {
    const object = { date: '2023-10-01', location: 'New York', content: 'Meeting', x: 'Los Angeles' };
    const searchTerms = ['2023', 'Los Angeles', 'Meeting'];
    const result = isMatchingSearchTerm(searchTerms, object, ['date', 'location', 'content']);
    expect(result).toBe(false);
  });

  it('should handle case insensitivity', () => {
    const object = { date: '2023-10-01', location: 'New York', content: 'Meeting' };
    const searchTerms = ['2023', 'new york', 'meeting'];
    const result = isMatchingSearchTerm(searchTerms, object, ['date', 'location', 'content']);
    expect(result).toBe(true);
  });

  it('should return true if search terms are empty', () => {
    const object = { date: '2023-10-01', location: 'New York', content: 'Meeting' };
    const searchTerms: string[] = [];
    const result = isMatchingSearchTerm(searchTerms, object, ['date', 'location', 'content']);
    expect(result).toBe(true);
  });
});
