# How to work on freeCodeCamp.org's developer news theme

The developer news also known as [`/news`](https://www.freecodecamp.org/news) site is powered by [Ghost](https://ghost.org/). We use a custom theme for the look and feel of the site. The source code of the theme is available here: <https://github.com/freeCodeCamp/news-theme>.

## The Theme

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes. The theme used on `/news` is based off of the default [casper theme](https://github.com/TryGhost/Casper).

The default theme is commented pretty heavily so that it should be fairly easy to work out what's going on just by reading the code and the comments. Once you feel comfortable with how everything works, Ghost also has a full [theme API documentation](https://themes.ghost.org) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The main template file
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

One really neat trick is that you can also create custom one-off templates just by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for the `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive

## Development

1. Get Ghost installed locally.

   ```sh
   npm install -g ghost-cli@latest
   mkdir ghost-local-site
   cd ghost-local-site
   ```

   ```sh
   ghost install local
   ghost start
   ```

   > Note: Currently freeCodeCamp uses Ghost version `2.9.0`, so make sure you are using a version higher than that.

   Be sure to run `ghost` commands from the `ghost-local-site` directory. Follow additional instructions on [Ghost's official documentation](https://docs.ghost.org) if are not familiar with its interface.

2. Fork and clone the repository in your theme directory (replacing `YOUR_USERNAME` with your GitHub username):

   ```sh
   cd content/themes/
   git clone https://github.com/YOUR_USERNAME/news-theme.git
   ```

3. Make sure you have all the pre-requisites.

   The theme styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node.js](https://nodejs.org/). Make sure that your Node.js version is compatible with `ghost`.

4. Install dependencies and develop the theme

   ```sh
   npm ci
   npm run develop
   ```

5. Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

6. Access the development site.

   a. Enter `http://localhost:2368/ghost/` into your address bar. Continue with the setup prompted on the page (if running ghost for the first time).

   b. _(One-time only, during setup)_ Restart Ghost, on a separate terminal once to ensure the theme is available.

   ```sh
   cd ghost-local-site
   ghost restart
   ```

   c. _(One-time only, during setup)_ Once you've done this, go to `http://localhost:2368/ghost/#/settings/design` and scroll to the bottom. Make sure you click activate on the `freecodecamp-news-theme`.

7. Zip the final code and make a pull-request

   The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which we can then upload to the production site.

   When you make a PR, please make sure you have run the below script prior to commiting the code and sending a PR.

   ```sh
   npm run zip
   ```

## Other Reference and resources

### PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- Variables - Simple pure CSS variables
- [Color Function](https://github.com/postcss/postcss-color-function)

### SVG Icons

The theme uses inline SVG icons, included via Handlebars partials. You can find all icons inside `/partials/icons`. To use an icon just include the name of the relevant file, eg. To include the SVG icon in `/partials/icons/rss.hbs` - use `{{> "icons/rss"}}`.

You can add your own SVG icons in the same manner.
