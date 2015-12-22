module.exports = {
    compile_dir: 'build',
    tpl_name: 'templates-module.js',
    project_theme_name: 'profitelo_theme',
    app_files: {
        js: ['src/**/*.js', '!src/**/*.spec.js'],
        jsunit: ['src/**/*.spec.js'],
        git_commit: 'src/assets/gitcommit.js',
        jade_all: 'src/**/*.jade',
        assets: ['src/assets/**'],
        index_html: ['src/index.html'],
        sass_all: ['src/sass/**/*.sass']
    },
    test_files: {
        js: ['vendor/angular-mocks/angular-mocks.js', 'vendor/jasmine-jquery/lib/jasmine-jquery.js']
    },
    vendor_files: {
        js: [
            "node_modules/angular/angular.js"
        ],
        css: [],
        assets: []
    }
};

