Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home'
    });

    this.route('about', {
      path: '/about',
      template: 'about'
    });

    this.route('contact', {
      path: '/contact',
      template: 'contact'
    });

    this.route('team', {
      path: '/team',
      template: 'team'
    });

    this.route('tour', {
        path: '/tour',
        template: 'tour',
    });
});

