import {
  create,
  visitable,
  clickable,
  fillable,
  isVisible,
  collection,
  text
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  searchInput: fillable('input'),
  submit: clickable('button'),

  resultCity: text('strong'),
  results: collection({
    itemScope: 'ul.results li'
  }),
  emptyMessage: isVisible('#empty-message'),

  search(text) {
    return this.searchInput(text)
    .submit();
  }
});
