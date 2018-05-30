import { ExperdcoachwebPage } from './app.po';

describe('experdcoachweb App', () => {
  let page: ExperdcoachwebPage;

  beforeEach(() => {
    page = new ExperdcoachwebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
