Router.configure({
    layoutTemplate: 'template'
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home'
    });

    this.route('tour', {
        path: '/tour',
        template: 'tour'
    });
});

