module.exports = {
    compile_dir: 'build',
    tpl_name: 'templates-module.js',
    tpl_module: 'templates-module',
    project_theme_name: 'profitelo_theme',
    app_files: {
        js: ['src/**/*.js', '!src/**/*.spec.js'],
        jsunit: ['src/**/*.spec.js'],
        jade_all: 'src/**/*.jade',
        assets: ['src/assets/**'],
        index_html: ['src/index.html'],
        sass_all: ['src/template/**/*.sass']
    },
    test_files: {
        js: ['vendor/angular-mocks/angular-mocks.js', 'vendor/jasmine-jquery/lib/jasmine-jquery.js']
    },
    vendor_files: {
        js: [
            "node_modules/angular/angular.js",
            "node_modules/ui-router/release/angular-ui-router.js"
        ],
        css: [],
        assets: []
    }
};

