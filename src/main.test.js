describe('main', () => {
  beforeEach(async () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'app');
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render page', async () => {
    // Given
    const root = document.querySelector('#app');
    expect(root.children).toHaveLength(0);

    // When
    await import('./main');

    // Then
    expect(root.children).not.toHaveLength(0);
  });
});
