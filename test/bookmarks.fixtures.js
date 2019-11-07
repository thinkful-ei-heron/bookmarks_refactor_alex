function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: 'site one',
      url: 'siteone.com',
      description: 'first site',
      rating: 1
    },
    {
      id: 2,
      title: 'site two',
      url: 'sitetwo.com',
      description: 'second site',
      rating: 2
    },
    {
      id: 3,
      title: 'site three',
      url: 'sitethree.com',
      description: 'third site',
      rating: 3
    },
    {
      id: 4,
      title: 'site four',
      url: 'sitefour.com',
      description: 'fourth site',
      rating: 4
    }
  ];
}

module.exports = { makeBookmarksArray };