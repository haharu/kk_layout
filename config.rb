require 'compass/import-once/activate'
require 'sass-globbing'
require 'font-awesome-sass'

# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "app/src"
css_dir = "app/assets/stylesheets"
fonts_dir = "app/assets/fonts"
sass_dir = "app/assets/sass"
images_dir = "app/assets/images"
javascripts_dir = "app/src"
additional_import_paths = [
    'node_modules'
]
relative_assets = true
cache = false
sourcemap = true

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
