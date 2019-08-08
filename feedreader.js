// This is the spec file that Jasmine will read


$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });



        //test that loops through each feed 
        it('URL is defined and is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                //ensures it has a URL defined
                expect(allFeeds[i].url).toBeDefined();
                // ensures URL is not empty.
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        })

    });


    //new test suite named "The menu" 

    describe('The Menu', function() {
        const menu = document.querySelector('body');

        //test that ensures the menu element is hidden by default.
        it('menu element is hidden', function() {
            expect(menu.classList).toContain('menu-hidden')
        });

        // visibility when the menu icon is clicked. This test

        it('shows when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click')
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click')
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


    });
    //test suite named "Initial Entries" 

    describe('Initial Entries', function() {

        //ensures when the loadFeed function is called there is at least a single .entry 
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('define if feed has at least a single entry', function() {
            const entry = document.querySelectorAll('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
        });
    });


    // test suite named "New Feed Selection" 
    describe('New Feed Selection', function() {
        let firstFeed;
        /*  test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector('.feed').textContent;
                loadFeed(1, done);
            });
        });
        it('content changes when the feed reloads', function(done) {
            const newFeed = document.querySelector(".feed").textContent;
            expect(firstFeed).not.toEqual(newFeed);
            done();
        });
    });


}());